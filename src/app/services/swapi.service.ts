import type { Planet } from '@/app/models/planet.model';

const SWAPI_BASE_URL = 'https://swapi.info/api';

export async function obtenerPlanetas(): Promise<Planet[]> {
  try {
    const response = await fetch(`${SWAPI_BASE_URL}/planets`);
    if (!response.ok) throw new Error(`SWAPI error: ${response.status}`);
    
    const data = await response.json();
    const limPlanets = data.slice(0, 5).map((planet: any) => ({
        name: planet.name,
        terrain: planet.terrain,
        climate: planet.climate,
        population: planet.population,
        rotation_period: planet.rotation_period,
        orbital_period: planet.orbital_period,
        diameter: planet.diameter,
        gravity: planet.gravity,
        surface_water: planet.surface_water
    }));

    return limPlanets;
  } catch (error) {
    console.error('Error obteniendo planetas:', error);
    throw error;
  }
}