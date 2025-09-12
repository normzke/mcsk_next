import { createClient, RedisClientType } from 'redis';

type CacheResult<T> = { success: true; data: T } | { success: false; error: Error };

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const DEFAULT_TTL = 3600; // 1 hour

interface RedisCacheConfig {
  url: string;
  ttl?: number;
  maxRetries?: number;
  connectTimeout?: number;
}

class RedisCache {
  private client: RedisClientType;
  private static instance: RedisCache;
  private isConnected = false;
  private config: RedisCacheConfig;

  private constructor(config?: Partial<RedisCacheConfig>) {
    this.config = {
      url: REDIS_URL,
      ttl: DEFAULT_TTL,
      maxRetries: 3,
      connectTimeout: 10000, // 10 seconds
      ...config
    };

    this.client = createClient({
      url: this.config.url,
      socket: {
        reconnectStrategy: (retries: number): number | Error => {
          if (retries > (this.config.maxRetries || 3)) {
            console.error('Max retries reached. Could not connect to Redis');
            return new Error('Could not connect to Redis');
          }
          return Math.min(retries * 1000, 5000); // Exponential backoff up to 5s
        },
        connectTimeout: this.config.connectTimeout
      }
    }) as RedisClientType;

    // Handle connection events
    this.client.on('connect', () => {
      this.isConnected = true;
      console.log('Redis client connected');
    });

    this.client.on('error', (err) => {
      this.isConnected = false;
      console.error('Redis Client Error:', err);
    });

    this.client.on('reconnecting', () => {
      this.isConnected = false;
      console.log('Reconnecting to Redis...');
    });

    // Initialize connection
    this.connect().catch(console.error);
  }

  public static getInstance(config?: Partial<RedisCacheConfig>): RedisCache {
    if (!RedisCache.instance) {
      RedisCache.instance = new RedisCache(config);
    }
    return RedisCache.instance;
  }

  private async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.isConnected = true;
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
      this.isConnected = false;
      throw error;
    }
  }

  async get<T>(key: string): Promise<CacheResult<T>> {
    if (!this.isConnected) {
      return { 
        success: false, 
        error: new Error('Redis client not connected') 
      };
    }

    try {
      const value = await this.client.get(key);
      if (value === null) {
        return { 
          success: false, 
          error: new Error(`Key '${key}' not found in cache`) 
        };
      }
      
      try {
        const data = JSON.parse(value) as T;
        return { success: true, data };
      } catch (parseError) {
        const err = parseError instanceof Error 
          ? parseError 
          : new Error('Failed to parse cached data');
        return { success: false, error: err };
      }
    } catch (error) {
      const err = error instanceof Error 
        ? error 
        : new Error('Unknown Redis error occurred');
      
      console.error(`Redis get error for key '${key}':`, err);
      return { success: false, error: err };
    }
  }

  async set<T>(
    key: string, 
    value: T, 
    ttl: number = this.config.ttl || DEFAULT_TTL
  ): Promise<CacheResult<boolean>> {
    if (!this.isConnected) {
      return { 
        success: false, 
        error: new Error('Redis client not connected') 
      };
    }

    try {
      const serializedValue = JSON.stringify(value);
      const options = {
        EX: ttl,
        NX: true,
      };
      
      const result = await this.client.set(key, serializedValue, options);
      
      return { 
        success: true, 
        data: result === 'OK' 
      };
    } catch (error) {
      const err = error instanceof Error 
        ? error 
        : new Error('Unknown Redis error occurred during set operation');
      
      console.error(`Redis set error for key '${key}':`, err);
      return { 
        success: false, 
        error: err 
      };
    }
  }

  async invalidate(pattern: string): Promise<CacheResult<number>> {
    if (!this.isConnected) {
      return { 
        success: false, 
        error: new Error('Redis client not connected') 
      };
    }

    try {
      // Use SCAN instead of KEYS for production to avoid blocking
      const keys: string[] = [];
      let cursor = '0';
      
      do {
        const result = await this.client.scan(cursor, {
          MATCH: pattern,
          COUNT: 100
        });
        
        cursor = result.cursor;
        keys.push(...result.keys);
      } while (cursor !== '0');

      if (keys.length === 0) {
        return { success: true, data: 0 };
      }
      
      // Delete in batches to avoid blocking
      const BATCH_SIZE = 100;
      let deletedCount = 0;
      
      for (let i = 0; i < keys.length; i += BATCH_SIZE) {
        const batch = keys.slice(i, i + BATCH_SIZE);
        const count = await this.client.del(batch);
        deletedCount += count;
      }
      
      return { success: true, data: deletedCount };
    } catch (error) {
      const err = error instanceof Error 
        ? error 
        : new Error('Unknown Redis error during invalidation');
      
      console.error(`Redis invalidate error for pattern '${pattern}':`, err);
      return { 
        success: false, 
        error: err 
      };
    }
  }

  async withCache<T>(
    key: string,
    fn: () => Promise<T>,
    ttl: number = this.config.ttl || DEFAULT_TTL
  ): Promise<T> {
    // Try to get from cache first
    const cached = await this.get<T>(key);
    if (cached.success) {
      console.debug(`Cache hit for key: ${key}`);
      return cached.data;
    }

    console.debug(`Cache miss for key: ${key}`, 
      !cached.success ? `(Reason: ${cached.error.message})` : '');

    // If not in cache, execute the function
    let result: T;
    try {
      result = await fn();
    } catch (error) {
      console.error(`Error executing cache miss function for key '${key}':`, error);
      throw error;
    }
      
    // Cache the result (don't await to avoid blocking)
    this.set(key, result, ttl)
      .then((result) => {
        if (!result.success) {
          console.warn(`Failed to cache result for key '${key}':`, result.error?.message || 'Unknown error');
        }
      })
      .catch((err) => {
        console.error(`Error while setting cache for key '${key}':`, err);
      });
      
    return result;
  }

  async disconnect(): Promise<CacheResult<boolean>> {
    if (!this.isConnected) {
      return { success: true, data: true };
    }

    try {
      await this.client.quit();
      this.isConnected = false;
      return { success: true, data: true };
    } catch (error) {
      const err = error instanceof Error 
        ? error 
        : new Error('Unknown error during Redis disconnection');
      
      console.error('Error disconnecting from Redis:', err);
      return { 
        success: false, 
        error: err 
      };
    }
  }

  // Additional utility methods
  async ping(): Promise<boolean> {
    try {
      const pong = await this.client.ping();
      return pong === 'PONG';
    } catch (error) {
      console.error('Redis ping failed:', error);
      return false;
    }
  }
}

// Export a singleton instance with default configuration
const redisCache = RedisCache.getInstance({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  ttl: process.env.REDIS_TTL ? parseInt(process.env.REDIS_TTL, 10) : 3600,
  maxRetries: process.env.REDIS_MAX_RETRIES ? parseInt(process.env.REDIS_MAX_RETRIES, 10) : 3,
  connectTimeout: process.env.REDIS_CONNECT_TIMEOUT ? parseInt(process.env.REDIS_CONNECT_TIMEOUT, 10) : 10000,
});

export { redisCache };

// Export types
export type { CacheResult };
