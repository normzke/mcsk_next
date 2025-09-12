/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost'
      },
      {
        protocol: 'https',
        hostname: 'mcsk.org'
      },
      {
        protocol: 'https',
        hostname: 'storage.mcsk.org'
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'production' 
      ? 'https://mcsk.org/api' 
      : 'http://localhost:3000/api',
    NEXT_PUBLIC_APP_URL: process.env.NODE_ENV === 'production' 
      ? 'https://mcsk.org' 
      : 'http://localhost:3000'
  },
  // Performance optimizations
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
    optimizeCss: true,
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
  // Bundle optimization
  swcMinify: true,
  compress: true,
  // Output configuration
  output: 'standalone',
  // Disable static generation for dynamic content
  trailingSlash: false,
  // Optimize for production
  poweredByHeader: false,
}

module.exports = nextConfig; 