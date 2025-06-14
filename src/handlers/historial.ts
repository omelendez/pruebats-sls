import { APIGatewayProxyHandler } from "aws-lambda";
import { getMensajes } from "@/app/services/mensaje.service";

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
export const handler: APIGatewayProxyHandler = async () => {
  try {
    const mensajes = await getMensajes();

    return {
      statusCode: 200,
      body: JSON.stringify(mensajes),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error al obtener historial"+ error.message }),
    };
  }
};