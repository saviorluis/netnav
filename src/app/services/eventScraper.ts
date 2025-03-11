import { PrismaClient } from '@prisma/client';
import { load } from 'cheerio';
import OpenAI from 'openai';

const prisma = new PrismaClient();

interface ScrapedEvent {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location?: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  sourceUrl: string;
  sourceId: string;
}

interface EventCategories {
  industries: string[];
  eventType: string;
}

export class EventScraper {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async scrapeEvents(sourceUrl: string): Promise<ScrapedEvent[]> {
    // Get the source configuration
    const source = await prisma.eventSource.findUnique({
      where: { url: sourceUrl },
    });

    if (!source) {
      throw new Error('Event source not found');
    }

    const config = source.scrapeConfig as any;
    const response = await fetch(sourceUrl);
    const html = await response.text();
    const $ = load(html);

    const events: ScrapedEvent[] = [];

    // Use the configuration to extract events
    $(config.eventSelector).each((_, element) => {
      const title = $(element).find(config.titleSelector).text().trim();
      const description = $(element).find(config.descriptionSelector).text().trim();
      const dateStr = $(element).find(config.dateSelector).text().trim();
      const locationData = $(element).find(config.locationSelector).text().trim();
      const sourceId = $(element).attr('id') || $(element).attr('data-id') || '';

      // Parse dates (this is a simplified example)
      const { startDate, endDate } = this.parseDates(dateStr);

      // Parse location (this is a simplified example)
      const location = this.parseLocation(locationData);

      events.push({
        title,
        description,
        startDate,
        endDate,
        location,
        sourceUrl,
        sourceId,
      });
    });

    return events;
  }

  private parseDates(dateStr: string): { startDate: Date; endDate: Date } {
    // This is a placeholder - implement actual date parsing logic
    // You'll need to handle various date formats
    const date = new Date(dateStr);
    return {
      startDate: date,
      endDate: new Date(date.getTime() + 2 * 60 * 60 * 1000), // Default 2 hours
    };
  }

  private parseLocation(locationStr: string): any {
    // This is a placeholder - implement actual location parsing logic
    // You'll need to handle various address formats
    return null;
  }

  async categorizeEvent(event: ScrapedEvent): Promise<EventCategories> {
    const prompt = `
      Analyze this event and categorize it:
      Title: ${event.title}
      Description: ${event.description}

      1. What industries is this event relevant for? List up to 3.
      2. What type of event is this? Choose one: NETWORKING, WORKSHOP, CONFERENCE, SEMINAR, MEETUP, OTHER

      Format your response as JSON:
      {
        "industries": ["industry1", "industry2", "industry3"],
        "eventType": "EVENT_TYPE"
      }
    `;

    const completion = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const response = completion.choices[0].message?.content || '';
    return JSON.parse(response) as EventCategories;
  }

  async processAndStoreEvent(event: ScrapedEvent): Promise<void> {
    // Categorize the event
    const categories = await this.categorizeEvent(event);

    // Store or update venue if provided
    let venueId: string | null = null;
    if (event.location) {
      const venue = await prisma.venue.upsert({
        where: {
          id: 'placeholder', // You'll need a better way to identify unique venues
        },
        update: {
          ...event.location,
          // Add geocoding here
        },
        create: {
          ...event.location,
          latitude: 0, // Add geocoding
          longitude: 0, // Add geocoding
        },
      });
      venueId = venue.id;
    }

    // Store the event
    await prisma.event.upsert({
      where: {
        sourceUrl_sourceId: {
          sourceUrl: event.sourceUrl,
          sourceId: event.sourceId,
        },
      },
      update: {
        title: event.title,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        venueId,
        industries: categories.industries,
        eventType: categories.eventType,
      },
      create: {
        title: event.title,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        venueId,
        sourceUrl: event.sourceUrl,
        sourceId: event.sourceId,
        industries: categories.industries,
        eventType: categories.eventType,
      },
    });
  }

  async scrapeAndProcessSource(sourceUrl: string): Promise<void> {
    const events = await this.scrapeEvents(sourceUrl);
    
    for (const event of events) {
      await this.processAndStoreEvent(event);
    }

    // Update last scraped timestamp
    await prisma.eventSource.update({
      where: { url: sourceUrl },
      data: { lastScraped: new Date() },
    });
  }
} 