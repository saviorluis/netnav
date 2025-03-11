import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { load } from 'cheerio';
import OpenAI from 'openai';

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

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to categorize events using OpenAI
async function categorizeEvent(title: string, description: string) {
  const prompt = `
    Analyze this event and categorize it:
    Title: ${title}
    Description: ${description}

    1. What industries is this event relevant for? List up to 3.
    2. What type of event is this? Choose one: NETWORKING, WORKSHOP, CONFERENCE, SEMINAR, MEETUP, OTHER

    Format your response as JSON:
    {
      "industries": ["industry1", "industry2", "industry3"],
      "eventType": "EVENT_TYPE"
    }
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const response = completion.choices[0].message?.content || '';
    return JSON.parse(response);
  } catch (error) {
    console.error('Error categorizing event:', error);
    return {
      industries: ['BUSINESS'],
      eventType: 'NETWORKING'
    };
  }
}

// POST handler for scraping events
export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Fetch the HTML content
    const response = await fetch(url);
    const html = await response.text();
    const $ = load(html);

    // Use OpenAI to extract events from the HTML
    const extractionPrompt = `
      Extract events from this HTML content. The HTML is from a webpage at ${url}.
      
      For each event you can identify, extract:
      1. Title
      2. Description (brief)
      3. Start date and time (in ISO format if possible)
      4. End date and time (in ISO format if possible)
      5. Location name
      6. Address
      7. City
      8. State
      9. Zip code
      
      Format your response as a JSON array of events:
      [
        {
          "title": "Event Title",
          "description": "Event description",
          "startDate": "2023-04-15T18:00:00",
          "endDate": "2023-04-15T20:00:00",
          "location": {
            "name": "Venue Name",
            "address": "123 Main St",
            "city": "Raleigh",
            "state": "NC",
            "zipCode": "27601"
          }
        }
      ]
      
      If you can't determine some fields, use null for those values.
      
      Here's the HTML content:
      ${$.html().substring(0, 15000)} // Limit to first 15000 chars to avoid token limits
    `;

    const extraction = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: extractionPrompt }],
    });

    const extractedEvents = JSON.parse(extraction.choices[0].message?.content || '[]');
    
    // Process and store each event
    const processedEvents = [];
    
    for (const event of extractedEvents) {
      try {
        // Categorize the event
        const categories = await categorizeEvent(event.title, event.description);
        
        // Generate a unique sourceId
        const sourceId = `${event.title}-${event.startDate}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        // Store or update venue if provided
        let venueId: string | null = null;
        if (event.location) {
          // Check if venue exists by address
          const existingVenue = await prisma.venue.findFirst({
            where: {
              address: event.location.address,
              city: event.location.city,
              state: event.location.state,
            }
          });

          if (existingVenue) {
            // Update existing venue
            const venue = await prisma.venue.update({
              where: {
                id: existingVenue.id
              },
              data: {
                name: event.location.name,
                address: event.location.address,
                city: event.location.city,
                state: event.location.state,
                zipCode: event.location.zipCode,
                latitude: existingVenue.latitude,
                longitude: existingVenue.longitude,
              }
            });
            venueId = venue.id;
          } else {
            // Create new venue with default coordinates for North Carolina
            const venue = await prisma.venue.create({
              data: {
                name: event.location.name,
                address: event.location.address,
                city: event.location.city,
                state: event.location.state,
                zipCode: event.location.zipCode,
                latitude: 35.7596, // Default to NC coordinates
                longitude: -79.0193,
              }
            });
            venueId = venue.id;
          }
        }

        // Store the event
        const storedEvent = await prisma.event.upsert({
          where: {
            sourceUrl_sourceId: {
              sourceUrl: url,
              sourceId,
            },
          },
          update: {
            title: event.title,
            description: event.description,
            startDate: new Date(event.startDate),
            endDate: new Date(event.endDate),
            venueId,
            industries: categories.industries,
            eventType: categories.eventType,
          },
          create: {
            title: event.title,
            description: event.description,
            startDate: new Date(event.startDate),
            endDate: new Date(event.endDate),
            venueId,
            sourceUrl: url,
            sourceId,
            industries: categories.industries,
            eventType: categories.eventType,
          },
        });
        
        processedEvents.push(storedEvent);
      } catch (error) {
        console.error('Error processing event:', error);
      }
    }

    // Store or update the event source
    await prisma.eventSource.upsert({
      where: {
        url,
      },
      update: {
        lastScraped: new Date(),
      },
      create: {
        url,
        name: new URL(url).hostname,
        type: 'OTHER',
        scrapeConfig: {},
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      eventsProcessed: processedEvents.length,
      events: processedEvents,
    });
  } catch (error) {
    console.error('Error scraping events:', error);
    return NextResponse.json(
      { error: 'Failed to scrape events' },
      { status: 500 }
    );
  }
} 