import { load } from 'cheerio';
import { parse } from 'date-fns';
import { BaseScraper, ScrapedEvent } from './BaseScraper';

interface CheerioScraperConfig {
  eventSelector: string;
  titleSelector: string;
  descriptionSelector: string;
  dateSelector: string;
  locationSelector: string;
  dateFormat: string;
}

export class CheerioScraper extends BaseScraper {
  async scrapeEvents(sourceUrl: string): Promise<ScrapedEvent[]> {
    // Get the source configuration
    const source = await this.prisma.eventSource.findUnique({
      where: { url: sourceUrl },
    });

    if (!source) {
      throw new Error('Event source not found');
    }

    // Properly cast the JSON to the expected interface with type checking
    const scrapeConfig = source.scrapeConfig as Record<string, unknown>;
    
    // Validate that the config has all required properties
    const config: CheerioScraperConfig = {
      eventSelector: typeof scrapeConfig.eventSelector === 'string' ? scrapeConfig.eventSelector : '',
      titleSelector: typeof scrapeConfig.titleSelector === 'string' ? scrapeConfig.titleSelector : '',
      descriptionSelector: typeof scrapeConfig.descriptionSelector === 'string' ? scrapeConfig.descriptionSelector : '',
      dateSelector: typeof scrapeConfig.dateSelector === 'string' ? scrapeConfig.dateSelector : '',
      locationSelector: typeof scrapeConfig.locationSelector === 'string' ? scrapeConfig.locationSelector : '',
      dateFormat: typeof scrapeConfig.dateFormat === 'string' ? scrapeConfig.dateFormat : 'yyyy-MM-dd',
    };
    
    const response = await fetch(sourceUrl);
    const html = await response.text();
    const $ = load(html);

    const events: ScrapedEvent[] = [];

    $(config.eventSelector).each((_, element) => {
      try {
        const $element = $(element);
        const title = $element.find(config.titleSelector).text().trim();
        const description = $element.find(config.descriptionSelector).text().trim();
        const dateStr = $element.find(config.dateSelector).text().trim();
        const locationText = $element.find(config.locationSelector).text().trim();
        const sourceId = $element.attr('id') || $element.attr('data-id') || `${title}-${dateStr}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        // Parse date using the configured format
        const startDate = parse(dateStr, config.dateFormat, new Date());
        const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // Default 2 hours if not specified

        // Parse location (simplified example)
        const location = this.parseLocation(locationText);

        events.push({
          title,
          description,
          startDate,
          endDate,
          location,
          sourceUrl,
          sourceId,
        });
      } catch (error) {
        console.error('Error parsing event:', error);
        // Continue with next event
      }
    });

    return events;
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