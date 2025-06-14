import swaggerJsdoc from 'swagger-jsdoc';
import { OpenAPIV3 } from 'openapi-types';

const options: { definition: OpenAPIV3.Document; apis: string[] } = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API SWAPI + AviationStack',
      version: '1.0.0',
      description: 'Combina datos de Star Wars y vuelos comerciales',
    },
    servers: [{ url: 'http://localhost:3000' }], // 👈 Añade esto para local
    paths: {}, // Required by OpenAPI spec
  },
  apis: [
    './src/handlers/**/*.ts',
    './src/server/routes.ts',
    '!./src/handlers/api/swagger.handler.ts',
    '!./src/handlers/api/swagger-ui.handler.ts'
  ],
};

export const swaggerSpec: OpenAPIV3.Document = swaggerJsdoc(options);
