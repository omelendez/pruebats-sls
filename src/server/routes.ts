import { Express, NextFunction, Request, Response } from 'express';
import { getFusionados } from '@/app/services/fusionados.service';
import { setMensaje, getMensajes } from '@/app/services/mensaje.service';
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
 */
export const setupRoutes = (app: Express) => {
  app.get('/fusionados', async (req: Request, res: Response) => {
    try {
      const result = await getFusionados();
      res.json(result);
    } catch (error: Error | any) {
      console.error('Error en /fusionados:', error);
      res.status(500).json({ error: 'Error en /fusionados:'+error.message });
    }
  });
  /**
   * @openapi
   * /almacenar:
   *   post:
   *     tags: [Mensajes]
   *     summary: Almacena un nuevo mensaje
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/NuevoMensaje'
   *     responses:
   *       201:
   *         description: Mensaje almacenado correctamente
   *       500:
   *         description: Error del servidor
   */
  app.post('/almacenar', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { nombre, telefono, mensaje } = req.body;
    if (!nombre || !telefono || !mensaje) {
      res.status(400).json({ error: 'Datos requeridos' });
      return;
    }
    try {
      await setMensaje(nombre, telefono, mensaje);
      res.status(201).json({ mensaje: 'Mensaje almacenado con éxito' });
    } catch (error: Error | any) {
      console.error('Error en /almacenar:', error);
      res.status(500).json({ error: 'Error al almacenar mensaje: '+error.message });
    }
    next();
  });

  /**
   * @openapi
   * /historial:
   *   get:
   *     tags: [Mensajes]
   *     summary: Obtiene el historial de mensajes
   *     responses:
   *       200:
   *         description: Lista de mensajes
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Mensaje'
   */
  app.get('/historial', async (req: Request, res: Response) => {
    try {
      const mensajes = await getMensajes();
      res.json(mensajes);
    } catch (error: Error | any) {
      console.error('Error en /historial:', error);
      res.status(500).json({ error: 'Error al obtener historial: '+error.message });
    }
  });

  return app;
}