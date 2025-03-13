/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable image optimization for external domains
  images: {
    domains: ['randomuser.me', 'netnav.app', 'www.netnav.app', 'localhost'],
  },
  // Configure custom domain based on environment
  assetPrefix: process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : process.env.NODE_ENV === 'production' 
      ? 'https://netnav.app' 
      : '',
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
        ],
      },
      {
        source: '/fonts/:path*',
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
    NEXT_PUBLIC_DOMAIN: process.env.VERCEL_URL || (process.env.NODE_ENV === 'production' ? 'netnav.app' : `localhost:${process.env.PORT || '3000'}`),
    NEXT_PUBLIC_URL: process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NODE_ENV === 'production' 
        ? 'https://netnav.app' 
        : `http://localhost:${process.env.PORT || '3000'}`,
  },
  // Configure redirects
  async redirects() {
    return [
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
  },
  // Configure rewrites to handle preview deployments
  async rewrites() {
    return [
      {
        source: '/_next/:path*',
        destination: '/_next/:path*',
      },
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  // Add webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Optimize webpack caching
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
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
  // Increase build output directory cleaning threshold
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        'node_modules/@esbuild/linux-x64',
      ],
    },
  },
  // Configure trailing slashes
  trailingSlash: false,
  // Configure powered by header
  poweredByHeader: false,
};

module.exports = nextConfig; 