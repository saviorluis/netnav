import './globals.css';
import { Inter } from 'next/font/google';
import { UserProvider } from './context/UserContext';
import { ErrorBoundary } from './components/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

// Get the domain from environment variables
const domain = process.env.VERCEL_URL || 'netnav.app';
const url = `https://${domain}`;

export const metadata = {
  title: 'NetNav - Network Navigation Tool',
  description: 'A comprehensive network navigation and management tool for IT professionals',
  keywords: ['network', 'navigation', 'IT', 'management', 'monitoring', 'dashboard'],
  authors: [{ name: 'NetNav Team' }],
  creator: 'NetNav',
  publisher: 'NetNav',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'NetNav - Network Navigation Tool',
    description: 'A comprehensive network navigation and management tool for IT professionals',
    url: 'https://netnav.app',
    siteName: 'NetNav',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NetNav - Network Navigation Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NetNav - Network Navigation Tool',
    description: 'A comprehensive network navigation and management tool for IT professionals',
    images: ['/images/twitter-image.jpg'],
  },
  manifest: '/manifest.json',
};

export const viewport = {
  themeColor: '#0070f3',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live *.vercel.app blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; media-src 'self'; connect-src 'self' https: wss:; frame-src 'self'; base-uri 'self'; form-action 'self'; object-src 'none'; manifest-src 'self' blob:; upgrade-insecure-requests"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href={url} />
        <link rel="dns-prefetch" href={url} />
        
        {/* Critical CSS inline to avoid render blocking */}
        <style dangerouslySetInnerHTML={{ __html: `
          body {margin:0;padding:0;min-height:100vh}
          .flex {display:flex;align-items:center;justify-content:center}
          .flex-col {flex-direction:column;align-items:center;justify-content:flex-start}
          img {max-width:100%;height:auto;display:block;position:relative}
          h1, h2, h3, h4, h5, h6 {font-weight:bold}
        `}} />
        
        {/* Embed manifest directly in HTML to avoid 401 errors */}
        <script
          type="application/manifest+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "name": "NetNav - Network Navigation Tool",
                "short_name": "NetNav",
                "description": "A comprehensive network navigation and management tool for IT professionals",
                "start_url": "/",
                "display": "standalone",
                "background_color": "#ffffff",
                "theme_color": "#0070f3",
                "icons": [
                  {
                    "src": "/icons/icon-192x192.svg",
                    "sizes": "192x192",
                    "type": "image/svg+xml",
                    "purpose": "any maskable"
                  },
                  {
                    "src": "/icons/icon-512x512.svg",
                    "sizes": "512x512",
                    "type": "image/svg+xml",
                    "purpose": "any maskable"
                  }
                ]
              }
            `
          }}
        />
        
        {/* Use both approaches for manifest to ensure compatibility */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <noscript>
          <div className="p-4 bg-yellow-100 text-yellow-800 text-center">
            This application requires JavaScript to be enabled for full functionality.
          </div>
        </noscript>
        
        <ErrorBoundary>
          <UserProvider>
            <div className="flex flex-col min-h-screen w-full">
              {children}
            </div>
          </UserProvider>
        </ErrorBoundary>
        
        {/* Simplified loading indicator */}
        <script
          id="loading-indicator"
          dangerouslySetInnerHTML={{
            __html: `
              // Show loading indicator
              (function() {
                function createLoadingIndicator() {
                  if (document.body) {
                    const loadingEl = document.createElement('div');
                    loadingEl.id = 'app-loading';
                    loadingEl.innerHTML = '<div style="position:fixed;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;background:#fff;z-index:9999;"><div style="width:40px;height:40px;border:3px solid #f3f3f3;border-top:3px solid #2563eb;border-radius:50%;animation:spin 1s linear infinite;"></div></div><style>@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}</style>';
                    document.body.appendChild(loadingEl);
                    
                    // Remove loading indicator when page is interactive
                    window.addEventListener('DOMContentLoaded', function() {
                      setTimeout(function() {
                        if (loadingEl && loadingEl.parentNode) {
                          loadingEl.parentNode.removeChild(loadingEl);
                        }
                      }, 300);
                    });
                  }
                }
                
                createLoadingIndicator();
              })();
            `,
          }}
        />
        
        {/* Basic error tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', function(e) {
                console.error('Window Error:', e.message);
              });
            `
          }}
        />
      </body>
    </html>
  );
}
