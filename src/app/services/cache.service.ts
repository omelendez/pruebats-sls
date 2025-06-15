import type { RedisClientType } from 'redis';
export const resolveLayerImport = async (path: string): Promise<{ getClient: () => Promise<RedisClientType> }> => {
  const imported = await import(path);
  return imported.getClient ? imported : imported.default;
};

let client: RedisClientType;

const getRedisClient = async (): Promise<RedisClientType> => {
  if (client?.isOpen) return client;

  const isOffline = process.env.IS_OFFLINE === 'true';
  
  try {
    if (isOffline) {
      const { createClient } = await import('redis');
      client = createClient({ url: process.env.REDIS_URL });
      await client.connect();
      console.log('✅ Cliente Redis conectado (offline/local)');
    } else {
      const redisLayer = await resolveLayerImport('/opt/nodejs/redis-client.js');
      client = await redisLayer.getClient();
    }

    return client;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Fallo al cargar el cliente Redis: ${error.message}`);
    }
    throw new Error('Error de conexion a Redis desconocido.');
  }
};

export class CacheService {
  static async get(key: string): Promise<string | null> {
    const client = await getRedisClient();
    return client.get(key);
  }

  static async set(key: string, value: string, ttl?: number): Promise<void> {
    const client = await getRedisClient();
    if (ttl) {
      await client.setEx(key, ttl, value);
    } else {
      await client.set(key, value);
    }
  }
}

export { getRedisClient };