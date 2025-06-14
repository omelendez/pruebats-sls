declare module 'swagger-jsdoc' {
  import { OpenAPIV3 } from 'openapi-types';

  function swaggerJsdoc(options: {
    definition: OpenAPIV3.Document;
    apis: string[];
  }): OpenAPIV3.Document;

  export = swaggerJsdoc;
}