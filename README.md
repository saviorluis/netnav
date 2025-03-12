# Network Navigator

Network Navigator is a web application designed to help users find and connect with local networking events. The platform displays events on an interactive map, allowing users to discover opportunities in their area or search by zip code.

## Features

- Interactive map displaying networking events
- Zip code search functionality
- Calendar view of upcoming events
- National networking section
- Email collection for detailed event information

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Vercel

## Development

### Prerequisites

- Node.js (v18 or higher)
- npm
- PostgreSQL database

### Setup

1. Clone the repository:

   ```
   git clone https://github.com/luismendes070/neang.git
   cd neang
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/neang"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   NEXT_PUBLIC_APP_DOMAIN="localhost"
   GOOGLE_MAPS_API_KEY="your_google_maps_api_key"
   OPENAI_API_KEY="your_openai_api_key"
   ```

4. Generate Prisma client:

   ```
   npx prisma generate
   ```

5. Run database migrations:

   ```
   npx prisma migrate dev
   ```

6. Seed the database (optional):

   ```
   npm run seed
   ```

7. Start the development server:
   ```
   npm run dev
   ```

## Deployment

The application is configured for deployment on Vercel:

1. Fork or clone this repository to your GitHub account
2. Connect your GitHub repository to Vercel
3. Configure the following environment variables in Vercel:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_APP_URL`
   - `NEXT_PUBLIC_APP_DOMAIN`
   - `GOOGLE_MAPS_API_KEY`
   - `OPENAI_API_KEY`
4. Deploy the application

For automatic deployments using GitHub Actions, set up the following secrets in your GitHub repository:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## License

[MIT](LICENSE)
