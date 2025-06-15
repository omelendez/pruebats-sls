import type { AWS } from '@serverless/typescript';
import { platform } from 'os';

const serverlessConfiguration: AWS = {
  service: 'mi-prueba-softtek',
  configValidationMode: 'error',
  frameworkVersion: '4',

  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    architecture: 'arm64',
    profile: 'st-exam', // AWS CLI
    region: 'us-east-1',
    stage: 'prd',
    environment: {
      REDIS_URL: '${env:REDIS_URL}',
      NODE_OPTIONS: '--enable-source-maps',
      AVIATIONSTACK_API_KEY: '${env:AVIATIONSTACK_API_KEY}',
      IS_OFFLINE: '${env:IS_OFFLINE}',
      IS_EXPRESS: '${env:IS_EXPRESS}',
      JWT_SECRET: '${env:JWT_SECRET}',
      DB_HOST: '${env:DB_HOST}',
      DB_PORT: '${env:DB_PORT}',
      DB_USER: '${env:DB_USER}',
      DB_PASSWORD: '${env:DB_PASSWORD}',
      DB_NAME: '${env:DB_NAME}',
    },
    logRetentionInDays: 14,
    tracing: {
      lambda: true,
    },
    apiGateway: {
      apiKeys: [],
    },
    timeout: 30,
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['logs:*'],
        Resource: '*'
      }
    ],
  },

  functions: {
    fusionados: {
      layers: [{ Ref: 'RedisLambdaLayer'}], // Referencia la capa donde reside el redis-cli
      handler: 'src/handlers/fusionados.handler',
      events: [
        {
          http: {
            path: 'fusionados',
            method: 'GET',
            cors: {
              origin: '*', // cualquier origen
              headers: ['Content-Type'],
              allowCredentials: false
            },
            authorizer: undefined,
            private: false
          },
        },
      ],
    },
    almacenar: {
      handler: 'src/handlers/almacenar.handler',
      events: [
        {
          http: {
            path: 'almacenar',
            method: 'post',
            cors: {
              origin: '*', // cualquier origen
              headers: ['Content-Type'],
              allowCredentials: false
            },
            authorizer: undefined,
            private: false
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
            cors: {
              origin: '*', // cualquier origen
              headers: ['Content-Type'],
              allowCredentials: false
            },
            authorizer: undefined,
            private: false
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
            cors: {
              origin: '*', // cualquier origen
              headers: ['Content-Type'],
              allowCredentials: false
            },
            authorizer: undefined,
            private: false
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
            cors: {
              origin: '*', // cualquier origen
              headers: ['Content-Type'],
              allowCredentials: false
            },
            authorizer: undefined,
            private: false
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
      compatibleArchitectures: ['arm64'],
      package: {
        patterns: [
          '!node_modules/.pnpm/**',
        ],
      },
    },
  },

  plugins: [
    'serverless-offline',
  ],

  custom: {
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
    '!layers/**',
    'dist/**',
    'layers/redis/nodejs/**',
    '!.env',
    '.env.prd',
    ],
  },
};

module.exports = serverlessConfiguration;