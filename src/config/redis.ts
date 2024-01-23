export type RedisConfig = {
  HOST: string;
  PORT: number;
  TTL: number;
};

const redisStore: RedisConfig = {
  HOST: process.env.REDIS_HOST || 'localhost',
  PORT: parseInt(process.env.REDIS_PORT) || 6379,
  TTL: parseInt(process.env.REDIS_TTL) || 60 * 60 * 24, // 24h
};

export default redisStore;
