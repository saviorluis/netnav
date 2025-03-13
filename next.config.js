/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable image optimization for external domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'netnav.app',
      },
      {
        protocol: 'https',
        hostname: 'www.netnav.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
    ],
    unoptimized: false,
  },
  // Configure headers for better security and CORS
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Authorization',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: https: blob:",
              "media-src 'self'",
              "connect-src 'self' https: wss:",
              "frame-src 'self'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "object-src 'none'",
              "manifest-src 'self'",
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ],
      },
      {
        source: '/_next/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
            // This header will be overridden by Next.js for the correct content type
          },
        ],
      },
      {
        source: '/_next/static/css/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/css; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600',
          },
        ],
      },
      {
        source: '/icons/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Environment variables that will be available at build time
  env: {
    NEXT_PUBLIC_DOMAIN: process.env.VERCEL_URL || 'netnav.app',
    NEXT_PUBLIC_URL: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://netnav.app',
  },
  // Configure redirects for production only
  async redirects() {
    const redirects = [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.netnav.app',
          },
        ],
        destination: 'https://netnav.app/:path*',
        permanent: true,
      },
    ];

    return redirects;
  },
  // Configure rewrites
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
      {
        source: '/:path*/_rsc:params*',
        destination: '/:path*',
      },
    ];
  },
  // Add webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Optimize webpack caching
    if (!isServer) {
      // Optimize code splitting
      config.optimization = {
        ...config.optimization,
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 10,
          minSize: 0,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: (module) => {
                // Get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context && 
                  module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
                
                if (!packageName || !packageName[1]) {
                  return 'vendor';
                }
                
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName[1].replace('@', '')}`;
              },
              priority: 10,
              reuseExistingChunk: true,
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 1,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    // Disable persistent caching in development
    if (dev) {
      config.cache = false;
    }

    return config;
  },
  // Disable React StrictMode in development to prevent double mounting
  reactStrictMode: process.env.NODE_ENV === 'production',
  // Enable SWC minification
  swcMinify: true,
  // Configure trailing slashes
  trailingSlash: false,
  // Configure powered by header
  poweredByHeader: false,
  // Optimize script loading
  experimental: {
    optimizeCss: true,
    optimizeServerReact: true,
    scrollRestoration: true,
  },
  // Configure compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig; 