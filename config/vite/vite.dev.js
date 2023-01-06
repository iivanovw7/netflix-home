/**
 * Module contains bundler development configuration.
 * @module _/config/vite/vite.dev.js
 */
const basicSsl = require('@vitejs/plugin-basic-ssl');
const DtsCreator = require('typed-css-modules').default;
const { mergeConfig } = require('vite');

const { logger } = require('../../tool/utils');

/**
 * Postcss DTS generator plugin.
 * @return {function} returns vite plugin
 *      @see {@link https://vitejs.dev/guide/api-plugin.html}
 */
function pcssDtsPlugin() {
    return {
        apply: 'serve',
        name: 'postcss-dts-plugin',
        enforce: 'post',
        handleHotUpdate({ file }) {
            if (file.endsWith('.module.pcss')) {
                new DtsCreator({ camelCase: true })
                    .create(file)
                    .then((content) => content.writeFile())
                    .catch((errorData) => logger.error(errorData));
            }
        },
    };
}

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
                pcssDtsPlugin()
            ],
        }
    );
};
