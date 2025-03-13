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
        url: 'https://netnav.app/images/og-image.jpg',
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
    images: ['https://netnav.app/images/twitter-image.jpg'],
  },
  manifest: '/api/manifest',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href={url} />
        <link rel="dns-prefetch" href={url} />
        <link rel="manifest" href="/api/manifest" />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <noscript>
          <div className="p-4 bg-yellow-100 text-yellow-800 text-center">
            This application requires JavaScript to be enabled for full functionality.
          </div>
        </noscript>
        
        <ErrorBoundary>
          <UserProvider>
            <div className="min-h-screen flex flex-col">
              <div className="flex-grow">
                {children}
              </div>
            </div>
          </UserProvider>
        </ErrorBoundary>
        
        {/* Error tracking script with defer to not block rendering */}
        <script
          id="error-tracking"
          defer
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
                    function removeLoadingIndicator() {
                      const loadingEl = document.getElementById('app-loading');
                      if (loadingEl) {
                        loadingEl.style.opacity = '0';
                        loadingEl.style.transition = 'opacity 0.3s ease';
                        
                        function finalRemove() {
                          if (loadingEl && loadingEl.parentNode) {
                            loadingEl.parentNode.removeChild(loadingEl);
                          }
                        }
                        
                        setTimeout(finalRemove, 300);
                      }
                    }
                    
                    window.addEventListener('DOMContentLoaded', function() {
                      setTimeout(removeLoadingIndicator, 300);
                    });
                  }
                }
                
                createLoadingIndicator();
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
