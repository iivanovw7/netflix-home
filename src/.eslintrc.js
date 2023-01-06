/**
 * Eslint configuration.
 * @module _/src/.eslintrc.js
 */
const path = require('path');

module.exports = {
    parserOptions: {
        babelOptions: {
            configFile: path.resolve(__dirname, '../babel.config.js')
        },
    },
    overrides: [
        {
            'files': [
                '**/*.ts',
                '**/*.tsx'
            ],
            'extends': [
                'iivanovw7/react',
                'iivanovw7/typescript',
            ],
            'parserOptions': {
                'project': ['../tsconfig.json'],
                tsconfigRootDir: __dirname
            },
            rules: {
                'no-param-reassign': 'off',
                'react/require-default-props': 'off',
                '@typescript-eslint/require-await': 'off',
                'react/jsx-no-leaked-render': 'off'
            }
        },
    ],
    ignorePatterns: [
        '*.module.pcss.d.ts'
    ],
};
