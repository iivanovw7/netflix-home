/**
 * Module contains postcss functions.
 * @module shared/styles/functions.js
 */

'use strict';

const { getValues } = require('./utils');

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
        overlay: 1000,
    },
    layout: {
        header: 10,
        container: 100,
    },
};

/**
 * Applies `z-index` property according to config file.
 * Value is taken out of variables by string key, if nothing found - `default` value will be used
 * @param {string} keys - zIndex key string
 * @return {string} - returns `z-index` value
 */
function zIndex(...keys) {
    const [value = zIndexesMap.global.default] = getValues(zIndexesMap, keys.join('.'));

    return value.toString();
}

module.exports = {
    zIndex,
    zIndexesMap,
};
