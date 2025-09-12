import { cache } from 'react';
import { prisma } from './prisma';
import { redisCache } from './redis-cache';

const isProduction = process.env.NODE_ENV === 'production';

declare global {
  // eslint-disable-next-line no-var
  var cacheStore: Record<string, { data: any; expires: number }> | undefined;
}

export const revalidate = 3600; // Revalidate data every hour

// Cache wrapper for Prisma queries
export const cachedQuery = async <T>(
  key: string,
  query: () => Promise<T>,
  ttl = 3600 // 1 hour default TTL
): Promise<T> => {
  const getCachedData = async (): Promise<T> => {
    if (isProduction) {
      try {
        // Try to get from Redis first in production
        const cached = await redisCache.get<T>(key);
        if (cached.success) {
          return cached.data;
        }
      } catch (error) {
        console.error('Redis cache error:', error);
        // Fall through to query if Redis fails
      }
    } else {
      // In-memory cache for development
      const cached = globalThis.cacheStore?.[key];
      const now = Date.now();
      
      if (cached && now < cached.expires) {
        return cached.data as T;
      }
    }
    
    // If not in cache, execute the query
    const data = await query();
    
    // Cache the result
    if (isProduction) {
      try {
        await redisCache.set(key, data, ttl);
      } catch (error) {
        console.error('Failed to cache in Redis:', error);
      }
    } else {
      if (!globalThis.cacheStore) {
        globalThis.cacheStore = {};
      }
      
      globalThis.cacheStore[key] = {
        data,
        expires: Date.now() + ttl * 1000,
      };
    }
    
    return data;
  };

  // Execute the query with error handling
  try {
    return await getCachedData();
  } catch (error) {
    console.error(`Error in cachedQuery for key ${key}:`, error);
    // Fall back to direct query if cache fails
    return await query();
  }
};

// Common queries with caching
export const getActiveAnnouncements = cache(async () => {
  return prisma.announcement.findMany({
    where: {
      deletedAt: null,
      isPublished: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });
});

export const getActiveNews = cache(async () => {
  return prisma.news.findMany({
    where: {
      deletedAt: null,
      isActive: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 6,
  });
});

export const getActivePartners = cache(async () => {
  return prisma.partner.findMany({
    where: {
      deletedAt: null,
      isActive: true,
    },
    orderBy: { order: 'asc' },
  });
});

// Add more cached queries as needed
