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
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/react',
        'ts-guard/optimum-next',
        'ts-guard/editor',
        'ts-guard/jsdoc'
    ],
    parserOptions: {
        ecmaFeatures: {
            ecmaVersion: 2018,
            jsx: true,
            modules: true,
        },
        project: ['./tsconfig.json'],
        sourceType: 'module',
    },
    plugins: ['@babel', 'import'],
    rules: {
        'import/order': [
            'error',
            {
                groups: [
                    'external',
                    'builtin',
                    'internal',
                    ['parent'],
                    ['sibling', 'index'],
                    'object',
                ],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc' /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
                    caseInsensitive: true /* ignore case. Options: [true, false] */,
                },
                pathGroups: [
                    {
                        pattern: 'react',
                        group: 'external',
                        position: 'before',
                    },
                ],
                pathGroupsExcludedImportTypes: ['external'],
            },
        ],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true,
                optionalDependencies: false,
            },
        ],
    },
    settings: {
        'import/extensions': ['d.ts'],
        'import/resolver': {
            node: {
                paths: ['src', 'test'],
                extensions: ['.js', '.jsx', '.ts', '.tsx', 'd.ts'],
                typescript: {}
            },
        },
    },
};
