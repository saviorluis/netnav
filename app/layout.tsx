import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import { UserProvider } from "./context/UserContext";
import { ErrorBoundary } from "./components/ErrorBoundary";

// Use system fonts as fallback
const systemFont = localFont({
  src: [
    {
      path: '../public/fonts/inter-var.woff2',
      style: 'normal',
    }
  ],
  variable: '--font-inter',
  display: 'swap',
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    'sans-serif'
  ]
});

// Get the domain from environment variables, defaulting to localhost for development
const domain = process.env.NODE_ENV === 'development' 
  ? `localhost:${process.env.PORT || '3000'}`
  : 'netnav.app';

const url = process.env.NODE_ENV === 'development'
  ? `http://${domain}`
  : `https://${domain}`;

export const metadata: Metadata = {
  title: "NetNav - Networking Event Calendar",
  description: "Discover business networking events in your area based on your location, industry, and preferences.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={systemFont.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href={url} />
        <link rel="dns-prefetch" href={url} />
      </head>
      <body className="font-sans">
        <ErrorBoundary>
          <UserProvider>
            {children}
          </UserProvider>
        </ErrorBoundary>
        {/* Add debugging script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.onerror = function(msg, url, lineNo, columnNo, error) {
                console.error('Window Error:', { msg, url, lineNo, columnNo, error });
                return false;
              };
              window.addEventListener('unhandledrejection', function(event) {
                console.error('Unhandled Promise Rejection:', event.reason);
              });
              window.addEventListener('DOMContentLoaded', function() {
                console.log('Page loaded:', {
                  url: window.location.href,
                  hostname: window.location.hostname,
                  port: window.location.port,
                  protocol: window.location.protocol
                });
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
