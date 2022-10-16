/**
 * Module contains stubs.
 * @module shared/utils/stub
 */

/* eslint-disable @typescript-eslint/no-empty-function */

/**
 * No operation function.
 * @function
 * @category Stub
 */
export const noop: AnyFunction = () => {};

/**
 * No operation curried function.
 * @function
 * @category Stub
 * @return {Function} empty function.
 */
export const noop2: (...args: any[]) => AnyFunction = () => () => {};  // eslint-disable-line @typescript-eslint/no-explicit-any

export const identity = <T>(arg: T): T => arg;

/* eslint-enable @typescript-eslint/no-empty-function */
