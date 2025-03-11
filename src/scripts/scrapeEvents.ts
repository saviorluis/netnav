import { ScraperFactory } from '../app/services/scrapers/ScraperFactory';

async function main() {
  try {
    console.log('Starting event scraping...');
    await ScraperFactory.scrapeAllSources();
    console.log('Event scraping completed successfully');
  } catch (error) {
    console.error('Error during event scraping:', error);
    process.exit(1);
  }
}

main(); 