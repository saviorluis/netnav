import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';

export interface ScrapedEvent {
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

export interface EventCategories {
  industries: string[];
  eventType: string;
}

export abstract class BaseScraper {
  protected prisma: PrismaClient;
  protected openai: OpenAI;

  constructor() {
    this.prisma = new PrismaClient();
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  abstract scrapeEvents(sourceUrl: string): Promise<ScrapedEvent[]>;

  protected async categorizeEvent(event: ScrapedEvent): Promise<EventCategories> {
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
    const categories = await this.categorizeEvent(event);

    // Store or update venue if provided
    let venueId: string | null = null;
    if (event.location) {
      // First check if venue exists by address
      const existingVenue = await this.prisma.venue.findFirst({
        where: {
          address: event.location.address,
          city: event.location.city,
          state: event.location.state,
        }
      });

      if (existingVenue) {
        // Update existing venue
        const venue = await this.prisma.venue.update({
          where: {
            id: existingVenue.id
          },
          data: {
            ...event.location,
          }
        });
        venueId = venue.id;
      } else {
        // Create new venue
        const venue = await this.prisma.venue.create({
          data: {
            ...event.location,
            latitude: 0, // You'll need to add geocoding
            longitude: 0,
          }
        });
        venueId = venue.id;
      }
    }

    // Store the event
    await this.prisma.event.upsert({
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
} 