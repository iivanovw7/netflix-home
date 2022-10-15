/**
 * Module contains logger.
 * @module shared/log/logger
 */

import type { Logger, LogLevel, LogLevelDesc } from 'loglevel';
import logger from 'loglevel';

/**
 * Log messages map.
 * @readonly
 * @enum {LogLevelDesc}
 */
export const logLevelMap: Record<keyof LogLevel, LogLevelDesc> = {
    DEBUG: 'debug',
    ERROR: 'error',
    INFO: 'info',
    SILENT: 'silent',
    TRACE: 'trace',
    WARN: 'warn',
};

/**
 * Disables all logging below the given level.
 * @param {LogLevelDesc} level - log level.
 */
export function setLogLevel(level: LogLevelDesc): void {
    logger.setLevel(level);
}

/**
 * Creates new logger object.
 * @param {string} [loggerName=''] - new logger name.
 * @return {Object} new logger object.
 */
export default function getLogger(loggerName: string): Logger {
    return logger.getLogger(loggerName || '');
}
