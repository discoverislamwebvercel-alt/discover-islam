import { NextRequest, NextResponse } from 'next/server';
import { goCardlessService } from '@/lib/gocardless';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { description, success_redirect_url, session_token } = body;

    if (!description || !success_redirect_url || !session_token) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
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
