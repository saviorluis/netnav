import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';

// Declare global variable for PrismaClient
declare global {
  var prisma: PrismaClient | undefined;
}

// Use PrismaClient as a singleton to prevent multiple instances during builds
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // In development, use a global variable to prevent multiple instances
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma as PrismaClient;
}

// Add export config to specify runtime
export const runtime = 'nodejs';

export async function GET() {
  try {
    // Check admin session
    const cookieStore = cookies();
    const adminSession = cookieStore.get('admin_session')?.value;

    if (!adminSession || adminSession !== 'nnadmin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch all users
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
} 