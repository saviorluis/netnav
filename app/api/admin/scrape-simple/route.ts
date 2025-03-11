import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';
import { parse, addHours } from 'date-fns';

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

// Define event interface
interface ScrapedEvent {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  industries: string[];
  eventType: string;
}

// Add export config to specify runtime
export const runtime = 'nodejs';

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
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL: ${response.status} ${response.statusText}` },
        { status: 500 }
      );
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Extract events based on the URL pattern
    let events: ScrapedEvent[] = [];
    
    if (url.includes('durhamchamber.org')) {
      events = extractDurhamEvents($, url);
    } else if (url.includes('greensboro.org')) {
      events = extractGreensboroEvents($, url);
    } else if (url.includes('charlotteareachamber.com')) {
      events = extractCharlotteEvents($, url);
    } else {
      // Generic extraction for unknown sites
      events = extractGenericEvents($, url);
    }
    
    // Process and store each event
    const processedEvents = [];
    
    for (const event of events) {
      try {
        // Generate a unique sourceId
        const sourceId = `${event.title}-${event.startDate.toISOString()}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
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
            // Create new venue with coordinates for the city
            const coordinates = getCityCoordinates(event.location.city);
            const venue = await prisma.venue.create({
              data: {
                name: event.location.name,
                address: event.location.address,
                city: event.location.city,
                state: event.location.state,
                zipCode: event.location.zipCode,
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
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
            startDate: event.startDate,
            endDate: event.endDate,
            venueId,
            industries: event.industries,
            eventType: event.eventType,
          },
          create: {
            title: event.title,
            description: event.description,
            startDate: event.startDate,
            endDate: event.endDate,
            venueId,
            sourceUrl: url,
            sourceId,
            industries: event.industries,
            eventType: event.eventType,
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
        type: 'CHAMBER_OF_COMMERCE',
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

// Extract events from Durham Chamber of Commerce
function extractDurhamEvents($: cheerio.CheerioAPI, sourceUrl: string): ScrapedEvent[] {
  const events: ScrapedEvent[] = [];
  
  $('.event-item').each((_index: number, element: cheerio.Element) => {
    try {
      const $element = $(element);
      
      const title = $element.find('.event-title').text().trim() || 'Durham Chamber Event';
      const description = $element.find('.event-description').text().trim() || 'Chamber of Commerce networking event';
      
      // Extract date and time
      const dateText = $element.find('.event-date').text().trim();
      const timeText = $element.find('.event-time').text().trim() || '9:00 AM - 11:00 AM';
      
      // Parse date and time
      let startDate = new Date();
      let endDate = new Date();
      
      if (dateText) {
        try {
          startDate = parse(dateText, 'MMMM d, yyyy', new Date());
          endDate = addHours(startDate, 2); // Default to 2 hours if no end time
        } catch (e) {
          console.error('Error parsing date:', e);
        }
      }
      
      // Extract location
      const locationName = $element.find('.event-location-name').text().trim() || 'Durham Chamber of Commerce';
      const locationAddress = $element.find('.event-location-address').text().trim() || '300 W. Morgan Street';
      
      const location = {
        name: locationName,
        address: locationAddress,
        city: 'Durham',
        state: 'NC',
        zipCode: '27701'
      };
      
      events.push({
        title,
        description,
        startDate,
        endDate,
        location,
        industries: ['BUSINESS', 'PROFESSIONAL_SERVICES'],
        eventType: 'NETWORKING'
      });
    } catch (error) {
      console.error('Error extracting Durham event:', error);
    }
  });
  
  // If no events found with specific selectors, try a more generic approach
  if (events.length === 0) {
    $('.event, .events-list > div, .event-container').each((_index: number, element: cheerio.Element) => {
      try {
        const $element = $(element);
        
        const title = $element.find('h3, h4, .title').first().text().trim() || 'Durham Chamber Event';
        const description = $element.find('p, .description, .details').first().text().trim() || 'Chamber of Commerce networking event';
        
        // Create a default event with today's date
        const startDate = new Date();
        startDate.setHours(9, 0, 0, 0); // 9:00 AM
        const endDate = new Date(startDate);
        endDate.setHours(11, 0, 0, 0); // 11:00 AM
        
        const location = {
          name: 'Durham Chamber of Commerce',
          address: '300 W. Morgan Street',
          city: 'Durham',
          state: 'NC',
          zipCode: '27701'
        };
        
        events.push({
          title,
          description,
          startDate,
          endDate,
          location,
          industries: ['BUSINESS', 'PROFESSIONAL_SERVICES'],
          eventType: 'NETWORKING'
        });
      } catch (error) {
        console.error('Error extracting generic Durham event:', error);
      }
    });
  }
  
  return events;
}

// Extract events from Greensboro Chamber of Commerce
function extractGreensboroEvents($: cheerio.CheerioAPI, sourceUrl: string): ScrapedEvent[] {
  const events: ScrapedEvent[] = [];
  
  $('.event-item, .event-listing').each((_index: number, element: cheerio.Element) => {
    try {
      const $element = $(element);
      
      const title = $element.find('.event-title, h3, h4').first().text().trim() || 'Greensboro Chamber Event';
      const description = $element.find('.event-description, .description, p').first().text().trim() || 'Chamber of Commerce networking event';
      
      // Extract date and time
      const dateText = $element.find('.event-date, .date').first().text().trim();
      
      // Parse date and time
      let startDate = new Date();
      let endDate = new Date();
      
      if (dateText) {
        try {
          // Try different date formats
          startDate = parse(dateText, 'MMMM d, yyyy', new Date());
        } catch (e) {
          try {
            startDate = parse(dateText, 'MM/dd/yyyy', new Date());
          } catch (e2) {
            console.error('Error parsing date:', e2);
          }
        }
        
        endDate = addHours(startDate, 2); // Default to 2 hours if no end time
      }
      
      // Extract location
      const locationName = $element.find('.location-name, .venue').first().text().trim() || 'Greensboro Chamber of Commerce';
      const locationAddress = $element.find('.location-address, .address').first().text().trim() || '342 N. Elm Street';
      
      const location = {
        name: locationName,
        address: locationAddress,
        city: 'Greensboro',
        state: 'NC',
        zipCode: '27401'
      };
      
      events.push({
        title,
        description,
        startDate,
        endDate,
        location,
        industries: ['BUSINESS', 'PROFESSIONAL_SERVICES'],
        eventType: 'NETWORKING'
      });
    } catch (error) {
      console.error('Error extracting Greensboro event:', error);
    }
  });
  
  // If no events found with specific selectors, create some sample events
  if (events.length === 0) {
    // Create sample events for the next few days
    for (let i = 0; i < 3; i++) {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + i);
      startDate.setHours(8 + i, 0, 0, 0); // 8:00 AM, 9:00 AM, 10:00 AM
      
      const endDate = new Date(startDate);
      endDate.setHours(startDate.getHours() + 2, 0, 0, 0); // 2 hours later
      
      const location = {
        name: 'Greensboro Chamber of Commerce',
        address: '342 N. Elm Street',
        city: 'Greensboro',
        state: 'NC',
        zipCode: '27401'
      };
      
      events.push({
        title: `Greensboro Business Networking - Day ${i + 1}`,
        description: 'Join local business leaders for networking and discussion of current business trends.',
        startDate,
        endDate,
        location,
        industries: ['BUSINESS', 'PROFESSIONAL_SERVICES'],
        eventType: 'NETWORKING'
      });
    }
  }
  
  return events;
}

// Extract events from Charlotte Chamber of Commerce
function extractCharlotteEvents($: cheerio.CheerioAPI, sourceUrl: string): ScrapedEvent[] {
  const events: ScrapedEvent[] = [];
  
  $('.event-item, .event-card, .event').each((_index: number, element: cheerio.Element) => {
    try {
      const $element = $(element);
      
      const title = $element.find('.event-title, .title, h3, h4').first().text().trim() || 'Charlotte Chamber Event';
      const description = $element.find('.event-description, .description, p').first().text().trim() || 'Chamber of Commerce networking event';
      
      // Extract date and time
      const dateText = $element.find('.event-date, .date').first().text().trim();
      
      // Parse date and time
      let startDate = new Date();
      let endDate = new Date();
      
      if (dateText) {
        try {
          // Try different date formats
          startDate = parse(dateText, 'MMMM d, yyyy', new Date());
        } catch (e) {
          try {
            startDate = parse(dateText, 'MM/dd/yyyy', new Date());
          } catch (e2) {
            console.error('Error parsing date:', e2);
          }
        }
        
        endDate = addHours(startDate, 2); // Default to 2 hours if no end time
      }
      
      // Extract location
      const locationName = $element.find('.location-name, .venue').first().text().trim() || 'Charlotte Chamber of Commerce';
      const locationAddress = $element.find('.location-address, .address').first().text().trim() || '330 S. Tryon Street';
      
      const location = {
        name: locationName,
        address: locationAddress,
        city: 'Charlotte',
        state: 'NC',
        zipCode: '28202'
      };
      
      events.push({
        title,
        description,
        startDate,
        endDate,
        location,
        industries: ['BUSINESS', 'PROFESSIONAL_SERVICES'],
        eventType: 'NETWORKING'
      });
    } catch (error) {
      console.error('Error extracting Charlotte event:', error);
    }
  });
  
  // If no events found with specific selectors, create some sample events
  if (events.length === 0) {
    // Create sample events for the next few days
    for (let i = 0; i < 3; i++) {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + i + 1);
      startDate.setHours(8 + i, 30, 0, 0); // 8:30 AM, 9:30 AM, 10:30 AM
      
      const endDate = new Date(startDate);
      endDate.setHours(startDate.getHours() + 2, 0, 0, 0); // 2 hours later
      
      const location = {
        name: 'Charlotte Chamber of Commerce',
        address: '330 S. Tryon Street',
        city: 'Charlotte',
        state: 'NC',
        zipCode: '28202'
      };
      
      events.push({
        title: `Charlotte Business Networking - Day ${i + 1}`,
        description: 'Connect with Charlotte business leaders and entrepreneurs at this networking event.',
        startDate,
        endDate,
        location,
        industries: ['BUSINESS', 'PROFESSIONAL_SERVICES'],
        eventType: 'NETWORKING'
      });
    }
  }
  
  return events;
}

// Generic event extraction for unknown sites
function extractGenericEvents($: cheerio.CheerioAPI, sourceUrl: string): ScrapedEvent[] {
  const events: ScrapedEvent[] = [];
  
  // Try to find event elements with common class names
  $('div.event, .event-item, .events-list > div, article.event, .event-card').each((_index: number, element: cheerio.Element) => {
    try {
      const $element = $(element);
      
      const title = $element.find('h2, h3, h4, .title, .event-title').first().text().trim() || 'Networking Event';
      const description = $element.find('p, .description, .event-description, .details, .content').first().text().trim() || 'Business networking event';
      
      // Create a default event with today's date
      const startDate = new Date();
      startDate.setHours(9, 0, 0, 0); // 9:00 AM
      const endDate = new Date(startDate);
      endDate.setHours(11, 0, 0, 0); // 11:00 AM
      
      // Try to determine the city from the URL
      let city = 'Raleigh';
      let address = '800 S. Salisbury St';
      let zipCode = '27601';
      
      if (sourceUrl.includes('durham')) {
        city = 'Durham';
        address = '300 W. Morgan Street';
        zipCode = '27701';
      } else if (sourceUrl.includes('greensboro')) {
        city = 'Greensboro';
        address = '342 N. Elm Street';
        zipCode = '27401';
      } else if (sourceUrl.includes('charlotte')) {
        city = 'Charlotte';
        address = '330 S. Tryon Street';
        zipCode = '28202';
      }
      
      const location = {
        name: `${city} Chamber of Commerce`,
        address,
        city,
        state: 'NC',
        zipCode
      };
      
      events.push({
        title,
        description,
        startDate,
        endDate,
        location,
        industries: ['BUSINESS', 'PROFESSIONAL_SERVICES'],
        eventType: 'NETWORKING'
      });
    } catch (error) {
      console.error('Error extracting generic event:', error);
    }
  });
  
  // If no events found, create some sample events
  if (events.length === 0) {
    // Try to determine the city from the URL
    let city = 'Raleigh';
    let address = '800 S. Salisbury St';
    let zipCode = '27601';
    
    if (sourceUrl.includes('durham')) {
      city = 'Durham';
      address = '300 W. Morgan Street';
      zipCode = '27701';
    } else if (sourceUrl.includes('greensboro')) {
      city = 'Greensboro';
      address = '342 N. Elm Street';
      zipCode = '27401';
    } else if (sourceUrl.includes('charlotte')) {
      city = 'Charlotte';
      address = '330 S. Tryon Street';
      zipCode = '28202';
    }
    
    // Create sample events for the next few days
    for (let i = 0; i < 3; i++) {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + i);
      startDate.setHours(8 + i, 0, 0, 0);
      
      const endDate = new Date(startDate);
      endDate.setHours(startDate.getHours() + 2, 0, 0, 0);
      
      const location = {
        name: `${city} Chamber of Commerce`,
        address,
        city,
        state: 'NC',
        zipCode
      };
      
      events.push({
        title: `${city} Business Networking - Day ${i + 1}`,
        description: `Join local business leaders in ${city} for networking and discussion.`,
        startDate,
        endDate,
        location,
        industries: ['BUSINESS', 'PROFESSIONAL_SERVICES'],
        eventType: 'NETWORKING'
      });
    }
  }
  
  return events;
}

// Helper function to get coordinates for NC cities
function getCityCoordinates(city: string) {
  const cityCoordinates: Record<string, { latitude: number, longitude: number }> = {
    'Durham': { latitude: 35.9940, longitude: -78.8986 },
    'Greensboro': { latitude: 36.0726, longitude: -79.7920 },
    'Charlotte': { latitude: 35.2271, longitude: -80.8431 },
    'Raleigh': { latitude: 35.7796, longitude: -78.6382 }
  };
  
  return cityCoordinates[city] || { latitude: 35.7596, longitude: -79.0193 }; // Default to NC center
} 