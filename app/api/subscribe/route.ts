import { NextResponse } from 'next/server';
import { MailchimpService } from '../../services/mailchimp';

export async function POST(request: Request) {
  console.log('Received subscription request');
  try {
    const body = await request.json();
    console.log('Request body:', body);
    const { email, firstName, lastName } = body;

    if (!email) {
      console.log('Email missing from request');
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    console.log('Attempting to add subscriber to Mailchimp');
    const result = await MailchimpService.addSubscriber({
      email,
      firstName,
      lastName,
    });
    console.log('Mailchimp response:', result);

    if (!result.success) {
      console.log('Mailchimp subscription failed:', result.error);
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    console.log('Successfully subscribed user');
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