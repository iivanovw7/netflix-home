/**
 * Module contains bundler production configuration.
 * @module _/config/vite/vite.prod.js
 */
const { visualizer } = require('rollup-plugin-visualizer');
const { mergeConfig } = require('vite');

const path = require('path');

const { dependencies } = require('../../package.json');

const vendorList = ['react', 'react-dom', 'react-router', 'react-router-dom'];

/**
 * Creates map of chunks.
 * @param {Object.<string, string>} deps - project dept`s.
 * @return {Object.<string, string>} chunks map.
 */
function renderChunks(deps) {
    const chunks = {};

    for (const chunk of Object.keys(deps)) {
        if (! vendorList.includes(chunk)) {
            chunks[chunk] = [chunk];
        }
    }

    return chunks;
}

module.exports = function getViteProdConfig(env) {
    const common = require('./vite.common')(env);
    const plugins = [];

    if (env.stats) {
        plugins.push(
            visualizer({
                filename: path.resolve(__dirname, './../../build/stats.html'),
                template: 'sunburst',
                sourcemap: env.sourcemap
            })
        );
    }

    // https://vitejs.dev/config/
    return mergeConfig(
        common,
        {
            plugins,
            build: {
                rollupOptions: {
                    input: path.resolve(__dirname, './../../index.html'),
                    output: {
                        manualChunks: Object.assign(
                            { vendor: vendorList },
                            renderChunks(dependencies)
                        )
                    },
                },
                outDir: path.resolve(__dirname, './../../build/dist'),
                emptyOutDir: true,
                minify: true,
                sourcemap: env.sourcemap
            },
        }
    );
};
