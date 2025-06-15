import { getDataSource, closeDataSource } from "@/app/utils/ds-singleton";
import { Mensaje } from "@/app/dbentities/mensaje";
import { MensajeOutput } from "@/app/models/mensaje.model";

export async function setMensaje(pnombre: string, ptelefono: string, pmensaje: string): Promise<void> {

  try {
    
    const ds = await getDataSource();
    const nuevoMensaje = new Mensaje();
    nuevoMensaje.nombre = pnombre;
    nuevoMensaje.telefono = ptelefono;
    nuevoMensaje.mensaje = pmensaje;

    await ds.manager.save(nuevoMensaje);
  } catch (error: any) {
    throw new Error("Error al almacenar mensaje: " + error.message);
  } finally {
    await closeDataSource();
  }
};

export async function getMensajes(): Promise<MensajeOutput[]> {
  try {
    const ds = await getDataSource();
    const mensajes = await ds.manager.find(Mensaje, {
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
    await closeDataSource();
  }
}