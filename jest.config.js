/**
 * Module contains jest configuration.
 * @module _/jest.config.js
 */

module.exports = {
    bail: 1,
    preset: 'ts-jest',
    coverageDirectory: './build/coverage',
    coveragePathIgnorePatterns: [
        'node_modules',
        'interfaces',
        '.module.ts',
        '<rootDir>//test',
    ],
    moduleNameMapper: {
        '\\.(css|less|scss)$': 'identity-obj-proxy',
    },
    resetModules: true,
    roots: ['<rootDir>/test/'],
    testMatch: ['<rootDir>/test/**/*.+(ts|tsx|js|jsx)'],
    testPathIgnorePatterns: [
        '/node_modules',
        '/test/_helper/',
        '/test/.eslintrc.js'
    ],
    testEnvironment: 'jest-environment-jsdom',
};
