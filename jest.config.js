const {compilerOptions} = require('./tsconfig.json')
const {pathsToModuleNameMapper} = require('ts-jest')
const {envFn} = require('env-fn')
envFn('special')

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  preset: 'ts-jest',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  "modulePaths": [
    "<rootDir>"
  ],
  roots: ['<rootDir>/src/', '<rootDir>/lambdas/', '<rootDir>/libs/'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
}
