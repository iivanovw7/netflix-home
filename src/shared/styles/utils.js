/**
 * Module contains styles utils.
 * @module shared/styles/_utils.js
 */

'use strict';

/**
 * Get a set of properties with indication by given selectors from any object.
 * @param {Object} from - object to be searched.
 * @param {string} select - rest parameters should be string selectors.
 * @return {Array.<any|undefined>} lists of values.
 *
 * @example
 * const OBJ = {
 *     anyObject: { field: { value: 'some value' } },
 *     list: [1, 2, { value: 'test' }],
 * };
 * getValues(OBJ, 'anyObject.field.value', 'list[0]', 'list[2].value');
 * // => ['some value', 1, 'test']
 *
 */
const getValues = (from, ...select) => {
    return [...select].map((selector) => {
        return selector
            .replace(/\[([^[\]]*)/g, '.$1.')
            .split('.')
            .filter((term) => term !== '')
            .reduce((prev, cur) => prev && prev[cur], from);
    });
};

module.exports = {
    getValues,
};
