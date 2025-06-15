import { getDataSource, closeDataSource } from "../utils/ds-singleton";
import { CacheService } from "./cache.service";
import { mapeoTerreno } from "@/app/utils/mapeoTerreno";
import { getVueloPorAeropuerto } from "@/app/services/aviationstack.service";
import { obtenerPlanetas } from "@/app/services/swapi.service";
import { PlanetaVuelo } from "../dbentities/planetavuelo";

const CACHE_KEY = "fusion:planetas-vuelos";
const CACHE_TTL = 1800; // 30 minutos

export async function getFusionados() {
    const cached = await CacheService.get(CACHE_KEY);
    if (cached) {
        console.log('✅ Habemus cache. Usando datos almacenados...');
        return JSON.parse(cached);
    }
    try {
        console.log('❌ Se perdió cache. Generando datos...');
        const planetas = await obtenerPlanetas();
    
        const planetasConVuelos  = await Promise.all(
          planetas.map(async (planet) => {
            const airportCode = mapeoTerreno[planet.terrain.split(', ')[0]] || 'JFK'; // Fallback
            const flights = await getVueloPorAeropuerto(airportCode);
            return {
              ...planet,
              vuelos: flights,
            };
          })
        );

        // Guarda en DB
        const dataSource = await getDataSource();
        const repo = dataSource.getRepository(PlanetaVuelo);

        await repo.clear(); // Opcional: limpia tabla antes de insertar
        await repo.save(planetasConVuelos);

        // Cachea el resultado
        await CacheService.set(CACHE_KEY, JSON.stringify(planetasConVuelos), CACHE_TTL);

        return planetasConVuelos;
        
    }catch (error) {
        console.error('Error obteniendo datos fusionados:', error);
        throw new Error('Error obteniendo datos fusionados'+error);
    }finally {
        // Aquí podrías cerrar la conexión a la base de datos si es necesario
        await closeDataSource();
    }
}