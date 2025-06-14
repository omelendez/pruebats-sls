import { Planet } from "./planet.model";

export interface Flight {
    airport: string;
    timezone: string;
    iata: string;
    icao: string;
    terminal: string | null;
    gate: string | null;
    baggage: string | null;
    scheduled: string;
    delay: number | null;
    estimated: string | null;
    actual: string | null;
    estimated_runway: string | null;
    actual_runway: string | null;
}

export interface PlanetWithFlights extends Planet {
  last_10_arrivals: Flight[];
}