import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of paths that don't require authentication
const publicPaths = ['/login', '/api/auth'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is public
  const isPublicPath = publicPaths.some(path => 
    pathname.startsWith(path) || pathname === '/'
  );

  // Allow public paths or API routes for authentication
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Check if the user is authenticated
  const authToken = request.cookies.get('auth_token')?.value;
  
  // If not authenticated, redirect to login
  if (!authToken) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configure which paths the middleware applies to
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /_next (Next.js internals)
     * 2. /api/auth (Auth API routes)
     * 3. /static (static files)
     * 4. /favicon.ico, /robots.txt, /sitemap.xml (SEO files)
     */
    '/((?!_next|static|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}; 