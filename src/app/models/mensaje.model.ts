export interface MensajeOutput {
  id: number;
  nombre: string;
  telefono: string;
  mensaje: string;
  horaMensaje: string; // Formatted as 'DD/MM/YYYY - HH:mm:ss'
  // Note: horaMensaje is stored as a string in the format 'DD/MM/YYYY - HH:mm:ss'
  // in the application, but it is a Date object in the database.
  // If you need to handle it as a Date object, you can convert it when retrieving.
}