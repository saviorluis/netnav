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

// Temporarily disabled to fix build issues
export async function POST(request: Request) {
  return NextResponse.json(
    { message: 'Scraping functionality temporarily disabled for maintenance' },
    { status: 503 }
  );
} 