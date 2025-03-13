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
  '/images',
  '/favicon.ico',
];

// List of static file extensions
const staticFileExtensions = [
  '.js',
  '.css',
  '.woff',
  '.woff2',
  '.ttf',
  '.eot',
  '.jpg',
  '.jpeg',
  '.png',
  '.svg',
  '.ico',
  '.json',
  '.webp',
  '.gif',
];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  
  // Skip middleware for manifest.json completely
  if (pathname === '/manifest.json') {
    return NextResponse.next();
  }
  
  const headers = new Headers(request.headers);
  const response = NextResponse.next({
    request: {
      headers,
    },
  });

  // Skip middleware for RSC requests
  if (pathname.includes('_rsc') || search.includes('_rsc')) {
    return NextResponse.next();
  }

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
  
  // Check if the current path is a static file
  const isStaticFile = staticFileExtensions.some(ext => pathname.endsWith(ext));
  const isStaticPath = 
    pathname.startsWith('/_next/') || 
    pathname.startsWith('/static/') || 
    pathname.startsWith('/fonts/') || 
    pathname.startsWith('/icons/') || 
    pathname.startsWith('/images/');

  // Set cache control for static assets
  if (isStaticPath || isStaticFile) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    
    // Set appropriate content types for common file types
    if (pathname.endsWith('.css')) {
      response.headers.set('Content-Type', 'text/css; charset=utf-8');
    } else if (pathname.endsWith('.js')) {
      response.headers.set('Content-Type', 'application/javascript; charset=utf-8');
    } else if (pathname.endsWith('.json')) {
      response.headers.set('Content-Type', 'application/json; charset=utf-8');
    } else if (pathname.endsWith('.woff2')) {
      response.headers.set('Content-Type', 'font/woff2');
    } else if (pathname.endsWith('.woff')) {
      response.headers.set('Content-Type', 'font/woff');
    } else if (pathname.endsWith('.ttf')) {
      response.headers.set('Content-Type', 'font/ttf');
    }
  }

  // Set priority hints for critical resources
  if (pathname === '/') {
    response.headers.set('Link', '</manifest.json>; rel=preload; as=fetch; crossorigin; importance=low');
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
     * - manifest.json (PWA manifest file)
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)',
  ],
}; 