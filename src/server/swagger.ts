import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '@/app/utils/swagger';

export function initSwagger(app: Express) {
  
  // Ruta para la UI de Swagger
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/docs.json', (req, res) => {
    res.json(swaggerSpec);
  });
}