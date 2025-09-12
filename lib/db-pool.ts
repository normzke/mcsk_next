import { PrismaClient } from '@prisma/client';

// Calculate optimal pool size based on CPU cores
const calculatePoolSize = () => {
  // Default pool size
  const defaultPoolSize = 5;
  
  try {
    // In production, use 1.5x the number of CPU cores, but not more than 10
    if (process.env.NODE_ENV === 'production') {
      const os = require('os');
      const cpuCount = os.cpus().length;
      return Math.min(Math.max(Math.floor(cpuCount * 1.5), 2), 10);
    }
  } catch (error) {
    console.warn('Failed to calculate CPU count, using default pool size:', error);
  }
  
  return defaultPoolSize;
};

// Get database URL with connection pool settings
const getDatabaseUrl = () => {
  const url = new URL(process.env.DATABASE_URL || '');
  
  // Add connection pool settings
  url.searchParams.set('connection_limit', calculatePoolSize().toString());
  url.searchParams.set('pool_timeout', '10'); // 10 seconds
  
  // Add SSL configuration for production
  if (process.env.NODE_ENV === 'production') {
    url.searchParams.set('sslaccept', 'accept_invalid_certs');
    url.searchParams.set('sslmode', 'require');
  }
  
  return url.toString();
};

// Create a new Prisma client with connection pool settings
export const createPrismaClient = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
    log: [
      { level: 'error' },
      { level: 'warn' },
      process.env.NODE_ENV === 'development' && { level: 'info', emit: 'event' },
    ].filter(Boolean) as any,
  });
};

// Export a singleton instance
export const prisma = createPrismaClient();

// Handle clean shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
