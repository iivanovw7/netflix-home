/**
 * Eslint configuration.
 * @module _/.eslintrc.js
 */
module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    'extends': [
        'iivanovw7',
        'iivanovw7/jsdoc',
    ],
    parserOptions: {
        project: ['./tsconfig.json'],
    },
    plugins: ['@babel'],
    settings: {
        'import/extensions': ['d.ts'],
        'import/resolver': {
            node: {
                paths: ['src', 'test'],
                extensions: ['.js', '.jsx', '.ts', '.tsx', 'd.ts'],
                typescript: {}
            },
        },
    }
};
