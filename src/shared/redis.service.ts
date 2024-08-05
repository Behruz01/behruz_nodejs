import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  private client: RedisClientType;

  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log('Redis Client Error', err));
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
    } catch (error) {
      throw new HttpException(
        'Failed to connect to Redis',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.client.disconnect();
    } catch (error) {
      throw new HttpException(
        'Failed to disconnect from Redis',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async set(
    key: string,
    value: string,
    expirationSeconds: number,
  ): Promise<void> {
    try {
      await this.client.set(key, value, { EX: expirationSeconds });
    } catch (error) {
      throw new HttpException(
        'Failed to set value in Redis',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch (error) {
      throw new HttpException(
        'Failed to get value from Redis',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async del(key: string): Promise<number> {
    try {
      return await this.client.del(key);
    } catch (error) {
      throw new HttpException(
        'Failed to delete value from Redis',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
