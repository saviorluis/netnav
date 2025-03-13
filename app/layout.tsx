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
  manifest: '/manifest',
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
        
        {/* Preload critical CSS */}
        <link 
          rel="preload" 
          href="/_next/static/css/app/layout.css" 
          as="style" 
          crossOrigin="anonymous" 
        />
        
        {/* Preload critical fonts */}
        <link 
          rel="preload" 
          href="https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        
        {/* Critical CSS inline to avoid render blocking */}
        <style dangerouslySetInnerHTML={{ __html: `
          body {margin:0;padding:0;min-height:100vh}
          .center-all {display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;text-align:center!important}
        `}} />
        
        {/* Inline manifest to bypass server issues */}
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
                    "src": "/icons/icon-192x192.png",
                    "sizes": "192x192",
                    "type": "image/png",
                    "purpose": "any maskable"
                  },
                  {
                    "src": "/icons/icon-512x512.png",
                    "sizes": "512x512",
                    "type": "image/png",
                    "purpose": "any maskable"
                  },
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
        
        {/* Keep the link for browsers that support it */}
        <link rel="manifest" href="/manifest" />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased center-all">
        <noscript>
          <div className="p-4 bg-yellow-100 text-yellow-800 text-center">
            This application requires JavaScript to be enabled for full functionality.
          </div>
        </noscript>
        
        <ErrorBoundary>
          <UserProvider>
            <div className="min-h-screen flex flex-col w-full center-all">
              <div className="flex-grow w-full center-all">
                {children}
              </div>
            </div>
            
            {/* Render Diagnostics (only in development mode) */}
            {process.env.NODE_ENV !== 'production' && (
              <div id="diagnostic-container" suppressHydrationWarning>
                {/* RenderDiagnostic is imported dynamically client-side to avoid SSR issues */}
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                      (function() {
                        // Only run in browser, not during SSR
                        if (typeof window !== 'undefined') {
                          // Add diagnostic tools with a slight delay
                          setTimeout(function() {
                            import('/app/components/RenderDiagnostic').then(module => {
                              const RenderDiagnostic = module.default;
                              const React = window.React;
                              const ReactDOM = window.ReactDOM;
                              
                              if (React && ReactDOM) {
                                const container = document.getElementById('diagnostic-container');
                                if (container) {
                                  const diagnosticElement = React.createElement(RenderDiagnostic);
                                  ReactDOM.render(diagnosticElement, container);
                                }
                              }
                            }).catch(err => {
                              console.warn('Failed to load diagnostic tools:', err);
                            });
                          }, 1000);
                        }
                      })();
                    `
                  }}
                />
              </div>
            )}
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
        
        {/* Fix for content visibility */}
        <script
          id="content-visibility-fix"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Add content-visibility support detection
                if (typeof document !== 'undefined' && document.documentElement) {
                  if ('contentVisibility' in document.documentElement.style) {
                    document.documentElement.classList.add('supports-cv');
                  } else {
                    document.documentElement.classList.add('no-cv');
                  }
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
