import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies();
  
  // Delete the auth token cookie
  cookieStore.delete('auth_token');

  return NextResponse.json({ success: true });
} 