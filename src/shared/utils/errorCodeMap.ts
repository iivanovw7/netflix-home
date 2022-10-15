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
    PAGE_NOT_FOUND: 404,
    UNKNOWN_ERROR: 5000
};

/**
 * Returns error message containing code provided.
 * @category ErrorCodeMap
 * @param {Object | number} error - code or error object.
 * @return {string} error code message.
 */
export function getErrorCodeString(error: ErrorData | number): string {
    const code = typeof error === 'number'
        ? error
        : error.code;

    return `NSES-${code}`;
}
