import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token');

  if (!token) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }

  // In a real app, you would validate the token against your database
  // to ensure it's still valid and hasn't expired

  return NextResponse.json({ authenticated: true });
} 