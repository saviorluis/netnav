import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

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

// Check if user is admin
async function isAdmin(request: Request) {
  const cookieStore = cookies();
  const adminSession = cookieStore.get('admin_session');
  
  return !!adminSession;
}

// GET handler for fetching all sources
export async function GET(request: Request) {
  try {
    // Check if user is admin
    if (!await isAdmin(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch all sources
    const sources = await prisma.eventSource.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(sources);
  } catch (error) {
    console.error('Error fetching sources:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sources' },
      { status: 500 }
    );
  }
}

// POST handler for creating a new source
export async function POST(request: Request) {
  try {
    // Check if user is admin
    if (!await isAdmin(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { url, name, type, scrapeConfig, isActive } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Check if source with this URL already exists
    const existingSource = await prisma.eventSource.findUnique({
      where: { url },
    });

    if (existingSource) {
      return NextResponse.json(
        { error: 'Source with this URL already exists' },
        { status: 400 }
      );
    }

    // Create new source
    const source = await prisma.eventSource.create({
      data: {
        url,
        name: name || new URL(url).hostname,
        type: type || 'OTHER',
        scrapeConfig: scrapeConfig || {},
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json(source);
  } catch (error) {
    console.error('Error creating source:', error);
    return NextResponse.json(
      { error: 'Failed to create source' },
      { status: 500 }
    );
  }
} 