import { Module } from '@nestjs/common';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { RedisService } from './redis.service';
import redis from '../../config/redis';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore as unknown as CacheStore,
      host: redis.HOST,
      port: redis.PORT,
      ttl: redis.TTL,
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
