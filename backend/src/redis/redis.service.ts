import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(RedisService.name);
    private client: Redis;

    constructor(private configService: ConfigService) { }

    onModuleInit() {
        this.client = new Redis({
            host: this.configService.get<string>('REDIS_HOST', 'localhost'),
            port: this.configService.get<number>('REDIS_PORT', 6379),
            retryStrategy: (times) => {
                if (times > 3) {
                    this.logger.warn('Redis connection failed after 3 retries. Caching disabled.');
                    return null; // Stop retrying
                }
                return Math.min(times * 100, 3000);
            },
        });

        this.client.on('connect', () => {
            this.logger.log('Connected to Redis');
        });

        this.client.on('error', (err) => {
            this.logger.error('Redis error:', err.message);
        });
    }

    onModuleDestroy() {
        this.client?.disconnect();
    }

    async get<T>(key: string): Promise<T | null> {
        try {
            const data = await this.client.get(key);
            return data ? JSON.parse(data) : null;
        } catch {
            return null;
        }
    }

    async set(key: string, value: any, ttlSeconds: number = 60): Promise<void> {
        try {
            await this.client.set(key, JSON.stringify(value), 'EX', ttlSeconds);
        } catch {
            // Fail silently if Redis is unavailable
        }
    }

    async del(key: string): Promise<void> {
        try {
            await this.client.del(key);
        } catch {
            // Fail silently
        }
    }

    async delByPattern(pattern: string): Promise<void> {
        try {
            const keys = await this.client.keys(pattern);
            if (keys.length > 0) {
                await this.client.del(...keys);
            }
        } catch {
            // Fail silently
        }
    }
}
