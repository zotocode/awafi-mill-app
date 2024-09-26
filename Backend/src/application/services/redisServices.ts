import { createClient } from 'redis';

class RedisService {
  private redisClient: any;

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

  // Retrieve user data from Redis
  async getUserData(email: string): Promise<any | null> {
    try {
      const data = await this.redisClient.get(email);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error fetching data from Redis for ${email}:`, error);
      throw new Error('Failed to fetch data from Redis');
    }
  }

  // Store user data in Redis
  async storeUserData(email: string, userName: string, password: string, phone: number, otp: string): Promise<void> {
    try {
      const userData = {
        email,
        userName,
        password,
        phone,
        otp,
      };
      await this.redisClient.set(email, JSON.stringify(userData));
    } catch (error) {
      console.error(`Error storing data in Redis for ${email}:`, error);
      throw new Error('Failed to store data in Redis');
    }
  }

  // Close Redis connection
  async close(): Promise<void> {
    await this.redisClient.quit();
    console.log('Redis connection closed');
  }
}

export default new RedisService();
