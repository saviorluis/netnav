import { PrismaClient } from '@prisma/client';
import { addDays, addHours, setHours, setMinutes } from 'date-fns';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.rSVPEvent.deleteMany();
  await prisma.savedEvent.deleteMany();
  await prisma.event.deleteMany();
  await prisma.venue.deleteMany();
  await prisma.organizer.deleteMany();
  await prisma.eventSource.deleteMany();

  // Create test venues
  const venues = await Promise.all([
    prisma.venue.create({
      data: {
        name: 'Tech Hub Downtown',
        address: '123 Innovation St',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94105',
        latitude: 37.7897,
        longitude: -122.3981,
      },
    }),
    prisma.venue.create({
      data: {
        name: 'Financial District Conference Center',
        address: '456 Market St',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94111',
        latitude: 37.7937,
        longitude: -122.3965,
      },
    }),
    prisma.venue.create({
      data: {
        name: 'Startup Space',
        address: '789 Howard St',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94103',
        latitude: 37.7847,
        longitude: -122.3991,
      },
    }),
  ]);

  // Create test organizers
  const organizers = await Promise.all([
    prisma.organizer.create({
      data: {
        name: 'SF Chamber of Commerce',
        website: 'https://sfchamber.com',
        description: 'The Voice of Business in San Francisco',
      },
    }),
    prisma.organizer.create({
      data: {
        name: 'Tech Meetup Group',
        website: 'https://techmeetup.com',
        description: 'Connecting tech professionals in the Bay Area',
      },
    }),
    prisma.organizer.create({
      data: {
        name: 'BNI San Francisco',
        website: 'https://bnisf.com',
        description: 'Business Network International - SF Chapter',
      },
    }),
  ]);

  // Create test events
  const baseDate = new Date();
  const events = await Promise.all([
    // Tech networking events
    prisma.event.create({
      data: {
        title: 'Tech Startup Networking Night',
        description: 'Connect with fellow entrepreneurs and tech professionals in a casual setting.',
        startDate: setMinutes(setHours(addDays(baseDate, 7), 18), 0),
        endDate: setMinutes(setHours(addDays(baseDate, 7), 21), 0),
        venueId: venues[0].id,
        organizerId: organizers[1].id,
        sourceUrl: 'https://techmeetup.com/events/startup-night',
        sourceId: 'startup-night-2024',
        industries: ['Technology', 'Startups', 'Software'],
        eventType: 'NETWORKING',
      },
    }),
    prisma.event.create({
      data: {
        title: 'AI & Machine Learning Workshop',
        description: 'Learn about the latest developments in AI and network with industry experts.',
        startDate: setMinutes(setHours(addDays(baseDate, 14), 9), 0),
        endDate: setMinutes(setHours(addDays(baseDate, 14), 17), 0),
        venueId: venues[0].id,
        organizerId: organizers[1].id,
        sourceUrl: 'https://techmeetup.com/events/ai-workshop',
        sourceId: 'ai-workshop-2024',
        industries: ['Technology', 'Artificial Intelligence', 'Software'],
        eventType: 'WORKSHOP',
      },
    }),

    // Business networking events
    prisma.event.create({
      data: {
        title: 'Chamber of Commerce Monthly Mixer',
        description: 'Monthly networking event for local business leaders.',
        startDate: setMinutes(setHours(addDays(baseDate, 5), 17), 30),
        endDate: setMinutes(setHours(addDays(baseDate, 5), 19), 30),
        venueId: venues[1].id,
        organizerId: organizers[0].id,
        sourceUrl: 'https://sfchamber.com/events/monthly-mixer',
        sourceId: 'monthly-mixer-mar-2024',
        industries: ['Business', 'Finance', 'Professional Services'],
        eventType: 'NETWORKING',
      },
    }),

    // BNI events
    prisma.event.create({
      data: {
        title: 'BNI Power Network Breakfast',
        description: 'Weekly breakfast meeting for business referral networking.',
        startDate: setMinutes(setHours(addDays(baseDate, 2), 7), 0),
        endDate: setMinutes(setHours(addDays(baseDate, 2), 9), 0),
        venueId: venues[2].id,
        organizerId: organizers[2].id,
        sourceUrl: 'https://bnisf.com/events/power-network',
        sourceId: 'power-network-mar-2024',
        industries: ['Business', 'Marketing', 'Sales'],
        eventType: 'NETWORKING',
      },
    }),
  ]);

  // Create event sources
  await Promise.all([
    prisma.eventSource.create({
      data: {
        url: 'https://sfchamber.com/events',
        name: 'SF Chamber of Commerce Events',
        type: 'CHAMBER_OF_COMMERCE',
        scrapeConfig: {
          eventSelector: '.event-item',
          titleSelector: '.event-title',
          descriptionSelector: '.event-description',
          dateSelector: '.event-date',
          locationSelector: '.event-location',
        },
        isActive: true,
      },
    }),
    prisma.eventSource.create({
      data: {
        url: 'https://bnisf.com/events',
        name: 'BNI San Francisco Events',
        type: 'BNI',
        scrapeConfig: {
          eventSelector: '.event-card',
          titleSelector: 'h3',
          descriptionSelector: '.description',
          dateSelector: '.date-time',
          locationSelector: '.location',
        },
        isActive: true,
      },
    }),
  ]);

  console.log('Database seeded!');
  console.log(`Created ${venues.length} venues`);
  console.log(`Created ${organizers.length} organizers`);
  console.log(`Created ${events.length} events`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 