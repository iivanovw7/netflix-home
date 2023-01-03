/**
 * Eslint configuration.
 * @module _/test/.eslintrc.js
 */
module.exports = {
    'extends': [
        'iivanovw7/test-jest',
    ],
    'overrides': [
        {
            'files': [
                '**/*.ts',
                '**/*.tsx'
            ],
            'extends': [
                'iivanovw7/typescript',
            ],
            'parserOptions': {
                'project': ['../tsconfig.eslint.json'],
                tsconfigRootDir: __dirname
            },
            'rules': {
                '@typescript-eslint/no-unsafe-call': 0,
                '@typescript-eslint/no-unsafe-assignment': 0,
                '@typescript-eslint/no-unsafe-member-access': 0,
                'no-use-before-define': ['error', { 'variables': false } ],
                'react/jsx-filename-extension': 'off',
                'import/no-extraneous-dependencies': 'off'
            }
        }
    ]
};
