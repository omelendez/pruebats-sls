import { handler } from '@/handlers/fusionados';
import { mockedPlanets } from '@/tests/mocks/swapi.mocks';
import { mockedFlights } from '@/tests/mocks/aviationstack.mocks';
import type { APIGatewayProxyEvent, Context } from 'aws-lambda';

jest.mock('@/services/swapi.service', () => ({
  obtenerPlanetas: jest.fn(() => Promise.resolve(mockedPlanets)),
}));

jest.mock('@/services/aviationstack.service', () => ({
  getVueloPorAeropuerto: jest.fn(() => Promise.resolve(mockedFlights)),
}));

describe('GET /fusionados', () => {
  it('debiera devolver planetas con vuelos', async () => {
    //Mockear evento y contexto de Lambda
    const mockEvent = {} as APIGatewayProxyEvent;
    const mockContext = {} as Context;

    // Ejecutar el handler
    const response = await handler(mockEvent, mockContext, () => {});

    //tipo y estructura de respuesta
    if(!response || typeof response.statusCode !== 'number' || typeof response.body !== 'string') {
        throw new Error('Respuesta del handler no es válida (undefined)');
    }

    // Verificar el código de estado y el cuerpo de la respuesta
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          last_10_arrivals: expect.any(Array),
        }),
      ])
    );
  });
});