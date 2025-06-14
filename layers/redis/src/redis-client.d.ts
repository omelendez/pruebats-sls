import type { RedisClientType } from 'redis';

export declare const getClient: () => Promise<RedisClientType>;