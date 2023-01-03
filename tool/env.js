/**
 * Env variables module.
 * @module _/tool/env
 */
const { logger } = require('./utils');

/**
 * Contains default application ports.
 */
const defaultPorts = {
    /**
     * Used for `development` mode.
     * @type {number}
     */
    dev: 4467,
    /**
     * Used for `production` mode.
     * @type {number}
     */
    prod: 4468,
};

/**
 * Env variables object.
 *
 * @typedef {Object} module:_/tool/env
 *
 * @property {('production'|'development')} [mode = 'development']
 *      Application running mode.
 * @property {(boolean)} sourceMaps
 *      If `true` source maps generated.
 * @property {(string|number)} port
 *      Port number application will be served on.
 */

/**
 * Prepares environment variables, to be used in `webpack` configuration.
 * @param {('production'|'development'|undefined)} [mode = 'development'] - current application mode.
 *
 * @return {module:_/tool/env} object which represents env variables.
 */
function getEnv(mode) {
    const args = require('minimist')(process.argv.slice(2));
    const appMode = mode || 'development';

    logger.info(`cli-env-variables: ${JSON.stringify(args, null, 4)}`);

    return {
        mode: appMode,
        port: args.port || defaultPorts[appMode === 'production'
            ? 'prod'
            : 'dev'],
        sourcemap: args['source-maps'] || false,
        stats: args.stats || false
    };
}

module.exports = {
    getEnv,
};
