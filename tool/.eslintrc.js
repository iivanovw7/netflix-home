/**
 * Eslint configuration.
 * @module _/tool/eslintrc.js
 */

'use strict';

const path = require('path');

module.exports = {
    'extends': [
        'ts-guard/node'
    ],
    parserOptions: {
        babelOptions: { configFile: path.resolve(__dirname, '../babel.config.js') },
    },
    rules: {
        'no-var': 'off',
        'prefer-template': 'off',
        'node/no-unpublished-require': 'off'
    }
};
