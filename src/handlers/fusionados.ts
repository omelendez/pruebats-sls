import { APIGatewayProxyHandler } from 'aws-lambda';
import { getFusionados } from '@/app/services/fusionados.service';
/**
 * @openapi
 * /fusionados:
 *   get:
 *     tags:
 *       - Planetas
 *     summary: Obtiene planetas de SWAPI con datos de vuelos de AviationStack
 *     description: Devuelve una lista de planetas de Star Wars con información de los últimos 10 vuelos asociados a su terreno
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página para paginación
 *     responses:
 *       200:
 *         description: Lista de planetas con vuelos asociados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PlanetaConVuelos'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 * 
 * components:
 *   schemas:
 *     PlanetaConVuelos:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Tatooine
 *         rotation_period:
 *           type: string
 *           example: "23"
 *         last_10_arrivals:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Vuelo'
 *     Vuelo:
 *       type: object
 *       properties:
 *         airport:
 *           type: string
 *           example: "Zhengzhou"
 *         timezone:
 *           type: string
 *           example: "Asia/Shanghai"
 *         iata:
 *           type: string
 *           example: "CGO"
 */
export const handler: APIGatewayProxyHandler = async () => {
  try {
    const planetasConVuelos = await getFusionados();

    return {
      statusCode: 200,
      body: JSON.stringify(planetasConVuelos),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};