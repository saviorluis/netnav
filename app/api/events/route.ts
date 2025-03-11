import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const eventType = searchParams.get('eventType');
    const location = searchParams.get('location');
    const radius = searchParams.get('radius');

    // Build the query
    const where: any = {};
    
    if (startDate) {
      where.startDate = {
        gte: new Date(startDate)
      };
    }
    
    if (endDate) {
      where.endDate = {
        lte: new Date(endDate)
      };
    }
    
    if (eventType && eventType !== 'All Types') {
      where.eventType = eventType;
    }

    // Fetch events with their venues
    const events = await prisma.event.findMany({
      where,
      include: {
        venue: true,
      },
      orderBy: {
        startDate: 'asc',
      },
    });

    // If location and radius are provided, filter events by distance
    if (location && radius) {
      // For now, return all events - we'll implement distance filtering later
      return NextResponse.json(events);
    }

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
} 