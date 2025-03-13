import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { UserProvider } from "./context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NetNav - Networking Event Calendar",
  description: "Discover business networking events in your area based on your location, industry, and preferences.",
  metadataBase: new URL('https://netnav.app'),
  keywords: ["networking", "business events", "professional networking", "industry events", "conferences", "meetups"],
  openGraph: {
    title: "NetNav - Networking Event Calendar",
    description: "Discover business networking events in your area based on your location, industry, and preferences.",
    url: 'https://netnav.app',
    siteName: 'NetNav',
    images: [
      {
        url: 'https://netnav.app/og-image.jpg',
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
    images: ['https://netnav.app/twitter-image.jpg'],
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
    canonical: 'https://netnav.app',
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
          <Header />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
