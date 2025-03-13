import { Inter } from 'next/font/google';
import { UserProvider } from './context/UserContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

// Get the domain from environment variables
const domain = process.env.VERCEL_URL || 'netnav.app';
const url = `https://${domain}`;

export const metadata = {
  title: 'NetNav',
  description: 'Network Navigation Tool',
  metadataBase: new URL(url),
  keywords: ["networking", "business events", "professional networking", "industry events", "conferences", "meetups"],
  openGraph: {
    title: "NetNav - Networking Event Calendar",
    description: "Discover business networking events in your area based on your location, industry, and preferences.",
    url: url,
    siteName: 'NetNav',
    images: [
      {
        url: `${url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'NetNav - The Business Networking Platform',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NetNav - Networking Event Calendar',
    description: 'Find business networking events and connect with professionals in your industry',
    images: [`${url}/twitter-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  applicationName: 'NetNav',
  verification: {
    // Add verification tokens when you have them
    // google: 'your-google-site-verification',
  },
  alternates: {
    canonical: url,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: '#000000',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href={url} />
        <link rel="dns-prefetch" href={url} />
      </head>
      <body>
        <ErrorBoundary>
          <UserProvider>
            {children}
          </UserProvider>
        </ErrorBoundary>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', function(e) {
                console.error('Window Error:', e);
              });
              window.addEventListener('unhandledrejection', function(e) {
                console.error('Unhandled Promise Rejection:', e);
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
