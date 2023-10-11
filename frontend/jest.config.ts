import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testEnvironment: 'jsdom', // Use jsdom environment for testing
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'], // Ignore certain directories in tests
  setupFilesAfterEnv:['<rootDir>/tests/setupTest.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
  },
};

export default config;
