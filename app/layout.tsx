import { Inter } from 'next/font/google';
import { UserProvider } from './context/UserContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import './globals.css';
import Script from 'next/script';

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
  manifest: '/manifest.json',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href={url} />
        <link rel="dns-prefetch" href={url} />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Add preload for critical resources */}
        <link 
          rel="preload" 
          href="/_next/static/css/app/layout.css" 
          as="style"
        />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <noscript>
          <div className="p-4 bg-yellow-100 text-yellow-800 text-center">
            This application requires JavaScript to be enabled for full functionality.
          </div>
        </noscript>
        
        <ErrorBoundary>
          <UserProvider>
            {children}
          </UserProvider>
        </ErrorBoundary>
        
        {/* Error tracking script with defer to not block rendering */}
        <Script
          id="error-tracking"
          strategy="afterInteractive"
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
        
        {/* Add progressive loading indicator */}
        <Script
          id="loading-indicator"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Show loading indicator
              (function() {
                if (document.body) {
                  const loadingEl = document.createElement('div');
                  loadingEl.id = 'app-loading';
                  loadingEl.innerHTML = '<div style="position:fixed;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;background:#fff;z-index:9999;"><div style="width:40px;height:40px;border:3px solid #f3f3f3;border-top:3px solid #2563eb;border-radius:50%;animation:spin 1s linear infinite;"></div></div><style>@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}</style>';
                  document.body.appendChild(loadingEl);
                  
                  // Remove loading indicator when page is interactive
                  window.addEventListener('DOMContentLoaded', function() {
                    setTimeout(function() {
                      const loadingEl = document.getElementById('app-loading');
                      if (loadingEl) {
                        loadingEl.style.opacity = '0';
                        loadingEl.style.transition = 'opacity 0.3s ease';
                        setTimeout(function() {
                          if (loadingEl && loadingEl.parentNode) {
                            loadingEl.parentNode.removeChild(loadingEl);
                          }
                        }, 300);
                      }
                    }, 300);
                  });
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
