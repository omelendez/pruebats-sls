import { getRedisClient } from '@/app/services/cache.service';
import { createClient } from 'redis';

jest.mock('redis', () => {
  const mRedis = {
    connect: jest.fn(),
    isOpen: false,
    get: jest.fn(),
    setEx: jest.fn(),
    set: jest.fn(),
  };
  return { createClient: jest.fn(() => mRedis) };
});

describe('CacheService', () => {
  describe('getRedisClient', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      process.env.IS_OFFLINE = 'true';
      process.env.REDIS_URL = 'redis://localhost:6379';
    });

    it('debería crear un cliente Redis en modo offline', async () => {
      const client = await getRedisClient();

      expect(createClient).toHaveBeenCalledWith({ url: process.env.REDIS_URL });
      expect(client.connect).toHaveBeenCalled();
      expect(client).toHaveProperty('get');
      expect(client).toHaveProperty('setEx');
    });

    it('debería reutilizar el cliente Redis si ya está abierto', async () => {
      const client = await getRedisClient();
      (client as any).isOpen = true;

      const reusedClient = await getRedisClient();
      expect(reusedClient).toBe(client);
      // connect no vuelve a llamarse porque ya está abierto
      expect(createClient).toHaveBeenCalledTimes(1);
    });
  });
});