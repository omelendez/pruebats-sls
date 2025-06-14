import { CacheService } from './app/services/cache.service';
import 'dotenv/config';

//levantar el container en local para hacer pruebas
// docker run -d --name redis-test -p 6379:6379 redis:latest

async function redisTest() {
  try {
    console.log('=== Iniciando prueba de Redis ===');
    
    // 1. Prueba de conexión básica
    console.log('Probando conexión a Redis...');
    await CacheService.set('healthcheck', 'ok', 10);
    console.log('✓ Conexión exitosa');

    // 2. Prueba de set/get
    const testKey = 'test:' + Date.now();
    const testValue = { example: 'data', timestamp: new Date().toISOString() };
    
    console.log(`Guardando valor en Redis (key: ${testKey})...`);
    await CacheService.set(testKey, JSON.stringify(testValue), 30);
    console.log('✓ Valor guardado');

    // 3. Recuperar valor
    console.log('Recuperando valor...');
    const retrieved = await CacheService.get(testKey);
    console.log('✓ Valor recuperado:', retrieved);

    // 4. Comparación
    console.log('Comparando valores...');
    if (retrieved !== JSON.stringify(testValue)) {
      throw new Error('Los valores no coinciden');
    }
    console.log('✓ Valores coinciden');

    console.log('=== Todas las pruebas pasaron ===');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en las pruebas:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

redisTest();