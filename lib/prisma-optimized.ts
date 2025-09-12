import { PrismaClient } from '@prisma/client';
import { prisma as globalPrisma } from './db-connection';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

import { Prisma } from '@prisma/client';

const prismaClientOptions = {
  log: [
    { level: 'error' as Prisma.LogLevel },
    { level: 'warn' as Prisma.LogLevel },
    { level: 'info' as Prisma.LogLevel, emit: 'event' as const },
  ],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  rejectOnNotFound: true,
};

// Export the global Prisma client instance
export const prisma = globalPrisma;

// Log slow queries in development
if (process.env.NODE_ENV === 'development') {
  prisma.$on('query' as never, async (e: any) => {
    if (e.duration > 1000) { // Log queries > 1s in development
      console.warn(`Slow query (${e.duration}ms): ${e.query}`, { 
        params: e.params,
        duration: e.duration,
        timestamp: e.timestamp
      });
    }
  });

  // Log connection events
  prisma.$on('info' as never, (e: any) => {
    console.log('Prisma Info:', e);
  });

  prisma.$on('warn' as never, (e: any) => {
    console.warn('Prisma Warning:', e);
  });

  prisma.$on('error' as never, (e: any) => {
    console.error('Prisma Error:', e);
  });
}
