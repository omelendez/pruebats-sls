import { obtenerPlanetas } from '@/app/services/swapi.service';
import type { Planet } from '@/app/models/planet.model';

describe('SWAPI Service', () => {
  const mockPlanet = {
    name: 'Tatooine',
    terrain: 'desert',
    climate: 'arid',
    population: '200000',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '10465',
    gravity: '1 standard',
    surface_water: '1',
  };

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('debería obtener planetas correctamente', async () => {
    const mockResponse = {
      ok: true,
      json: async () => [mockPlanet],
    };
    (fetch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await obtenerPlanetas();
    expect(fetch).toHaveBeenCalledWith('https://swapi.info/api/planets');
    expect(result).toEqual([mockPlanet]);
  });

  it('debería lanzar error si la respuesta no es OK', async () => {
    const mockResponse = { ok: false, status: 500 };
    (fetch as jest.Mock).mockResolvedValue(mockResponse);

    await expect(obtenerPlanetas()).rejects.toThrow('SWAPI error: 500');
  });

  it('debería lanzar error si fetch falla', async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(obtenerPlanetas()).rejects.toThrow('Network error');
  });
});