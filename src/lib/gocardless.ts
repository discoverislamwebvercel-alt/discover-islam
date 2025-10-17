// GoCardless API integration
// Note: This file provides a mock implementation for development
// In production, you would use the actual GoCardless SDK

export interface DonationTemplate {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  type: 'one-off' | 'recurring';
  category: 'school' | 'exhibition' | 'literature';
  interval?: 'monthly' | 'quarterly' | 'yearly';
  metadata?: Record<string, unknown>;
}

export interface RedirectFlow {
  id: string;
  status: string;
  redirect_uri: string;
  created_at: string;
  updated_at: string;
}

export class GoCardlessService {
  private accessToken: string;
  private environment: string;

  constructor() {
    this.accessToken = process.env.GOCARDLESS_ACCESS_TOKEN || '';
    this.environment =
      process.env.NODE_ENV === 'production' ? 'live' : 'sandbox';
  }

  /**
   * Create a redirect flow for one-off payments
   */
  async createRedirectFlow(params: {
    description: string;
    success_redirect_url: string;
    session_token: string;
  }): Promise<RedirectFlow> {
    try {
      // Check if we have an access token
      if (!this.accessToken) {
        console.warn(
          'No GoCardless access token found. Using mock response for development.'
        );
        console.warn('To use real GoCardless sandbox:');
        console.warn(
          '1. Get your sandbox access token from: https://manage-sandbox.gocardless.com/developers/access-tokens'
        );
        console.warn(
          '2. Add it to your .env.local file: GOCARDLESS_ACCESS_TOKEN=your_token_here'
        );
        console.warn('3. Restart your development server');

        // Return a mock response that shows what the real URL would look like
        const mockFlowId = `RE${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        return {
          id: mockFlowId,
          status: 'pending_customer_approval',
          redirect_uri: `https://pay-sandbox.gocardless.com/flow/${mockFlowId}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      }

      const response = await fetch(
        'https://api-sandbox.gocardless.com/redirect_flows',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'GoCardless-Version': '2015-07-06',
          },
          body: JSON.stringify({
            redirect_flows: {
              description: params.description,
              session_token: params.session_token,
              success_redirect_url: params.success_redirect_url,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('GoCardless API error:', response.status, errorText);
        throw new Error(
          `GoCardless API error: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      const redirectFlow = data.redirect_flows;

      return {
        id: redirectFlow.id,
        status: redirectFlow.status,
        redirect_uri: redirectFlow.redirect_url,
        created_at: redirectFlow.created_at,
        updated_at: redirectFlow.updated_at,
      };
    } catch (error) {
      console.error('Error creating redirect flow:', error);
      throw new Error(
        `Failed to create redirect flow: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}

// Export singleton instance
export const goCardlessService = new GoCardlessService();

// Predefined donation templates
export const donationTemplates: DonationTemplate[] = [
  // One-off donations
  {
    id: 'one-off-5',
    name: 'Support School Visits',
    description: 'Help us organize educational school visits',
    amount: 5,
    currency: 'GBP',
    type: 'one-off',
    category: 'school',
  },
  {
    id: 'one-off-10',
    name: 'Support Exhibition',
    description: 'Contribute to our exhibition projects',
    amount: 10,
    currency: 'GBP',
    type: 'one-off',
    category: 'exhibition',
  },
  {
    id: 'one-off-20',
    name: 'Support Literature',
    description: 'Help us create educational literature',
    amount: 20,
    currency: 'GBP',
    type: 'one-off',
    category: 'literature',
  },
  {
    id: 'one-off-40',
    name: 'General Support',
    description: 'Support all our projects and initiatives',
    amount: 40,
    currency: 'GBP',
    type: 'one-off',
    category: 'school',
  },

  // Recurring donations
  {
    id: 'recurring-5',
    name: 'Monthly School Support',
    description: 'Monthly support for school visit projects',
    amount: 5,
    currency: 'GBP',
    type: 'recurring',
    category: 'school',
    interval: 'monthly',
  },
  {
    id: 'recurring-10',
    name: 'Monthly Exhibition Support',
    description: 'Monthly support for exhibition projects',
    amount: 10,
    currency: 'GBP',
    type: 'recurring',
    category: 'exhibition',
    interval: 'monthly',
  },
  {
    id: 'recurring-20',
    name: 'Monthly Literature Support',
    description: 'Monthly support for literature projects',
    amount: 20,
    currency: 'GBP',
    type: 'recurring',
    category: 'literature',
    interval: 'monthly',
  },
  {
    id: 'recurring-40',
    name: 'Monthly General Support',
    description: 'Monthly support for all our initiatives',
    amount: 40,
    currency: 'GBP',
    type: 'recurring',
    category: 'school',
    interval: 'monthly',
  },
];

/**
 * Filter templates based on payment type and category
 */
export function filterTemplates(
  type: 'one-off' | 'recurring',
  category?: 'school' | 'exhibition' | 'literature'
): DonationTemplate[] {
  return donationTemplates.filter(template => {
    const typeMatch = template.type === type;
    const categoryMatch = !category || template.category === category;
    return typeMatch && categoryMatch;
  });
}
