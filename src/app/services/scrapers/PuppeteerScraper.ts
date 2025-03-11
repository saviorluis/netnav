import puppeteer from 'puppeteer';
import { parse } from 'date-fns';
import { BaseScraper, ScrapedEvent } from './BaseScraper';

interface PuppeteerScraperConfig {
  eventSelector: string;
  titleSelector: string;
  descriptionSelector: string;
  dateSelector: string;
  locationSelector: string;
  dateFormat: string;
  waitForSelector?: string;
  clickSelector?: string;
  scrollToBottom?: boolean;
}

export class PuppeteerScraper extends BaseScraper {
  async scrapeEvents(sourceUrl: string): Promise<ScrapedEvent[]> {
    const source = await this.prisma.eventSource.findUnique({
      where: { url: sourceUrl },
    });

    if (!source) {
      throw new Error('Event source not found');
    }

    const config = source.scrapeConfig as PuppeteerScraperConfig;
    const browser = await puppeteer.launch({
      headless: 'new',
    });

    try {
      const page = await browser.newPage();
      await page.goto(sourceUrl, { waitUntil: 'networkidle0' });

      // Wait for specific element if configured
      if (config.waitForSelector) {
        await page.waitForSelector(config.waitForSelector);
      }

      // Click element if configured (e.g., "Load More" button)
      if (config.clickSelector) {
        await page.click(config.clickSelector);
        await page.waitForTimeout(1000); // Wait for content to load
      }

      // Scroll to bottom if configured (for infinite scroll pages)
      if (config.scrollToBottom) {
        await this.autoScroll(page);
      }

      const events = await page.evaluate(
        (config) => {
          const events: any[] = [];
          document.querySelectorAll(config.eventSelector).forEach((element) => {
            try {
              const title = element.querySelector(config.titleSelector)?.textContent?.trim() || '';
              const description = element.querySelector(config.descriptionSelector)?.textContent?.trim() || '';
              const dateStr = element.querySelector(config.dateSelector)?.textContent?.trim() || '';
              const locationText = element.querySelector(config.locationSelector)?.textContent?.trim() || '';
              const sourceId = element.id || element.getAttribute('data-id') || `${title}-${dateStr}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');

              events.push({
                title,
                description,
                dateStr,
                locationText,
                sourceId,
              });
            } catch (error) {
              console.error('Error parsing event:', error);
            }
          });
          return events;
        },
        config
      );

      // Process events outside of page.evaluate to use date-fns
      return events.map((event) => ({
        title: event.title,
        description: event.description,
        startDate: parse(event.dateStr, config.dateFormat, new Date()),
        endDate: new Date(parse(event.dateStr, config.dateFormat, new Date()).getTime() + 2 * 60 * 60 * 1000),
        location: this.parseLocation(event.locationText),
        sourceUrl,
        sourceId: event.sourceId,
      }));
    } finally {
      await browser.close();
    }
  }

  private async autoScroll(page: puppeteer.Page) {
    await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.documentElement.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
  }

  private parseLocation(locationStr: string) {
    // This is a simplified example
    // In a real implementation, you'd want to use a proper address parser
    const parts = locationStr.split(',').map(part => part.trim());
    
    if (parts.length >= 4) {
      const [name, address, city, stateZip] = parts;
      const [state, zipCode] = stateZip.split(' ').map(part => part.trim());
      
      return {
        name,
        address,
        city,
        state,
        zipCode,
      };
    }
    
    return undefined;
  }
} 