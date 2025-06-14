import { APIGatewayProxyHandler } from "aws-lambda";
import { setMensaje } from "@/app/services/mensaje.service";

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
export const handler: APIGatewayProxyHandler = async (event) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Datos requeridos" }),
    };
  }

  try {
    const { nombre, telefono, mensaje } = JSON.parse(event.body);
    await setMensaje(nombre, telefono, mensaje);

    return {
      statusCode: 201,
      body: JSON.stringify({ mensaje: "Mensaje almacenado con éxito" }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error al almacenar mensaje: "+ error.message }),
    };
  } 
};