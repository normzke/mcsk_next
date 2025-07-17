/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'mcsk.or.ke', // Add your production domain
      'storage.mcsk.or.ke', // Add your storage domain if different
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: 'http://localhost/mcsk-backend/public/api',
    NEXT_PUBLIC_APP_URL: 'http://localhost:3000'
  },
  // Enable static exports if needed
  // output: 'export',
  // Enable trailing slashes if needed
  // trailingSlash: true,
  // Add rewrites for API proxy in development
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost/mcsk-backend/public/api/:path*'
      }
    ]
  },
  // Add redirects if needed
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
  // Add headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  // Customize webpack if needed
  webpack: (config, { dev, isServer }) => {
    // Add custom webpack config here
    return config
  },
} 