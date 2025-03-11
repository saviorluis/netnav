import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Hardcoded admin credentials for demonstration
const ADMIN_CREDENTIALS = {
  username: 'nnadmin',
  password: 'passion1$2'
};

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Check admin credentials
    if (username !== ADMIN_CREDENTIALS.username || password !== ADMIN_CREDENTIALS.password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Set admin session cookie
    const cookieStore = cookies();
    cookieStore.set('admin_session', username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
} 