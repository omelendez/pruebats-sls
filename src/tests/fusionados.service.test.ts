import { getFusionados } from '@/app/services/fusionados.service';
import { CacheService } from '@/app/services/cache.service';
import { obtenerPlanetas } from '@/app/services/swapi.service';
import { getVueloPorAeropuerto } from '@/app/services/aviationstack.service';
import { getDataSource, closeDataSource } from '@/app/utils/ds-singleton';

//algunos mocks para el unit testing
jest.mock('@/app/services/cache.service');
jest.mock('@/app/services/swapi.service');
jest.mock('@/app/services/aviationstack.service');
jest.mock('@/app/utils/ds-singleton');

describe('getFusionados', () => {
  // Datos de planetas
  const mockPlanetas = [
    { name: 'Tatooine', terrain: 'desert' },
    { name: 'Alderaan', terrain: 'grasslands' }
  ];

  // Datos de vuelos
  const mockFlights = [{ airport: 'JFK', iata: 'JFK1', airline: 'Delta' }];

  // Repo con metodos mock
  const mockRepo = {
    clear: jest.fn(),
    save: jest.fn()
  };

  // DataSource con un repo mock
  const mockDataSource = {
    getRepository: jest.fn(() => mockRepo)
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debiera retornar data desde cacche si esta presente', async () => {
    (CacheService.get as jest.Mock).mockResolvedValue(JSON.stringify(['cachedData']));

    const result = await getFusionados();

    expect(CacheService.get).toHaveBeenCalledWith('fusion:planetas-vuelos');
    expect(result).toEqual(['cachedData']);
    expect(obtenerPlanetas).not.toHaveBeenCalled();
    expect(getVueloPorAeropuerto).not.toHaveBeenCalled();
  });

  it('debiera retornar, procesar guardar y guardar data en caché, si no lo hubiese', async () => {
    (CacheService.get as jest.Mock).mockResolvedValue(null);
    (obtenerPlanetas as jest.Mock).mockResolvedValue(mockPlanetas);
    (getVueloPorAeropuerto as jest.Mock).mockResolvedValue(mockFlights);
    (getDataSource as jest.Mock).mockResolvedValue(mockDataSource);

    const result = await getFusionados();

    // Valida llamadas
    expect(obtenerPlanetas).toHaveBeenCalled();
    expect(getVueloPorAeropuerto).toHaveBeenCalledTimes(2); // por cada planeta
    expect(mockRepo.clear).toHaveBeenCalled();
    expect(mockRepo.save).toHaveBeenCalledWith(expect.any(Array));
    expect(CacheService.set).toHaveBeenCalledWith(
      'fusion:planetas-vuelos',
      expect.any(String),
      1800
    );

    // Valida estructura final
    expect(result).toEqual(expect.any(Array));
  });

  it('debiera lanzar error si fallase obtener planetas', async () => {
    (CacheService.get as jest.Mock).mockResolvedValue(null);
    (obtenerPlanetas as jest.Mock).mockRejectedValue(new Error('API Down'));

    await expect(getFusionados()).rejects.toThrow('Error obteniendo datos fusionados');
  });
});