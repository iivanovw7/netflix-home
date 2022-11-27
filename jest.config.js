/**
 * Module contains jest configuration.
 * @module _/jest.config.js
 */


module.exports = {
    bail: 1,
    preset: 'ts-jest',
    setupFilesAfterEnv: ['./test/_helper/jestSetup.ts'],
    coverageDirectory: './build/coverage',
    coveragePathIgnorePatterns: [
        'node_modules',
        'interfaces',
        '.module.ts',
        '<rootDir>//test',
    ],
    moduleNameMapper: {
        '\\.(css|less|scss|pcss)$': 'identity-obj-proxy',
        '\\.(svg|png)(.*?)$': 'jest-transform-stub',
        '\\:svg-icons-names': 'jest-transform-stub',
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
