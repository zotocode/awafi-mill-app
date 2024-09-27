import { createClient, RedisClientType } from 'redis';

class RedisService {
  private redisClient: RedisClientType;

  constructor() {
    this.redisClient = createClient();

    this.redisClient.on('error', (err: any) => {
      console.error('Redis error:', err);
    });

    this.redisClient.on('connect', () => {
      console.log('Connected to Redis');
    });

    this.redisClient.on('ready', () => {
      console.log('Redis is ready');
    });

    // Automatically connect the Redis client
    this.redisClient.connect();
  }

  // Retrieve data of any type from Redis
  async getData<T>(key: string): Promise<T | null> {
    try {
      const data = await this.redisClient.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error fetching data from Redis for ${key}:`, error);
      throw new Error('Failed to fetch data from Redis');
    }
  }

  // Store data of any type in Redis
  async setData<T>(key: string, data: T, expirationInSeconds?: number): Promise<void> {
    try {
      const stringifiedData = JSON.stringify(data);
      if (expirationInSeconds) {
        await this.redisClient.setEx(key, expirationInSeconds, stringifiedData);
      } else {
        await this.redisClient.set(key, stringifiedData);
      }
      console.log(`Data stored in Redis for ${key}`);
    } catch (error) {
      console.error(`Error storing data in Redis for ${key}:`, error);
      throw new Error('Failed to store data in Redis');
    }
  }

  // Delete data from Redis
  async deleteData(key: string): Promise<void> {
    try {
      await this.redisClient.del(key);
      console.log(`Data deleted from Redis for ${key}`);
    } catch (error) {
      console.error(`Error deleting data from Redis for ${key}:`, error);
      throw new Error('Failed to delete data from Redis');
    }
  }

  // Close Redis connection
  async close(): Promise<void> {
    await this.redisClient.quit();
    console.log('Redis connection closed');
  }
}

export default new RedisService();
