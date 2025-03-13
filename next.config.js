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
    unoptimized: process.env.NODE_ENV !== 'production',
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
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data: https:; connect-src 'self' https:;"
          }
        ],
      },
      {
        source: '/_next/static/:path*',
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
    ];
  },
  // Environment variables that will be available at build time
  env: {
    NEXT_PUBLIC_DOMAIN: process.env.VERCEL_URL || 'netnav.app',
    NEXT_PUBLIC_URL: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://netnav.app',
  },
  // Configure redirects for production only
  async redirects() {
    if (process.env.VERCEL_ENV !== 'production') {
      return [];
    }
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
  // Configure rewrites
  async rewrites() {
    return [
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

      // Add font loader
      config.module.rules.push({
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[hash][ext]',
        },
      });
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