const path = require('path');

module.exports = {
    parserOptions: {
        babelOptions: { configFile: path.resolve(__dirname, '../babel.config.js') },
    },
    'extends': [
        'guard/test-jest'
    ],
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            'extends': [
                'ts-guard',
                'guard/test-jest'
            ],
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint'],
            parserOptions: {
                project: ['../tsconfig.eslint.json'],
                tsconfigRootDir: __dirname,
            },
            rules: {
                'arrow-body-style': 0,
                '@typescript-eslint/no-unsafe-call': 0,
                '@typescript-eslint/no-unsafe-assignment': 0,
                '@typescript-eslint/no-unsafe-member-access': 0,
                'no-use-before-define': ['error', { 'variables': false } ]
            }
        }
    ],
    settings: {
        'import/resolver': {
            typescript: {}
        },
    }
};

