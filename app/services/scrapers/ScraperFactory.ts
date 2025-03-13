import { CheerioScraper } from './CheerioScraper';
import { PuppeteerScraper } from './PuppeteerScraper';
import { BaseScraper } from './BaseScraper';
import { PrismaClient } from '@prisma/client';

export class ScraperFactory {
  private static prisma = new PrismaClient();

  static async createScraper(sourceUrl: string): Promise<BaseScraper> {
    const source = await this.prisma.eventSource.findUnique({
      where: { url: sourceUrl },
    });

    if (!source) {
      throw new Error('Event source not found');
    }

    const config = source.scrapeConfig as any;

    // Choose scraper based on source configuration
    if (config.requiresJavaScript || config.scrollToBottom || config.clickSelector) {
      return new PuppeteerScraper();
    }

    // Default to Cheerio for static HTML
    return new CheerioScraper();
  }

  static async scrapeAllSources(): Promise<void> {
    const sources = await this.prisma.eventSource.findMany({
      where: { isActive: true },
    });

    for (const source of sources) {
      try {
        console.log(`Scraping events from ${source.name}...`);
        const scraper = await this.createScraper(source.url);
        const events = await scraper.scrapeEvents(source.url);

        for (const event of events) {
          await scraper.processAndStoreEvent(event);
        }

        // Update last scraped timestamp
        await this.prisma.eventSource.update({
          where: { id: source.id },
          data: { lastScraped: new Date() },
        });

        console.log(`Successfully scraped ${events.length} events from ${source.name}`);
      } catch (error) {
        console.error(`Error scraping ${source.name}:`, error);
      }
    }
  }
} 