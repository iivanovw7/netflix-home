/**
 * Module contains bundler development configuration.
 * @module _/config/vite/vite.dev.js
 */
const basicSsl = require('@vitejs/plugin-basic-ssl');
const { mergeConfig } = require('vite');

module.exports = function getViteDevConfig(env) {
    const common = require('./vite.common.js')(env);

    return mergeConfig(
        common,
        {
            plugins: [
                basicSsl(),
            ]
        }
    );
};
