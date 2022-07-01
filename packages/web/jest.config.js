/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-node',
  // coverageDirectory: '../web/build/coverage',
  moduleNameMapper: {
    '@/([^\\.]*)$': '<rootDir>/$1',
  },
  testMatch: ['**/?(*.)+(test).[tj]s?(x)'],
  detectOpenHandles: true,
  forceExit: true,
  verbose: true,
  clearMocks: true,
  coverageProvider: 'v8',
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  // reporters: [
  //   'default',
  //   [
  //     'jest-html-reporters',
  //     {
  //       publicPath: '../web/build/coverage',
  //       filename: 'index.html',
  //       openReport: false,
  //     },
  //   ],
  // ],
  // collectCoverage: true,
}
