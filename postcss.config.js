/**
 * POSTCSS configuration.
 * @module _/postcss.config.js
 */
const functions = require('./src/shared/styles/functions');
const mixins = require('./src/shared/styles/mixins');
const variables = require('./src/shared/styles/variables');

module.exports = function getConfig(config) {
    // eslint-disable-next-line no-multi-assign
    const isProd = config.env = 'production';

    return {
        parser: 'postcss-scss',
        plugins: [
            require('postcss-import'),
            require('postcss-mixins')({
                mixins
            }),
            require('postcss-simple-vars')({
                variables
            }),
            require('postcss-functions')({
                functions
            }),
            require('postcss-map-get'),
            require('postcss-nested'),
            require('postcss-dark-theme-class')({
                darkSelector: '[data-theme="dark"]',
                lightSelector: '[data-theme="light"]'
            }),
            require('postcss-url')({
                url: 'rebase',
                useHash: true
            }),
            /**
             * CSS variables export.
             * @see {module: _/tool/plugins/PostCSSExportVars}
             */
            require('./tool/plugins/PostCSSExportVars')({
                file: './src/shared/styles/export.js',
                match: []
            }),
            require('postcss-100vh-fix'),
            require('postcss-sort-media-queries'),
            require('postcss-zindex'),
            require('postcss-normalize')({ forceImport: true }),
            require('autoprefixer'),
            require('postcss-preset-env')({ browsers: 'last 2 versions' }),
            require('postcss-reporter')({ clearReportedMessages: true }),
            isProd
                ? require('cssnano')
                : null
        ]
    };
};
