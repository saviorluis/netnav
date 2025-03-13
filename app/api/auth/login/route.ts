import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// List of developer access codes (in a real app, store these securely)
const DEVELOPER_ACCESS_CODES = ['dev-preview-2024', 'netnav-beta']; 

// Hardcoded admin credentials for demonstration
const ADMIN_CREDENTIALS = {
  email: 'nnadmin',
  password: 'passion1$2'
};

export async function POST(request: Request) {
  try {
    // Extract login credentials
    const { email, password, accessCode } = await request.json();

    // Validate developer access code
    if (!DEVELOPER_ACCESS_CODES.includes(accessCode)) {
      return NextResponse.json(
        { message: 'Invalid developer access code' },
        { status: 403 }
      );
    }

    // Check admin credentials
    if (email !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create a session token
    const token = crypto.randomUUID();
    
    // Set the token in a cookie
    const cookieStore = cookies();
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 500 }
    );
  }
} 