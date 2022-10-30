import { anyPass, identical, pipe, type, curryN, not } from 'ramda';

/**
 * Checks if input value is `Function`.
 * @function
 * @category Type
 * @param {*} val The value to test
 * @return {boolean} whether or not passed instance is function.
 */
export const isFunction = anyPass([
    pipe(type, identical('Function')),
    // can be extended, e.g. generator function check, async function check, etc.
]);

/**
 * Checks if value is a `Number` primitive or object.
 * @func isNumber
 * @category Type
 * @param {*} val The value to test
 * @return {boolean}
 */
export const isNumber = curryN(1, pipe(type, identical('Number')));

/**
 * Checks if input value is `String`.
 * @func isString
 * @category Type
 * @return {boolean}
 */
export const isString = curryN(1, pipe(type, identical('String')));

/**
 * Checks if input value is Numeric.
 * @func isNumeric
 * @category Type
 * @return {boolean}
 */
export const isNumeric = pipe(
    (value?: unknown) => Number(value),
    identical(NaN),
    not
);
