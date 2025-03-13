import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of paths that don't require authentication
const publicPaths = [
  '/',
  '/login',
  '/signup',
  '/about',
  '/api/auth',
  '/api/events/public',
  '/_next',
  '/static',
  '/fonts',
  '/icons',
  '/manifest.json',
  '/favicon.ico',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const headers = new Headers(request.headers);
  const response = NextResponse.next({
    request: {
      headers,
    },
  });

  // Handle www to non-www redirect in production
  if (process.env.NODE_ENV === 'production') {
    const hostname = request.headers.get('host') || '';
    if (hostname.startsWith('www.')) {
      const newUrl = new URL(request.url);
      newUrl.hostname = hostname.replace(/^www\./, '');
      return NextResponse.redirect(newUrl, { status: 301 });
    }
  }

  // Add performance optimization headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  
  // Set cache control for static assets
  if (
    pathname.startsWith('/_next/static') ||
    pathname.startsWith('/static') ||
    pathname.endsWith('.js') ||
    pathname.endsWith('.css') ||
    pathname.endsWith('.woff2') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.ico')
  ) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // Set CORS headers for static assets and fonts
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/icons') ||
    pathname.endsWith('.woff2') ||
    pathname.endsWith('.ttf') ||
    pathname.endsWith('.js') ||
    pathname.endsWith('.css')
  ) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  }

  // Set priority hints for critical resources
  if (pathname === '/') {
    response.headers.set('Link', '</fonts/inter-var.woff2>; rel=preload; as=font; crossorigin; importance=high, </manifest.json>; rel=preload; as=fetch; crossorigin; importance=low');
  }

  // Check if the path is public or an API route
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
  const isApiRoute = pathname.startsWith('/api/');

  // If it's not a public path and not an API route, redirect to login
  if (!isPublicPath && !isApiRoute) {
    // Add your authentication logic here if needed
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (SEO file)
     * - sitemap.xml (SEO file)
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}; 