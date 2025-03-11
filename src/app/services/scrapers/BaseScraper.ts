import { PrismaClient } from '@prisma/client';
import { Configuration, OpenAIApi } from 'openai';

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
  protected openai: OpenAIApi;

  constructor() {
    this.prisma = new PrismaClient();
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
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

    const completion = await this.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const response = completion.data.choices[0].message?.content || '';
    return JSON.parse(response) as EventCategories;
  }

  async processAndStoreEvent(event: ScrapedEvent): Promise<void> {
    const categories = await this.categorizeEvent(event);

    // Store or update venue if provided
    let venueId: string | null = null;
    if (event.location) {
      const venue = await this.prisma.venue.upsert({
        where: {
          address_city_state: {
            address: event.location.address,
            city: event.location.city,
            state: event.location.state,
          },
        },
        update: {
          ...event.location,
        },
        create: {
          ...event.location,
          latitude: 0, // You'll need to add geocoding
          longitude: 0,
        },
      });
      venueId = venue.id;
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