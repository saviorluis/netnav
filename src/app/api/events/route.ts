import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getDistance } from 'geolib';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const zip = searchParams.get('zip');
    const radius = searchParams.get('radius') ? parseInt(searchParams.get('radius')!) : 25;
    const lat = searchParams.get('lat') ? parseFloat(searchParams.get('lat')!) : null;
    const lng = searchParams.get('lng') ? parseFloat(searchParams.get('lng')!) : null;
    const industries = searchParams.get('industries')?.split(',') || [];
    const eventTypes = searchParams.get('eventTypes')?.split(',') || [];

    // Base query
    const query: any = {
      where: {
        AND: [
          {
            startDate: {
              gte: new Date(), // Only future events
            },
          },
        ],
      },
      include: {
        venue: true,
        organizer: true,
      },
      orderBy: {
        startDate: 'asc',
      },
    };

    // Add industry filter if specified
    if (industries.length > 0) {
      query.where.AND.push({
        industries: {
          hasSome: industries,
        },
      });
    }

    // Add event type filter if specified
    if (eventTypes.length > 0) {
      query.where.AND.push({
        eventType: {
          in: eventTypes,
        },
      });
    }

    // Fetch events
    const events = await prisma.event.findMany(query);

    // Filter by distance if location is provided
    let filteredEvents = events;
    if (lat && lng) {
      filteredEvents = events.filter((event) => {
        if (!event.venue?.latitude || !event.venue?.longitude) return false;

        const distance = getDistance(
          { latitude: lat, longitude: lng },
          { latitude: event.venue.latitude, longitude: event.venue.longitude }
        );

        // Convert meters to miles (geolib returns meters)
        const distanceInMiles = distance * 0.000621371;
        return distanceInMiles <= radius;
      });
    }

    return NextResponse.json(filteredEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { message: 'Failed to fetch events' },
      { status: 500 }
    );
  }
} 