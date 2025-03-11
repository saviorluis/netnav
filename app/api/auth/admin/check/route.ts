import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    // Get the auth token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('auth_token');

    // If no token exists, user is not authenticated
    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // In a real app, you would validate the token against a database
    // For now, we'll just check that it exists
    return NextResponse.json({ authenticated: true });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { message: 'Authentication check failed', authenticated: false },
      { status: 500 }
    );
  }
} 