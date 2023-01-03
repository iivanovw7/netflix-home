/**
 * Eslint configuration.
 * @module config/.eslintrc.js
 */
module.exports = {
    'extends': [
        'iivanovw7/node',
    ],
    rules: {
        'no-var': 'off',
        'prefer-template': 'off',
        'global-require': 'off',
        'prefer-object-spread': 'off',
        'import/no-unresolved': ['error', {
            'ignore': ['vite-imagetools']
        } ],
        'node/no-unpublished-require': 'off',
        'node/global-require': 'off',
        'node/no-missing-require': ['error', {
            'allowModules': ['vite-imagetools']
        } ],
    },
};
