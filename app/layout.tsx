import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./context/UserContext";

const inter = Inter({ subsets: ["latin"] });

// Get the domain from environment variables
const domain = process.env.NEXT_PUBLIC_DOMAIN || 'netnav.app';
const url = process.env.NEXT_PUBLIC_URL || 'https://netnav.app';

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
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
