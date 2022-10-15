/**
 * Module contains main application configuration.
 * @module shared/config
 */

import { logLevelMap } from '../log';
import { env } from '../utils';

const { runningMode } = env;

const settings = {
    /**
     * Log level, can be set to below options:
     *  - error [default, only errors]
     *  - debug [all levels]
     *  - off   [no logging]
     * @type {LogLevelDesc}
     */
    logLevel: logLevelMap.DEBUG,
    /**
     * Network config.
     * @type {Object}
     */
    net: {
        /**
         * Default request timeout.
         * @type {number}
         */
        requestTimeout: 10000,
    },
    /**
     * UI timeouts.
     * @type {Object}
     */
    timeout: {
        /**
         * Debounce delay in `ms`.
         * @type {number}
         */
        debounce: 300,
        /**
         * Throttle delay in `ms`.
         * @type {number}
         */
        throttle: 1000
    }
};

/**
 *  Changes config according to application running mode.
 *
 *  @param {object} object - initial settings.
 *  @param {'test' | 'production' | 'development'} mode - application mode, defined during build by webpack.
 */
(function merge(object, mode) {
    let logLevel = logLevelMap.ERROR;

    if (mode === 'test') {
        logLevel = logLevelMap.SILENT;
    }

    if (mode === 'development') {
        logLevel = logLevelMap.DEBUG;
    }

    Object.assign(object, { logLevel });

})(settings, runningMode);

export default settings;
