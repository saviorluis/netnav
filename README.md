# NetNav - Networking Events Platform

NetNav is a platform for discovering and managing networking events in North Carolina. It features event scraping, a map view, calendar integration, and an admin dashboard.

## Features

- **Event Discovery**: Find networking events in your area
- **Interactive Map**: View events on a map with location details
- **Calendar View**: See all upcoming events in a calendar format
- **Admin Dashboard**: Manage event sources, users, and settings
- **Smart Scraping**: Automatically collect events from various sources
- **Email List**: Collect and manage user email subscriptions

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/netnav.git
   cd netnav
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file with the following variables:

   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/netnav
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. Set up the database:

   ```bash
   npx prisma migrate dev
   npm run db:seed
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Access

To access the admin dashboard:

1. Click the person icon in the bottom right corner of any page
2. Login with the following credentials:
   - Username: `nnadmin`
   - Password: `passion1$2`

## Event Scraping

### Manual Scraping

To manually scrape events:

```bash
npm run scrape
```

### Automated Scraping

Set up a cron job to run the scraper automatically:

```bash
# Run daily at 2 AM
0 2 * * * cd /path/to/netnav && node scripts/run-scraper.js
```

## Deployment

The application is deployed on Vercel at [https://netnav.app](https://netnav.app).

To deploy your own instance:

1. Fork the repository
2. Connect to Vercel
3. Set up the required environment variables
4. Deploy

## Project Structure

- `app/`: Next.js application code
  - `api/`: API routes
  - `components/`: Reusable React components
  - `admin/`: Admin dashboard pages
- `prisma/`: Database schema and migrations
- `scripts/`: Utility scripts
- `src/`: Source code
  - `app/services/`: Service layer (scrapers, etc.)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
