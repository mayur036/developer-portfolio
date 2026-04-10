import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /**
   * Enable gzip/brotli compression for all responses.
   * This reduces transfer size for JS bundles, improving LCP and TBT.
   */
  compress: true,

  /**
   * Powered-by header is unnecessary and reveals tech stack to scanners.
   */
  poweredByHeader: false,

  /**
   * Strict React mode catches common bugs and prepares for concurrent features.
   */
  reactStrictMode: true,

  images: {
    /** Serve modern image formats for smaller file sizes */
    formats: ['image/avif', 'image/webp'],
  },

  /**
   * Security and caching headers for better Lighthouse Best Practices score.
   */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        /** Cache static assets aggressively */
        source: '/(.*)\\.(ico|svg|png|jpg|jpeg|gif|webp|avif|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
