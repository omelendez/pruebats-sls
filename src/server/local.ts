import "reflect-metadata";
import express from 'express';
import { setupRoutes } from '@/server/routes';
import { initSwagger } from '@/server/swagger';
import { AppDataSource } from "@/data-source.cli";

const app = express();
app.use(express.json());

// Inicializa la conexión
AppDataSource.initialize()
  .then(() => console.log("Conexión a DB establecida"))
  .catch(error => console.log("Error de conexión:", error));

// Configuración de Swagger solo en desarrollo
if (process.env.NODE_ENV === 'development') {
  initSwagger(app);
}
setupRoutes(app);


const port = 3000;
app.listen(3000, () => {
  console.log(`🚀 Servidor Express en http://localhost:${port}`);
  console.log(`📚 Docs Swagger en http://localhost:${port}/docs`);
});
