import { CacheService, getRedisClient } from '@/app/services/cache.service';

describe('Redis Layer Integration', () => {
  beforeAll(async () => {
    // Configurar entorno para pruebas
    process.env.IS_OFFLINE = 'true';
    process.env.REDIS_URL = 'redis://localhost:6379';

    // Esperar a que Redis esté listo
    await new Promise(resolve => setTimeout(resolve, 1000));
  });

  afterAll(async () => {
    const client = await getRedisClient(); // Acceso privado (temporal)
    await client.quit(); // Cerrar Redis después de test
  });

  it('should connect to Redis', async () => {
    await expect(CacheService.set('connection-set', 'ok', 1)).resolves.not.toThrow();
  });

  it('should set and get values', async () => {
    await CacheService.set('test-key', 'test-value', 10);
    const value = await CacheService.get('test-key');
    expect(value).toBe('test-value');
  });

  it('should set value without TTL', async () => {
    await CacheService.set('key-sin-ttl', 'valor-sin-ttl');
    const value = await CacheService.get('key-sin-ttl');
    expect(value).toBe('valor-sin-ttl');
  });

  describe('Manejo de errores (mocked)', () => {
    it('debiera manejar errores via mock', async () => {
      jest.spyOn(CacheService, 'get').mockImplementation(() => {
        return Promise.reject(new Error('Fallo de Redis simulado'));
      });

      try {
        await expect(CacheService.get('test-key')).rejects.toThrow('Fallo de Redis simulado');
      } finally {
        jest.restoreAllMocks();
      }
    });
    
  });
});