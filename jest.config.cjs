module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/src/tests/**/*.test.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^/opt/nodejs/(.*)$': '<rootDir>/layers/redis/nodejs/$1'
  },
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  verbose: true,
  setupFiles: ['dotenv/config'],
  coverageProvider: 'v8',
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: 'coverage'
};