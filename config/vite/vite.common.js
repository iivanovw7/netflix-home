/**
 * Module contains bundler configuration.
 * @module _/config/vite/vite.common.js
 */
const legacy = require('@vitejs/plugin-legacy');
const react = require('@vitejs/plugin-react');
const { imagetools } = require('vite-imagetools');
const dynamicImport = require('vite-plugin-dynamic-import').default;
const { createHtmlPlugin } = require('vite-plugin-html');
const { createSvgIconsPlugin } = require('vite-plugin-svg-icons');

const path = require('path');

module.exports = function getViteCommonConfig(env) {
    const postcss = require('../postcss/postcss.config')(env);

    const isProd = env.mode === 'production';

    // https://vitejs.dev/config/
    return {
        plugins: [
            legacy(),
            react(),
            dynamicImport(),
            createHtmlPlugin({
                minify: isProd,
                entry: './src/main.tsx',
                template: 'index.html',
                inject: {
                    data: {
                        title: 'Netflix browse page',
                        injectScript: '<script type="module" src="./src/main.jsx" async></script>',
                    },
                },
            }),
            createSvgIconsPlugin({
                iconDirs: [path.resolve(__dirname, './../../assets/icons')],
                symbolId: 'icon-[dir]-[name]',
                inject: 'body-last',
            }),
            imagetools({
                include: path.resolve(__dirname, './../../assets/img/**/*.{jpeg,jpg,png,webp,gif}?'),
            }),
        ],
        css: {
            postcss
        },
        root: path.resolve(__dirname, './../../'),
        resolve: {
            alias: [
                { find: '@', replacement: path.resolve(__dirname, './src') },
            ],
        },
    };
};
