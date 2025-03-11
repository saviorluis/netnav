import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

interface GeocodingResponse {
  results: Array<{
    geometry: {
      lat: number;
      lng: number;
    };
  }>;
}

// Function to calculate distance between two points using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const zipCode = searchParams.get('zipCode');
    const radius = Number(searchParams.get('radius')) || 25;
    const industryId = searchParams.get('industryId');
    const isVirtualParam = searchParams.get('isVirtual');

    if (!zipCode) {
      return NextResponse.json({ error: 'Zip code is required' }, { status: 400 });
    }

    // Get coordinates for the provided zip code
    const geocodingResponse = await axios.get<GeocodingResponse>(
      `https://api.opencagedata.com/geocode/v1/json?q=${zipCode}&key=${process.env.OPENCAGE_API_KEY}&countrycode=us`
    );

    const { lat, lng: lon } = geocodingResponse.data.results[0].geometry;

    // Find all venues within the radius (only needed for in-person events)
    const venues = await prisma.venue.findMany();
    
    // Filter venues by distance
    const nearbyVenues = venues.filter((venue) => {
      const distance = calculateDistance(lat, lon, venue.latitude, venue.longitude);
      return distance <= radius;
    });

    // Build query conditions
    const whereConditions: any = {
      startDate: {
        gte: new Date(), // Only future events
      },
    };

    // Add industry filter if provided
    if (industryId) {
      // Use industries array field instead of industryId relation
      whereConditions.industries = {
        has: industryId
      };
    }

    // Add isVirtual filter if provided
    if (isVirtualParam !== null) {
      const isVirtual = isVirtualParam === 'true';
      whereConditions.isVirtual = isVirtual;
      
      // For in-person events, apply venue filter
      if (!isVirtual) {
        whereConditions.venueId = {
          in: nearbyVenues.map((venue) => venue.id),
        };
      }
    } else {
      // If no isVirtual filter, include both virtual events and in-person events within radius
      whereConditions.OR = [
        { isVirtual: true },
        {
          isVirtual: false,
          venueId: {
            in: nearbyVenues.map((venue) => venue.id),
          },
        },
      ];
    }

    // Get events matching the filters
    const events = await prisma.event.findMany({
      where: whereConditions,
      include: {
        venue: true,
        organizer: true
      },
      orderBy: {
        startDate: 'asc',
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error searching events:', error);
    return NextResponse.json(
      { error: 'Failed to search events' },
      { status: 500 }
    );
  }
} 