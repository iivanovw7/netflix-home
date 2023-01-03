/**
 * Eslint configuration.
 * @module shared/styles/.eslintrc.js
 */
module.exports = {
    rules: {
        strict: 'off',
        'no-var': 'off',
        'prefer-template': 'off',
        'node/no-unpublished-require': 'off',
        'arrow-body-style': 0,
        'max-params': ['error', 4],
        'function-paren-newline': ['error', 'multiline-arguments'],
    },
};
