import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getDistance } from 'geolib';

// Initialize Prisma client
const prisma = new PrismaClient();

// Cache for zipcode coordinates to reduce API calls
const zipcodeCache: Record<string, { lat: number; lng: number }> = {};

// Define types for our data
interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
}

interface EventSource {
  name: string;
  website: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  eventType: string;
  industries: string[];
  venue: Venue;
  source?: EventSource;
}

interface NetworkingSource {
  name: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  website: string;
}

// Chamber of Commerce data based on the U.S. Chamber directory
const chamberData: NetworkingSource[] = [
  {
    name: 'Durham Chamber of Commerce',
    city: 'Durham',
    state: 'NC',
    zipCode: '27701',
    latitude: 35.9940,
    longitude: -78.8986,
    website: 'https://members.durhamchamber.org/events/calendar'
  },
  {
    name: 'Greensboro Chamber of Commerce',
    city: 'Greensboro',
    state: 'NC',
    zipCode: '27401',
    latitude: 36.0726,
    longitude: -79.7920,
    website: 'https://chamber.greensboro.org/events'
  },
  {
    name: 'Charlotte Chamber of Commerce',
    city: 'Charlotte',
    state: 'NC',
    zipCode: '28202',
    latitude: 35.2271,
    longitude: -80.8431,
    website: 'https://directory.charlotteareachamber.com/calendar'
  },
  {
    name: 'Raleigh Chamber of Commerce',
    city: 'Raleigh',
    state: 'NC',
    zipCode: '27601',
    latitude: 35.7796,
    longitude: -78.6382,
    website: 'https://raleighchamber.org/events/'
  },
  {
    name: 'Asheville Chamber of Commerce',
    city: 'Asheville',
    state: 'NC',
    zipCode: '28801',
    latitude: 35.5951,
    longitude: -82.5515,
    website: 'https://www.ashevillechamber.org/events/'
  },
  {
    name: 'Wilmington Chamber of Commerce',
    city: 'Wilmington',
    state: 'NC',
    zipCode: '28401',
    latitude: 34.2257,
    longitude: -77.9447,
    website: 'https://www.wilmingtonchamber.org/events/'
  }
];

// BNI chapters in North Carolina
const bniData: NetworkingSource[] = [
  {
    name: 'BNI Triangle',
    city: 'Raleigh',
    state: 'NC',
    zipCode: '27601',
    latitude: 35.7796,
    longitude: -78.6382,
    website: 'https://bnitriangle.com/en-US/events'
  },
  {
    name: 'BNI Charlotte',
    city: 'Charlotte',
    state: 'NC',
    zipCode: '28202',
    latitude: 35.2271,
    longitude: -80.8431,
    website: 'https://bnicharlotte.com/en-US/events'
  },
  {
    name: 'BNI Triad',
    city: 'Greensboro',
    state: 'NC',
    zipCode: '27401',
    latitude: 36.0726,
    longitude: -79.7920,
    website: 'https://bnitriad.com/en-US/events'
  }
];

// Toastmasters clubs in North Carolina
const toastmastersData: NetworkingSource[] = [
  {
    name: 'Raleigh Toastmasters',
    city: 'Raleigh',
    state: 'NC',
    zipCode: '27601',
    latitude: 35.7796,
    longitude: -78.6382,
    website: 'https://www.toastmasters.org/find-a-club'
  },
  {
    name: 'Charlotte Toastmasters',
    city: 'Charlotte',
    state: 'NC',
    zipCode: '28202',
    latitude: 35.2271,
    longitude: -80.8431,
    website: 'https://www.toastmasters.org/find-a-club'
  },
  {
    name: 'Durham Toastmasters',
    city: 'Durham',
    state: 'NC',
    zipCode: '27701',
    latitude: 35.9940,
    longitude: -78.8986,
    website: 'https://www.toastmasters.org/find-a-club'
  }
];

// SBA offices in North Carolina
const sbaData: NetworkingSource[] = [
  {
    name: 'SBA North Carolina District Office',
    city: 'Charlotte',
    state: 'NC',
    zipCode: '28202',
    latitude: 35.2271,
    longitude: -80.8431,
    website: 'https://www.sba.gov/offices/district/nc/charlotte'
  }
];

// Function to get coordinates for a zipcode
async function getZipcodeCoordinates(zipcode: string): Promise<{ lat: number; lng: number } | null> {
  // Check cache first
  if (zipcodeCache[zipcode]) {
    return zipcodeCache[zipcode];
  }

  try {
    // In a real implementation, this would call a geocoding API
    // For now, we'll use a simple mapping for NC zipcodes
    const ncZipcodes: Record<string, { lat: number; lng: number }> = {
      '27701': { lat: 35.9940, lng: -78.8986 }, // Durham
      '27401': { lat: 36.0726, lng: -79.7920 }, // Greensboro
      '28202': { lat: 35.2271, lng: -80.8431 }, // Charlotte
      '27601': { lat: 35.7796, lng: -78.6382 }, // Raleigh
      '28801': { lat: 35.5951, lng: -82.5515 }, // Asheville
      '28401': { lat: 34.2257, lng: -77.9447 }, // Wilmington
      // Add more NC zipcodes as needed
    };

    if (ncZipcodes[zipcode]) {
      // Cache the result
      zipcodeCache[zipcode] = ncZipcodes[zipcode];
      return ncZipcodes[zipcode];
    }

    // For zipcodes not in our mapping, we would call a geocoding API
    // For now, return null
    return null;
  } catch (error) {
    console.error('Error getting zipcode coordinates:', error);
    return null;
  }
}

// Function to generate sample events for a source
function generateEventsForSource(source: NetworkingSource, count: number = 3): Event[] {
  const events: Event[] = [];
  const eventTypes = ['Networking', 'Workshop', 'Conference', 'Meetup', 'Seminar'];
  const industries = ['Technology', 'Healthcare', 'Finance', 'Marketing', 'Education', 'Manufacturing'];
  
  const startDate = new Date();
  
  for (let i = 0; i < count; i++) {
    const eventDate = new Date(startDate);
    eventDate.setDate(eventDate.getDate() + Math.floor(Math.random() * 30)); // Random date in next 30 days
    
    const endDate = new Date(eventDate);
    endDate.setHours(endDate.getHours() + 2); // 2 hour event
    
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const industry = industries[Math.floor(Math.random() * industries.length)];
    
    events.push({
      id: `${source.name.replace(/\s+/g, '-').toLowerCase()}-event-${i}`,
      title: `${eventType} Event by ${source.name}`,
      description: `Join us for a ${eventType.toLowerCase()} event focused on ${industry.toLowerCase()} industry trends and networking opportunities.`,
      startDate: eventDate.toISOString(),
      endDate: endDate.toISOString(),
      eventType,
      industries: [industry],
      venue: {
        id: `venue-${source.name.replace(/\s+/g, '-').toLowerCase()}`,
        name: source.name,
        address: `123 Main St`,
        city: source.city,
        state: source.state,
        zipCode: source.zipCode,
        latitude: source.latitude,
        longitude: source.longitude
      },
      source: {
        name: source.name,
        website: source.website
      }
    });
  }
  
  return events;
}

export async function GET(request: Request) {
  try {
    // Get zipcode from query parameters
    const { searchParams } = new URL(request.url);
    const zipcode = searchParams.get('zipcode');
    const radius = parseInt(searchParams.get('radius') || '50', 10); // Default 50 miles
    
    if (!zipcode) {
      return NextResponse.json({ error: 'Zipcode is required' }, { status: 400 });
    }
    
    // Get coordinates for the zipcode
    const coordinates = await getZipcodeCoordinates(zipcode);
    
    if (!coordinates) {
      return NextResponse.json({ error: 'Could not find coordinates for the provided zipcode' }, { status: 400 });
    }
    
    // Try to get events from the database first
    let events: Event[] = [];
    try {
      const dbEvents = await prisma.event.findMany({
        include: {
          venue: true,
        },
      });
      
      if (dbEvents.length > 0) {
        events = dbEvents as unknown as Event[];
      }
    } catch (error) {
      console.error('Database query failed, using sample data:', error);
      // Continue with sample data
    }
    
    // If no events in database, generate sample events
    if (events.length === 0) {
      // Combine all sources
      const allSources: NetworkingSource[] = [...chamberData, ...bniData, ...toastmastersData, ...sbaData];
      
      // Filter sources by distance from the zipcode
      const nearbySources = allSources.filter(source => {
        const distance = getDistance(
          { latitude: coordinates.lat, longitude: coordinates.lng },
          { latitude: source.latitude, longitude: source.longitude }
        );
        
        // Convert meters to miles (1 meter = 0.000621371 miles)
        const distanceInMiles = distance * 0.000621371;
        
        return distanceInMiles <= radius;
      });
      
      // Generate events for each nearby source
      for (const source of nearbySources) {
        const sourceEvents = generateEventsForSource(source);
        events.push(...sourceEvents);
      }
    }
    
    // Sort events by date
    events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error in zipcode search API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 