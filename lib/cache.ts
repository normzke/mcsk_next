import { Redis } from '@upstash/redis';

// Initialize Redis client if UPSTASH_REDIS_REST_URL is available
const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
    })
  : null;

// Simple in-memory cache as fallback
const memoryCache = new Map<string, { data: any; expires: number }>();

/**
 * Cache configuration interface
 */
interface CacheOptions {
  ttl?: number; // Time to live in seconds
  tags?: string[]; // Cache tags for invalidation
}

/**
 * Get cached data by key
 */
export async function getCache<T = any>(key: string): Promise<T | null> {
  try {
    // Try Redis first if available
    if (redis) {
      const data = await redis.get<string>(`cache:${key}`);
      return data ? JSON.parse(data) : null;
    }
    
    // Fallback to in-memory cache
    const cached = memoryCache.get(key);
    if (cached && cached.expires > Date.now()) {
      return cached.data;
    }
    return null;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

/**
 * Set data in cache
 */
export async function setCache(
  key: string,
  data: any,
  options: CacheOptions = { ttl: 300 }
): Promise<boolean> {
  try {
    const ttl = options?.ttl || 300; // Default 5 minutes
    const expires = Date.now() + ttl * 1000;
    
    if (redis) {
      await redis.set(`cache:${key}`, JSON.stringify(data), {
        ex: ttl,
      });
      
      // Store cache tags if provided
      if (options.tags?.length) {
        await Promise.all(
          options.tags.map((tag) =>
            redis.sadd(`cache:tags:${tag}`, `cache:${key}`)
          )
        );
      }
    } else {
      // Fallback to in-memory cache
      memoryCache.set(key, { data, expires });
    }
    
    return true;
  } catch (error) {
    console.error('Cache set error:', error);
    return false;
  }
}

/**
 * Invalidate cache by key or tag
 */
export async function invalidateCache(keyOrTag: string): Promise<boolean> {
  try {
    if (redis) {
      // If it's a tag, get all keys with this tag and delete them
      if (keyOrTag.startsWith('tag:')) {
        const tag = keyOrTag.replace('tag:', '');
        const keys = await redis.smembers(`cache:tags:${tag}`);
        if (keys.length > 0) {
          await redis.del(...keys);
        }
        await redis.del(`cache:tags:${tag}`);
      } else {
        // Otherwise delete the specific key
        await redis.del(`cache:${keyOrTag}`);
      }
    } else {
      // Fallback to in-memory cache
      if (keyOrTag.startsWith('tag:')) {
        // In-memory doesn't support tags, so we'll just clear everything
        memoryCache.clear();
      } else {
        memoryCache.delete(keyOrTag);
      }
    }
    
    return true;
  } catch (error) {
    console.error('Cache invalidation error:', error);
    return false;
  }
}

/**
 * Cache middleware for API routes
 */
export function withCache(handler: any, options: CacheOptions = { ttl: 300 }) {
  return async (req: any, res: any) => {
    // Skip caching for non-GET requests
    if (req.method !== 'GET') {
      return handler(req, res);
    }

    const cacheKey = `api:${req.url}`;
    
    try {
      // Try to get cached response
      const cachedResponse = await getCache(cacheKey);
      if (cachedResponse) {
        res.setHeader('x-cache', 'HIT');
        return res.status(200).json(cachedResponse);
      }

      // If not in cache, call the handler and cache the response
      const originalJson = res.json;
      res.json = (data: any) => {
        // Only cache successful responses
        if (res.statusCode >= 200 && res.statusCode < 300) {
          setCache(cacheKey, data, options);
        }
        return originalJson.call(res, data);
      };

      res.setHeader('x-cache', 'MISS');
      return handler(req, res);
    } catch (error) {
      console.error('Cache middleware error:', error);
      // Continue without caching if there's an error
      return handler(req, res);
    }
  };
}
