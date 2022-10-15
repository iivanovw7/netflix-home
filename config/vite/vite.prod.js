/**
 * Module contains bundler production configuration.
 * @module _/config/vite/vite.prod.js
 */
const { mergeConfig } = require('vite');

const path = require('path');

module.exports = function getViteProdConfig(env) {
    const common = require('./vite.common.js')(env);

    // https://vitejs.dev/config/
    return mergeConfig(
        common,
        {
            plugins: [],
            build: {
                rollupOptions: {
                    input: path.resolve(__dirname, './../../index.html'),
                },
                outDir: path.resolve(__dirname, './../../build/dist'),
                emptyOutDir: true,
                minify: true,
            },
        }
    );
};
