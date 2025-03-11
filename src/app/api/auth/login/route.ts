import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';

const prisma = new PrismaClient();

// List of developer access codes (in a real app, store these securely)
const DEVELOPER_ACCESS_CODES = ['dev-preview-2024', 'netnav-beta']; 

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

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create a session token
    const token = crypto.randomUUID();
    
    // In a production app, you would store this token in a database
    // with the user ID and expiration time
    
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