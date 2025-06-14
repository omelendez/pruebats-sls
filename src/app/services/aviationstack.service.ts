import type { Flight } from '@/app/models/flight.model';

const AVIATIONSTACK_API_KEY = process.env.AVIATIONSTACK_API_KEY;
const BASE_URL = 'https://api.aviationstack.com/v1';

export async function getVueloPorAeropuerto(iataCode: string): Promise<Flight[]> {
  if (!AVIATIONSTACK_API_KEY) throw new Error('AVIATIONSTACK_API_KEY missing');

  const url = new URL(`${BASE_URL}/flights`);
  url.searchParams.append('access_key', AVIATIONSTACK_API_KEY);
  url.searchParams.append('arr_iata', iataCode);
  url.searchParams.append('limit', '10');

  try {
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`AviationStack error: ${response.status}`);
    
    const data = await response.json();
    return data.data.map((flight: any) => ({
        airport: flight.arrival.airport,
        iata: flight.arrival.iata,
        scheduled: flight.arrival.scheduled,
        airline: flight.airline.name,
        flightNumber: flight.flight.iata,
        timezone: flight.arrival.timezone,
        icao: flight.arrival.icao,
        terminal: flight.arrival.terminal,
        gate: flight.arrival.gate,
        baggage: flight.arrival.baggage,
        delay: flight.arrival.delay,
        estimated: flight.arrival.estimated,
        actual: flight.arrival.actual,
        estimated_runway: flight.arrival.estimated_runway,
        actual_runway: flight.arrival.actual_runway
    }));
  } catch (error) {
    console.error('Error obteniendo vuelos:', error);
    throw error;
  }
}