'use server';

export async function getGoCardlessTemplates() {
  try {
    const accessToken = process.env.GOCARDLESS_ACCESS_TOKEN;
    const env =
      process.env.GOCARDLESS_ENVIRONMENT === 'live' ? 'live' : 'sandbox';
    const baseUrl =
      env === 'live'
        ? 'https://api.gocardless.com'
        : 'https://api-sandbox.gocardless.com';

    if (!accessToken) {
      throw new Error('Missing GOCARDLESS_ACCESS_TOKEN');
    }

    const response = await fetch(`${baseUrl}/billing_request_templates`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'GoCardless-Version': '2015-07-06',
      },
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`GoCardless API error: ${response.status} - ${errText}`);
    }

    const data = await response.json();
    const allTemplates = data.billing_request_templates || [];

    // Classify recurring vs one-off
    const recurring = allTemplates.filter(
      (t: any) =>
        !!t.mandate_request_description &&
        (t.payment_request_amount === null ||
          t.payment_request_amount === undefined)
    );

    const oneOff = allTemplates.filter((t: any) => !!t.payment_request_amount);

    // Format results for UI
    const formatted = {
      recurring: recurring.map((t: any) => {
        const constraints = t.mandate_request_constraints || {};
        const metadata = t.metadata || {};

        // Try multiple sources for recurring amount
        const amount =
          constraints.payment_amount ||
          metadata.amount ||
          metadata.recurring_amount ||
          null;
        const currency =
          constraints.payment_currency ||
          metadata.currency ||
          t.mandate_request_currency ||
          'GBP';

        return {
          id: t.id,
          name: t.name,
          description: t.mandate_request_description,
          authorisationUrl: t.authorisation_url,
          amount: amount ? `${amount} ${currency}` : null,
          currency,
          createdAt: t.created_at,
          updatedAt: t.updated_at,
          type: 'recurring',
        };
      }),

      oneOff: oneOff.map((t: any) => ({
        id: t.id,
        name: t.name,
        amount: `${t.payment_request_amount} ${t.payment_request_currency}`,
        description: t.payment_request_description,
        authorisationUrl: t.authorisation_url,
        createdAt: t.created_at,
        updatedAt: t.updated_at,
        type: 'one-off',
      })),
    };

    return {
      success: true,
      ...formatted,
      recurringCount: formatted.recurring.length,
      oneOffCount: formatted.oneOff.length,
    };
  } catch (err) {
    console.error('Error fetching GoCardless templates:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to fetch templates',
      recurring: [],
      oneOff: [],
    };
  }
}

// Create a ONE-OFF GoCardless billing request and return the checkout URL
export async function createGoCardlessOneOffRedirectFlow(
  params: {
    amount: number; // major units (e.g., 10 => £10)
    currency?: string; // default GBP
    description?: string;
  },
  successUrl: string
) {
  try {
    const accessToken = process.env.GOCARDLESS_ACCESS_TOKEN;
    const env =
      process.env.GOCARDLESS_ENVIRONMENT === 'live' ? 'live' : 'sandbox';
    const baseUrl =
      env === 'live'
        ? 'https://api.gocardless.com'
        : 'https://api-sandbox.gocardless.com';

    if (!accessToken) {
      throw new Error('Missing GOCARDLESS_ACCESS_TOKEN');
    }

    const amountInMinor = Math.round(params.amount * 100);

    // 1) Create a billing request with only payment_request
    const billingRequestPayload = {
      billing_requests: {
        payment_request: {
          amount: amountInMinor.toString(),
          currency: (params.currency || 'GBP').toUpperCase(),
          description: params.description || 'One-off donation',
        },
      },
    } as const;

    const brRes = await fetch(`${baseUrl}/billing_requests`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'GoCardless-Version': '2015-07-06',
      },
      body: JSON.stringify(billingRequestPayload),
    });

    if (!brRes.ok) {
      const errorData = await brRes
        .json()
        .catch(() => ({ error: { message: 'Unknown error' } }));

      let errorMessage = 'Failed to create payment request';
      if (errorData.error) {
        if (
          Array.isArray(errorData.error.errors) &&
          errorData.error.errors.length > 0
        ) {
          const first = errorData.error.errors[0];
          if (
            first.field === 'payment_request' &&
            first.message &&
            first.metadata?.minimum_amount
          ) {
            const min = (first.metadata.minimum_amount as number) / 100;
            errorMessage = `Minimum donation amount is £${min.toFixed(2)}`;
          } else {
            errorMessage =
              first.message || errorData.error.message || errorMessage;
          }
        } else if (errorData.error.message) {
          errorMessage = errorData.error.message;
        }
      }
      return { success: false, error: errorMessage } as const;
    }

    const brData = await brRes.json();
    const billingRequest = brData.billing_requests;

    // 2) Create a billing request flow to obtain checkout URL
    const flowPayload = {
      billing_request_flows: {
        links: { billing_request: billingRequest.id },
        redirect_uri: successUrl,
      },
    } as const;

    const flowRes = await fetch(`${baseUrl}/billing_request_flows`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'GoCardless-Version': '2015-07-06',
      },
      body: JSON.stringify(flowPayload),
    });

    if (!flowRes.ok) {
      const errorData = await flowRes
        .json()
        .catch(() => ({ error: { message: 'Unknown error' } }));
      const message =
        errorData?.error?.message || 'Failed to create checkout flow';
      return { success: false, error: message } as const;
    }

    const flowData = await flowRes.json();
    const flow = flowData.billing_request_flows;
    if (flow.authorisation_url) {
      return { success: true, redirectUrl: flow.authorisation_url } as const;
    }

    return { success: false, error: 'No authorisation URL returned' } as const;
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    } as const;
  }
}
