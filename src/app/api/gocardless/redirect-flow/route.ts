import { NextRequest, NextResponse } from 'next/server';
import { goCardlessService } from '@/lib/gocardless';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      description,
      success_redirect_url,
      session_token,
      amount,
      payment_type,
      category,
    } = body;

    if (!description || !success_redirect_url || !session_token) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Log custom amount donations for tracking
    if (amount && amount > 0) {
      console.log(`Creating ${payment_type || 'one-off'} donation flow:`, {
        amount: `£${amount.toFixed(2)}`,
        category: category || 'general',
        description,
        session_token,
      });
    }

    const redirectFlow = await goCardlessService.createRedirectFlow({
      description,
      success_redirect_url,
      session_token,
    });

    return NextResponse.json(redirectFlow);
  } catch (error) {
    console.error('Error creating redirect flow:', error);
    return NextResponse.json(
      { error: 'Failed to create redirect flow' },
      { status: 500 }
    );
  }
}
