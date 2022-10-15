/**
 * Contains PostCSSExportVars plugin.
 * @module _/tool/plugins/PostCSSExportVars
 */

'use strict';

const { createFile, resolveReferences } = require('./lib/helpers');
const { transformDecl } = require('./lib/transformer.js');

/**
 * PostCSSExportVars options.
 * @typedef {object} module:_/tool/plugins/PostCSSExportVars~ImageMapGeneratorOptions.
 * @property {string} file - Export file name.
 * @property {Array.<string>} [match = []] - match option is an array of string the property name.
 */

/**
 * PostCSS plugin configuration.
 * @see {@link https://evilmartians.com/chronicles/postcss-8-plugin-migration}
 * @param {module:_/tool/plugins/PostCSSExportVars~ImageMapGeneratorOptions} options - plugin options.
 * @return {object} postcss plugin config.
 */
function plugin(options = {}) {
    return {
        postcssPlugin: 'postcss-export-vars',
        prepare() {
            const variables = {};

            return {
                Declaration(decl) {
                    if (decl.prop.startsWith('--')) {
                        const [key, value] = transformDecl(options)(decl);

                        variables[key] = value;
                    }
                },
                RootExit() {
                    if (Object.keys(variables).length) {
                        resolveReferences(variables);
                        createFile(variables, options);
                    }
                },
            };
        }
    };
}

plugin.postcss = true;

module.exports = plugin;
