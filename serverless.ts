import type { AWS } from '@serverless/typescript';
import { platform } from 'os';

const serverlessConfiguration: AWS = {
  service: 'mi-servicio-redis',
  configValidationMode: 'error', // Más estricto en v4
  frameworkVersion: '4', // Especificamos v4 explícitamente

  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    architecture: 'arm64', // Nuevo en v4 - mejor precio/rendimiento
    profile: 'mi-perfil-serverless', // De tu configuración AWS CLI
    region: 'us-east-1',
    stage: 'dev',
    environment: {
      REDIS_URL: '${env:REDIS_URL}',
      NODE_OPTIONS: '--enable-source-maps',
    },
    logRetentionInDays: 14, // Nuevo en v4 - configuración directa
  },

  functions: {
    fusionados: {
      handler: 'src/handlers/fusionados.handler',
      events: [
        {
          http: {
            path: 'fusionados',
            method: 'GET',
            cors: true,
          },
        },
      ],
      environment: {
        AVIATIONSTACK_API_KEY: '${env:AVIATIONSTACK_API_KEY}',
      },
    },
    almacenar: {
      handler: 'src/handlers/almacenar.handler',
      events: [
        {
          http: {
            path: 'almacenar',
            method: 'post',
            cors: true
          }
        }
      ]
    },
    historial: {
      handler: 'src/handlers/historial.handler',
      events: [
        {
          http: {
            path: 'historial',
            method: 'get',
            cors: true
          }
        }
      ]
    },
    swagger: {
      handler: 'src/handlers/api/swagger.handler',
      events: [
        {
          http: {
            path: 'docs.json',
            method: 'get',
            cors:true
            // cors: {
            //   origin: '*',
            //   headers: [
            //     'Content-Type',
            //     'Authorization'
            //   ],
            //   allowCredentials: true
            // },
          },
        }
      ],
    },
    swaggerUi: {
      handler: 'src/handlers/api/swagger-ui.handler',
      events: [
        {
          http: {
            path: 'docs/{proxy+}',
            method: 'get',
            cors: true
          }
        }
      ]
    }
  },

  layers: {
    redis: {
      path: 'layers/redis',
      name: 'redis-layer',
      description: 'Capa con cliente Redis y dependencias',
      compatibleRuntimes: ['nodejs20.x'],
      compatibleArchitectures: ['arm64'], // Nuevo en v4
      package: {
        patterns: [
          '!node_modules/.pnpm/**', // Excluir archivos innecesarios
        ],
      },
    },
  },

  plugins: [
    'serverless-offline',
    'serverless-plugin-layer-manager', // Mejor manejo de capas
  ],

  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      platform: 'node',
      target: 'es2020',
      format: 'esm',
      external: ['/opt/nodejs/*'], // Excluir dependencias de layers
    },
    redisLayerArn: { 'Fn::GetAtt': ['RedisLambdaLayer', 'Arn'] },
    'serverless-offline': {
      noPrependStageInUrl: true,
    },
  },

  package: {
    individually: true,
    patterns: [
      '!node_modules/**',
      '!tests/**',
      '!.git/**',
    ],
  },
};

module.exports = serverlessConfiguration;