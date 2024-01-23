import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  preset: 'ts-jest',
  rootDir: '.',
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.(t|j)s',
    '!src/docs/*',
    '!src/common/**',
    '!src/**/*.module.ts',
    '!**/_models/*.ts',
    '!**/mocks/**',
    '!test/**',
    '!coverage/**',
    '!src/main.ts',
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10,
    },
  },
  testEnvironment: 'node',
  testTimeout: 60000,
};
export default config;
