import { mapeoTerreno } from "@/app/utils/mapeoTerreno";
import { getVueloPorAeropuerto } from "@/app/services/aviationstack.service";
import { obtenerPlanetas } from "@/app/services/swapi.service";

export async function getFusionados() {
    try {
        const planetas = await obtenerPlanetas();
    
        const planetasConVuelos = await Promise.all(
          planetas.map(async (planet) => {
            const airportCode = mapeoTerreno[planet.terrain.split(', ')[0]] || 'JFK'; // Fallback
            const flights = await getVueloPorAeropuerto(airportCode);
            return {
              ...planet,
              last_10_arrivals: flights,
            };
          })
        );
        
    }catch (error) {
        console.error('Error obteniendo datos fusionados:', error);
        throw new Error('Error obteniendo datos fusionados'+error);
    }
}