import { NextResponse } from 'next/server';
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
    const sources = await prisma.eventSource.findMany({
      orderBy: { createdAt: 'desc' },
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

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const source = await prisma.eventSource.create({
      data: {
        url: data.url,
        name: data.name,
        type: data.type,
        scrapeConfig: data.scrapeConfig,
        isActive: true,
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