import { anyPass, identical, pipe, type } from 'ramda';

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
