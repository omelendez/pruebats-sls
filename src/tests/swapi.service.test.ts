import { obtenerPlanetas } from '@/app/services/swapi.service';
import { mockedPlanets } from '@/tests/mocks/swapi.mocks';

// Mock global de fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockedPlanets),
  })
) as jest.Mock;

describe('SWAPI Service', () => {
  it('debiese traer planetas', async () => {
    const planets = await obtenerPlanetas();
    expect(planets).toEqual(mockedPlanets);
    expect(fetch).toHaveBeenCalledWith('https://swapi.info/api/planets');
  });

  it('debiese manejar errores', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
    await expect(obtenerPlanetas()).rejects.toThrow('Network error');
  });
});