import { PrismaClient } from '@prisma/client';
import { EventScraper } from '../app/services/eventScraper';

const prisma = new PrismaClient();

// Example source configurations
const sourcesConfig = [
  {
    url: 'https://www.chamberofcommerce.com/events',
    name: 'Chamber of Commerce Events',
    type: 'CHAMBER_OF_COMMERCE',
    scrapeConfig: {
      eventSelector: '.event-item',
      titleSelector: '.event-title',
      descriptionSelector: '.event-description',
      dateSelector: '.event-date',
      locationSelector: '.event-location',
    },
  },
  {
    url: 'https://www.bni.com/events',
    name: 'BNI Events',
    type: 'BNI',
    scrapeConfig: {
      eventSelector: '.event-card',
      titleSelector: 'h3',
      descriptionSelector: '.description',
      dateSelector: '.date-time',
      locationSelector: '.location',
    },
  },
  // Add more sources as needed
];

async function addEventSource(sourceConfig: typeof sourcesConfig[0]) {
  try {
    await prisma.eventSource.upsert({
      where: { url: sourceConfig.url },
      update: {
        name: sourceConfig.name,
        type: sourceConfig.type,
        scrapeConfig: sourceConfig.scrapeConfig,
        isActive: true,
      },
      create: {
        ...sourceConfig,
        isActive: true,
      },
    });
    console.log(`Added/updated source: ${sourceConfig.name}`);
  } catch (error) {
    console.error(`Error adding source ${sourceConfig.name}:`, error);
  }
}

async function scrapeAllSources() {
  const scraper = new EventScraper();
  const sources = await prisma.eventSource.findMany({
    where: { isActive: true },
  });

  for (const source of sources) {
    try {
      console.log(`Scraping events from ${source.name}...`);
      await scraper.scrapeAndProcessSource(source.url);
      console.log(`Finished scraping ${source.name}`);
    } catch (error) {
      console.error(`Error scraping ${source.name}:`, error);
    }
  }
}

async function main() {
  // Add/update all sources
  for (const sourceConfig of sourcesConfig) {
    await addEventSource(sourceConfig);
  }

  // Run the scraper
  await scrapeAllSources();
}

main()
  .catch((error) => {
    console.error('Script error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 