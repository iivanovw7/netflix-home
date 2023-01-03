/**
 * Eslint configuration.
 * @module _/tool/.eslintrc.js
 */

module.exports = {
    'extends': [
        require.resolve('../config/.eslintrc')
    ],
    rules: {
        'no-param-reassign': 'off',
        'arrow-body-style': 'off'
    },
};
