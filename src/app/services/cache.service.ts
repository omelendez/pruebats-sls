import type { RedisClientType } from 'redis';
const resolveLayerImport = async (path: string): Promise<{ getClient: () => Promise<RedisClientType> }> => {
  const imported = await import(path);
  return imported.getClient ? imported : imported.default;
};

let client: RedisClientType;

const getRedisClient = async (): Promise<RedisClientType> => {
  if (client?.isOpen) return client;

  const isOffline = process.env.IS_OFFLINE === 'true';
  const clientPath = isOffline
    ? '../../layers/redis/nodejs/redis-client.js' // dev
    : '/opt/nodejs/redis-client.js'; // prd

  try {
    const redisLayer = await resolveLayerImport(clientPath);
    client = await redisLayer.getClient();
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