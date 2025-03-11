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

// Sample events data to use when database is not available
const SAMPLE_EVENTS = [
  {
    id: '1',
    title: 'Raleigh Chamber Networking Breakfast',
    description: 'Join local business leaders for a networking breakfast hosted by the Raleigh Chamber of Commerce.',
    startDate: new Date(Date.now() + 86400000), // Tomorrow
    endDate: new Date(Date.now() + 86400000 + 7200000), // Tomorrow + 2 hours
    eventType: 'NETWORKING',
    venue: {
      id: '1',
      name: 'Raleigh Convention Center',
      address: '500 S Salisbury St',
      city: 'Raleigh',
      state: 'NC',
      zipCode: '27601',
      latitude: 35.7721,
      longitude: -78.6386
    }
  },
  {
    id: '2',
    title: 'Charlotte Tech Meetup',
    description: 'Monthly gathering of tech professionals in the Charlotte area.',
    startDate: new Date(Date.now() + 172800000), // Day after tomorrow
    endDate: new Date(Date.now() + 172800000 + 10800000), // Day after tomorrow + 3 hours
    eventType: 'MEETUP',
    venue: {
      id: '2',
      name: 'The Fillmore Charlotte',
      address: '820 Hamilton St',
      city: 'Charlotte',
      state: 'NC',
      zipCode: '28206',
      latitude: 35.2271,
      longitude: -80.8431
    }
  },
  {
    id: '3',
    title: 'Asheville Business Conference',
    description: 'Annual business conference featuring keynote speakers and networking opportunities.',
    startDate: new Date(Date.now() + 604800000), // Next week
    endDate: new Date(Date.now() + 604800000 + 28800000), // Next week + 8 hours
    eventType: 'CONFERENCE',
    venue: {
      id: '3',
      name: 'Renaissance Asheville Hotel',
      address: '31 Woodfin St',
      city: 'Asheville',
      state: 'NC',
      zipCode: '28801',
      latitude: 35.5951,
      longitude: -82.5515
    }
  }
];

// Add export config to specify runtime
export const runtime = 'nodejs';

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

    try {
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
    } catch (dbError) {
      console.warn('Database query failed, returning sample data:', dbError);
      // If database query fails, return sample data
      return NextResponse.json(SAMPLE_EVENTS);
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    // Return sample data on error
    return NextResponse.json(SAMPLE_EVENTS);
  }
} 