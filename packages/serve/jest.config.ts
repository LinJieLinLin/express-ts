/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: '../web/build/coverage',
  moduleNameMapper: {
    '@/([^\\.]*)$': '<rootDir>/$1',
  },
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  detectOpenHandles: true,
  forceExit: true,
  verbose: true,
  clearMocks: true,
  coverageProvider: 'v8',
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: '../web/build/coverage',
        filename: 'index.html',
        openReport: false,
      },
    ],
  ],
  collectCoverage: true,
}
