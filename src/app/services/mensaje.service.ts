import { AppDataSource } from "../../data-source.cli.js";
import { Mensaje } from "@/app/dbentities/mensaje";
import { MensajeOutput } from "../models/mensaje.model";

export async function setMensaje(pnombre: string, ptelefono: string, pmensaje: string): Promise<void> {

  try {
    await AppDataSource.initialize();
    
    const nuevoMensaje = new Mensaje();
    nuevoMensaje.nombre = pnombre;
    nuevoMensaje.telefono = ptelefono;
    nuevoMensaje.mensaje = pmensaje;

    await AppDataSource.manager.save(nuevoMensaje);
  } catch (error: any) {
    throw new Error("Error al almacenar mensaje: " + error.message);
  } finally {
    await AppDataSource.destroy();
  }
};

export async function getMensajes(): Promise<MensajeOutput[]> {
  try {
    await AppDataSource.initialize();
    const mensajes = await AppDataSource.manager.find(Mensaje, {
      order: { horaMensaje: "DESC" }
    });

    return mensajes.map(msg => ({
      ...msg,
      horaMensaje: msg.horaMensaje.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(',', ' -')
    }));
  } catch (error:  any) {
    throw new Error("Error al obtener mensajes: " + error.message);
  } finally {
    await AppDataSource.destroy();
  }
}