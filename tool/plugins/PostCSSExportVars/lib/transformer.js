/**
 * Contains PostCSSExportVars transformers.
 * @module _/tool/plugins/PostCSSExportVars/lib/transformers
 */
'use strict';

const { isEmpty } = require('ramda');

const { camelCase } = require('./helpers');

/**
 * Creates Declaration transform method.
 * @param {module:_/tool/plugins/PostCSSExportVars~ImageMapGeneratorOptions} options - plugin options.
 * @return {function} decl transform method.
 */
function transformDecl(options = {}) {
    if (isEmpty(options.file)) {
        options.file = 'postcss_vars';
    }

    if (isEmpty(options.match) || Array.isArray(options.match) === false) {
        options.match = [];
    }

    /**
     * Detect if property fulfill one matching value.
     * @param {string} property - css property.
     * @return {boolean} `true` if matches and `false` otherwise.
     */
    function propertyMatch(property) {
        for (let count = 0; count < options.match.length; count++) {
            if (property.indexOf(options.match[count]) > -1) {
                return true;
            }
        }

        return false;
    }

    /**
     * Escape values for JS file.
     * @param {string} value string.
     * @return {string} escape value string.
     */
    function escapeValue(value) {
        return value.replace(/'/g, '\\\'');
    }

    /**
     * Plugin callback.
     * @param {Object} decl object.
     * @return {function} decl transform method.
     */
    return function transformDeclCallBack(decl) {
        if ((isEmpty(options.match) || propertyMatch(decl.prop))) {
            return [camelCase(decl.prop), escapeValue(decl.value)];
        }

        return [];
    };
}

module.exports = {
    transformDecl
};
