/**
 * Module contains curried no operation stub.
 * @module shared/utils/stub/noop2
 */

/*
    eslint-disable
    @typescript-eslint/no-empty-function,
    @typescript-eslint/no-explicit-any
*/

/**
 * No operation curried function.
 * @function
 * @category Stub
 * @return {Function} empty function.
 */
export const noop2: (...args: any[]) => AnyFunction = () => () => {};

/*
    eslint-enable
    @typescript-eslint/no-empty-function,
    @typescript-eslint/no-explicit-any
*/
