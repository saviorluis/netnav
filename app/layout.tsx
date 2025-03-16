import './globals.css';
import './styles/tokens.css';
import { Inter } from 'next/font/google';
import { ToastProvider } from '@/components/ui/ToastProvider';

const inter = Inter({ subsets: ['latin'] });

// Get the domain from environment variables
const domain = process.env.NEXT_PUBLIC_DOMAIN || process.env.VERCEL_URL || 'localhost:3000';
const url = domain.includes('localhost') ? `http://${domain}` : `https://${domain}`;

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
    url: url,
    siteName: 'NetNav',
    images: [
      {
        url: `${url}/images/og-image.jpg`,
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
    images: [`${url}/images/twitter-image.jpg`],
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
          :root {
            --font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          }
          body {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            font-family: var(--font-sans);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            background-color: #ffffff;
            color: #171717;
          }
          img {
            max-width: 100%;
            height: auto;
            display: block;
          }
          h1, h2, h3, h4, h5, h6 {
            font-weight: bold;
          }
          .container {
            width: 100%;
            max-width: 1400px;
            margin-left: auto;
            margin-right: auto;
            padding-left: 1rem;
            padding-right: 1rem;
          }
          @media (min-width: 640px) {
            .container {
              padding-left: 1.5rem;
              padding-right: 1.5rem;
            }
          }
          @media (min-width: 1024px) {
            .container {
              padding-left: 2rem;
              padding-right: 2rem;
            }
          }
        `}} />
        
        {/* Use direct manifest link */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-white font-sans antialiased text-gray-900">
        <noscript>
          <div className="p-4 bg-yellow-100 text-yellow-800 text-center">
            This application requires JavaScript to be enabled for full functionality.
          </div>
        </noscript>
        
        {children}
        
        {/* Toast Provider */}
        <ToastProvider />
        
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
      </body>
    </html>
  );
}
