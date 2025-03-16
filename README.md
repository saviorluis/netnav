# NetNav - Network Navigation Tool

A comprehensive network navigation and management tool for IT professionals. This is a commercial application that helps users find and connect with local networking events.

## Features

- Location-based event search
- Industry filtering
- Professional networking opportunities
- Real-time event updates
- Mobile-responsive design
- Premium features for subscribers

## Monetization

NetNav offers several monetization options:

1. **Subscription Plans**

   - Basic: Free access to essential features
   - Pro: Advanced search, calendar integration, and event notifications
   - Enterprise: Custom solutions for organizations

2. **Featured Events**

   - Event organizers can pay to have their events highlighted
   - Priority placement in search results
   - Enhanced event visibility

3. **Sponsored Content**
   - Targeted advertising for businesses in the networking space
   - Premium placement in relevant categories
   - Custom promotional opportunities

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Radix UI
- Lucide Icons

## Development Setup

### Prerequisites

- Node.js 18.17 or later
- npm 9.0 or later

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/netnav.git
   cd netnav
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory:

   ```
   NEXT_PUBLIC_DOMAIN=localhost:3000
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Start the development server:

   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

- `npm run dev` - Start the development server
- `npm run build` - Build the application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
app/
├── components/
│   └── ui/           # Reusable UI components
├── hooks/            # Custom React hooks
├── lib/             # Utility functions
├── styles/          # Global styles and design tokens
└── page.tsx         # Homepage
```

## Legal

This software is proprietary and is not open source. All rights reserved.

- [Terms of Service](TERMS_OF_SERVICE.md)
- [Privacy Policy](PRIVACY_POLICY.md)

Copyright (c) 2024 Network Navigator

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
