import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  get<T>(key: string): Promise<T> {
    return this.cacheManager.get<T>(key);
  }

  set(key: string, value: string): Promise<void> {
    return this.cacheManager.set(key, value);
  }

  del(key: string): Promise<void> {
    return this.cacheManager.del(key);
  }

  flushAll(): Promise<unknown> {
    return this.cacheManager.reset();
  }
}
