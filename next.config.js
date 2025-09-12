/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode
  reactStrictMode: true,
  
  // Enable production browser source maps
  productionBrowserSourceMaps: false,
  
  // Enable static exports for better caching
  output: 'standalone',
  
  // Enable SWC minification
  swcMinify: true,
  
  // Enable compression
  compress: true,
  
  // Enable experimental optimizations
  experimental: {
    // Enable server components external packages
    serverComponentsExternalPackages: ['@prisma/client'],
    // Enable optimized package imports
    optimizePackageImports: [
      '@radix-ui/react-icons',
      'lucide-react',
      'date-fns',
      'react-day-picker',
      'recharts'
    ],
    // Enable server actions
    serverActions: true,
    // Enable optimized route loading
    optimizeCss: true,
    // Enable gzip compression
    gzipSize: true,
  },
  
  // Enable webpack optimizations
  webpack: (config, { isServer }) => {
    // Only run these optimizations on the client build
    if (!isServer) {
      // Enable module concatenation
      config.optimization.concatenateModules = true;
      
      // Enable tree shaking
      config.optimization.usedExports = true;
      
      // Split chunks for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 10,
        maxAsyncRequests: 10,
        cacheGroups: {
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            priority: 10,
            enforce: true
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }
    
    return config;
  },
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
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400, // 24 hours
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'production' 
      ? 'https://mcsk.org/api' 
      : 'http://localhost:3000/api',
    NEXT_PUBLIC_APP_URL: process.env.NODE_ENV === 'production' 
      ? 'https://mcsk.org' 
      : 'http://localhost:3000',
    // Enable performance monitoring in production
    NEXT_PUBLIC_ENABLE_ANALYTICS: process.env.NODE_ENV === 'production' ? 'true' : 'false'
  },
  // Performance optimizations
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
    optimizeCss: true,
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
    // Enable React 18 concurrent features
    reactRoot: true,
    // Enable server components
    serverComponents: true,
    // Enable new link behavior
    newNextLinkBehavior: true,
  },
  // Bundle optimization
  swcMinify: true,
  compress: true,
  // Output configuration
  output: 'standalone',
  // Disable static generation for dynamic content
  trailingSlash: false,
  // Security headers
  headers: async () => [
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
      ],
    },
  ],
  // Image optimization
  images: {
    domains: ['mcsk.org', 'storage.mcsk.org'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400, // 24 hours
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Only run these optimizations in production
    if (process.env.NODE_ENV === 'production') {
      // Enable tree shaking
      config.optimization.usedExports = true;
      
      // Enable module concatenation
      config.optimization.concatenateModules = true;
      
      // Minify JavaScript
      config.optimization.minimize = true;
    }
    
    return config;
  },
  // Optimize package imports
  optimizePackageImports: [
    '@radix-ui/react-icons',
    'lucide-react',
    'date-fns',
    'lodash',
  ],
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  // Enable React Strict Mode
  reactStrictMode: true,
  // Disable powered by header
  poweredByHeader: false,
  // Enable static optimization for pages
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    legacyBrowsers: false,
    browsersListForSwc: true,
  },
}

module.exports = nextConfig; 