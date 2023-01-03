/**
 * Module contains bundler development configuration.
 * @module _/config/vite/vite.dev.js
 */
const basicSsl = require('@vitejs/plugin-basic-ssl');
const { mergeConfig } = require('vite');

module.exports = function getViteDevConfig(env) {
    const common = require('./vite.common')(env);

    return mergeConfig(
        common,
        {
            build: {
                sourcemap: env.sourcemap
            },
            plugins: [
                basicSsl(),
            ],
        }
    );
};
