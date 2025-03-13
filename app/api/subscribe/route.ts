import { NextResponse } from 'next/server';
import { MailchimpService } from '../../services/mailchimp';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, firstName, lastName } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const result = await MailchimpService.addSubscriber({
      email,
      firstName,
      lastName,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Successfully subscribed!', id: result.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 