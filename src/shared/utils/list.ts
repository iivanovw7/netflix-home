/**
 * Module contains lists utility functions.
 * @module shared/utils/list
 */
import { pipe, curry, find as ramdaFind, defaultTo } from 'ramda';

/**
 * Returns the first element of the list which matches the predicate.
 * Returns default value if no element matches or matched element is `null`, `undefined` or `NaN`.
 * Dispatches to the find method of the second argument, if present.
 * @func findOr
 * @category List
 * @param {*} defaultValue The default value
 * @param {Function} fn The predicate function used to determine if the element is the desired one.
 * @param {Array} list The array to consider.
 * @return {*} The element found, or the default value.
 * @example
 *      findOr(1, isUndefined, [1, 2, undefined]); // => 1
 *      findOr(1, val => val === 2, [1, 2, undefined]); // => 2
 *      findOr(1, val => val === 3, [1, 2, undefined]); // => 1
 */
export const findOr = curry(
    <DefaultValue>(defaultVal: DefaultValue, fn: (value: unknown) => boolean, list: Array<unknown>) => {
        return pipe(ramdaFind(fn), defaultTo(defaultVal))(list);
    }
);
