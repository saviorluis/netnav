import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth_token');

    if (!token) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // In a real app, you would validate the token against a database
    // and find the associated user
    
    // Mock user for development (in a real app, fetch from database)
    const mockUser = {
      id: '1',
      email: 'developer@netnav.app',
      name: 'Developer User',
    };

    return NextResponse.json(mockUser);

  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 500 }
    );
  }
} 