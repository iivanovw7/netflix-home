/**
 * Module contains application error codes.
 * @module shared/utils/env
 */

export type ErrorData = {
    code: ValueOf<typeof errorCodeMap>;
};

/**
 * Error codes.
 * @category ErrorCodeMap
 * @readonly
 * @enum {number}
 */
export const errorCodeMap: Record<string, number> = {
    NOT_FOUND: 404,
    UNKNOWN_ERROR: 5000
};

/**
 * Error code prefix.
 * @category ERROR_PREFIX
 * @readonly
 * @enum {string}
 */
export const ERROR_PREFIX = 'NSES';

/**
 * Returns error message containing code provided.
 * @function
 * @category ErrorCodeMap
 * @param {Object | number} error - code or error object.
 * @return {string} error code message.
 */
export const getErrorCodeString = (error: ErrorData | number): string => {
    const code = typeof error === 'number'
        ? error
        : error.code;

    return `${ERROR_PREFIX}-${code}`;
};
