/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      diagnostics: {
        // ignore typescript errors because they don't allow jest to run
        exclude: ['**'],
      },
    },
  },
};