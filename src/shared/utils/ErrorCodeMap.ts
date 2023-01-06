/**
 * Module contains application error codes.
 * @module shared/utils/ErrorCodeMap
 */

/**
 * Error codes.
 * @category ErrorCodeMap
 * @readonly
 * @enum {number}
 */
export const ErrorCodeMap = {
    NOT_FOUND: 404,
    UNKNOWN_ERROR: 5000,
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ErrorCodeMap = Readonly<typeof ErrorCodeMap[keyof typeof ErrorCodeMap]>;

export type ErrorData = Readonly<{
    code: ValueOf<typeof ErrorCodeMap>;
}>;

/**
 * Error code prefix.
 * @category ERROR_PREFIX
 * @readonly
 * @enum {string}
 */
export const ERROR_PREFIX: Readonly<string> = 'NSES';

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
