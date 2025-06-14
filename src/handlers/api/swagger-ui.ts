import { APIGatewayProxyHandler } from 'aws-lambda';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '@/app/utils/swagger';


export const handler: APIGatewayProxyHandler = async (event) => {
    
  //const html = swaggerUi.generateHTML(swaggerSpec);
  const swaggerUiHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>API Documentation</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css">
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
    <script>
      window.onload = () => {
        SwaggerUIBundle({
          url: '/docs.json',
          dom_id: '#swagger-ui'
        });
      };
    </script>
  </body>
</html>
`;
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: swaggerUiHtml
  };
};