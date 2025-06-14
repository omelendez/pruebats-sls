import { obtenerPlanetas } from '@/app/services/swapi.service';
import { CacheService, getRedisClient } from '@/app/services/cache.service';
import 'dotenv/config';

async function main() {
  try {
    console.log('Fetching planets from SWAPI...');
    const planets = await obtenerPlanetas();
    console.log('First planet:', planets[0]);

    // Guardar en Redis (opcional)
    await CacheService.set('planets', JSON.stringify(planets), 1800); // 1h de cache

    // Cerrar la conexión de Redis explícitamente
    const redisClient = await getRedisClient();
    await redisClient.quit();
    console.log('✅ Cerrada la sesion de Redis.');

  } catch (error) {
    console.error('Failed:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();