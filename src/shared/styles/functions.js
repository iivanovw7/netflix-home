/**
 * Module contains postcss functions.
 * @module shared/styles/functions.js
 */
'use strict';

const { fromString, fromRgba } = require('css-color-converter');

const exportedVariables = require('./export');
const { trimVariable, getValues, camelCase } = require('./utils');

/**
 * Applies opacity value passed in params to color, by default uses black color and opacity 1
 * @param {string} value - color opacity to be changed
 * @param {string} frac - opacity value to be applied
 * @return {string} - returns color in hex string
 */
const opacify = (value = 'black', frac = '1') => {
    const color = exportedVariables[camelCase(trimVariable(value))] || value;
    const rgba = fromString(color).toRgbaArray();

    return fromRgba([rgba[0], rgba[1], rgba[2], frac]).toHexString();
};

/**
 * Contains global map of zIndexes of te application.
 * @readonly
 * @enum {Record.<string, Record.<string, number>>}
 */
const zIndexesMap = {
    global: {
        underlay: -1,
        'default': 0,
        content: 1,
    },
    layout: {
        header: 10,
        container: 100,
        overlay: 1000
    }
};

/**
 * Applies `z-index` property according to config file.
 * Value is taken out of variables by string key, if nothing found - `default` value will be used
 * @param {string} keys - zIndex key string
 * @return {string} - returns `z-index` value
 */
function zIndex(...keys) {
    const [value = zIndexesMap.global['default']] = getValues(zIndexesMap, keys.join('.'));

    return value.toString();
}

module.exports = {
    opacify,
    zIndex,
    zIndexesMap,
};
