# NetNav - Networking Event Calendar (Developer Preview)

A geolocation-based networking event discovery platform that aggregates events from various business networking sources including Chambers of Commerce, BNI, Toastmasters, and business incubators.

Visit us at [netnav.app](https://netnav.app)

## Developer Preview

NetNav is currently in developer preview. Access is restricted to authorized developers only. If you'd like to request access, please contact us at info@netnav.app.

### Developer Access

To access the developer preview:

1. You must have a valid developer account and access code
2. Use the "Developer Login" option on the homepage
3. Enter your email, password, and the provided access code

## Features

- Search for networking events by zip code and radius
- View event details including venue information
- Filter events by industry and type (virtual/in-person)
- Create a profile and connect with other professionals
- See which events your connections are attending

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Prisma (PostgreSQL)
- TailwindCSS
- OpenCage Geocoding API

## Setup for Development

1. Clone the repository:

```bash
git clone https://github.com/yourusername/netnav.git
cd netnav
```

2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables:

- Copy `.env.example` to `.env`
- Update the following variables:
  - `DATABASE_URL`: Your PostgreSQL connection string
  - `OPENCAGE_API_KEY`: Your OpenCage API key
  - `DEV_ACCESS_CODE`: The developer access code (for testing)

4. Initialize the database:

```bash
npx prisma migrate dev
```

5. Seed the database with initial data:

```bash
npm run db:seed
```

6. Start the development server:

```bash
npm run dev
```

## Creating Developer Test Account

For local testing, you can create a developer account:

1. Run the development server
2. Use the developer access code from your `.env` file
3. Create a user through the seed script:

```bash
npx prisma db seed
```

## Deployment

The application is configured to deploy on Vercel and connect to the netnav.app domain.

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Configure the following environment variables in Vercel:
   - `DATABASE_URL`: Your production database URL
   - `OPENCAGE_API_KEY`: Your OpenCage API key
   - `NODE_ENV`: Set to "production"
   - `DEV_ACCESS_CODE`: The developer access code for production
4. Deploy your application
5. Configure the custom domain (netnav.app) in Vercel's domain settings

## Database Schema

The application uses the following models:

### Event

- Stores networking event information
- Includes title, description, dates, and venue reference
- Categorized by industry and type (virtual/in-person)

### Venue

- Stores location information for events
- Includes address details and coordinates for geolocation

### User

- Stores user profile information
- Tracks industry interests and connections

### Connection

- Manages relationships between users
- Enables the social networking features

## Contributing

As this is a closed developer preview, contributions are by invitation only. If you have suggestions or find issues, please contact us directly rather than creating pull requests.

## License

This project is proprietary and confidential. All rights reserved.
