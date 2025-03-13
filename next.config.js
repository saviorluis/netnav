/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable image optimization for external domains
  images: {
    domains: ['randomuser.me'], // For the profile images used in the connections page
  },
  // Configure custom domain
  // assetPrefix: process.env.NODE_ENV === 'production' ? 'https://netnav.app' : undefined,
  // Base path if you're not hosting at the domain root
  // basePath: '',
  // Configure headers for better security
  headers: async () => {
    return [
      {
        source: '/(.*)',
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
        ],
      },
    ];
  },
  // Environment variables that will be available at build time
  env: {
    NEXT_PUBLIC_DOMAIN: 'netnav.app',
    NEXT_PUBLIC_URL: 'https://netnav.app',
  },
  // Configure rewrites for API endpoints
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  // Add webpack configuration to handle undici library issues
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `undici` module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        undici: false,
        cheerio: false,
        'node:stream': false,
        'node:util': false,
        'node:url': false,
        'node:buffer': false,
        'node:path': false,
      };
    }
    
    // Ignore specific modules that cause issues
    config.module = {
      ...config.module,
      exprContextCritical: false,
      rules: [
        ...config.module.rules,
        {
          test: /node_modules\/undici\/.*\.js$/,
          use: 'null-loader',
        },
      ],
    };
    
    return config;
  },
};

module.exports = nextConfig; 