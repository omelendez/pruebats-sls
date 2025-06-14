import { APIGatewayProxyHandler } from 'aws-lambda';
import { swaggerSpec } from '@/app/utils/swagger';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    // Generate the Swagger specification
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(swaggerSpec),
    };
  } catch (error) {
    console.error('Error generating Swagger spec:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};