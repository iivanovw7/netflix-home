/**
 * POSTCSS configuration.
 * @module _/postcss.config.js
 */

const functions = require('../../src/shared/styles/functions');
const mixins = require('../../src/shared/styles/mixins');
const variables = require('../../src/shared/styles/variables.json');

/* eslint-disable global-require */

module.exports = function getConfig(env) {
    const isProd = env.mode === 'production';

    const plugins = [
        require('postcss-import'),
        require('postcss-mixins')({
            mixins,
        }),
        require('postcss-simple-vars')({
            variables,
        }),
        require('postcss-functions')({
            functions,
        }),
        require('postcss-map-get'),
        require('postcss-nested'),
        require('postcss-dark-theme-class')({
            darkSelector: '[data-theme="dark"]',
            lightSelector: '[data-theme="light"]',
        }),
        require('postcss-calc'),
        require('postcss-url')({
            url: 'rebase',
            useHash: true,
        }),
        require('postcss-color-mod-function'),
        require('postcss-100vh-fix'),
        require('postcss-sort-media-queries'),
        require('postcss-normalize')({
            forceImport: true
        }),
        require('autoprefixer'),
        require('postcss-preset-env')({
            browsers: 'last 2 versions'
        }),
        require('postcss-reporter')({
            clearReportedMessages: true
        }),
    ];

    if (isProd) {
        plugins.push(require('cssnano'));
    }

    return {
        parser: require('postcss-scss'),
        plugins
    };
};

/* eslint-enable global-require */
