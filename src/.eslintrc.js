const path = require('path');
module.exports = {
    parserOptions: {
        babelOptions: { configFile: path.resolve(__dirname, '../babel.config.js') },
    },
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            'extends': [
                'ts-guard/react',
                'ts-guard/ext',
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
            ],
            globals: {
                JSX: 'readonly',
            },
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint', 'react-hooks'],
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                project: ['../tsconfig.eslint.json'],
                tsconfigRootDir: __dirname,
            },
            rules: {
                '@typescript-eslint/no-unsafe-call': 0,
                '@typescript-eslint/unbound-method': 0,
                '@typescript-eslint/no-unsafe-assignment': 0,
                '@typescript-eslint/no-unsafe-member-access': 0,
                '@typescript-eslint/naming-convention': 0,
                '@typescript-eslint/consistent-type-imports': [
                    'warn',
                    {
                        prefer: 'type-imports'
                    }
                ],
                'react/prop-types': 0,
                'arrow-body-style': 0,
                'react-hooks/rules-of-hooks': 'error',
                'react-hooks/exhaustive-deps': 'warn',
                'react/jsx-sort-props': [2, {
                    'callbacksLast': true,
                    'shorthandFirst': true,
                    'multiline': 'first',
                    'reservedFirst': true,
                } ]
            },
            settings: {
                'import/resolver': {
                    typescript: {}
                },
            }
        },
    ],
};
