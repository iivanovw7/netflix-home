/**
 * Module contains styles utils.
 * @module shared/styles/_utils.js
 */

'use strict';

const exportedVariables = require('./export');

const {
    PrimaryButtonColor,
    PrimaryButtonColorDisabled,
    PrimaryButtonColorText,
    PrimaryButtonColorAccent,
    SecondaryButtonColor,
    SecondaryButtonColorDisabled,
    SecondaryButtonColorText,
    SecondaryButtonColorAccent,
    TertiaryButtonColor,
    TertiaryButtonColorDisabled,
    TertiaryButtonColorText,
    TertiaryButtonColorAccent,
} = exportedVariables;

/**
 * Removes brackets and dashes.
 * @param {string} value variable string.
 * @return {string} result string.
 */
const trimVariable = (value) => {
    return value
        .substring(3)
        .replace(/[()]/g, '')
        .replace('--', '');
};

/**
 *  Capitalizes first letter of the string variable.
 *  @param {string} str - target string.
 *  @return {string} capitalized string.
 */
const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Camel text converter `fn`.
 * @param {string} str - string value.
 * @return {string} result string.
 */
const camelCase = (str) => {
    return capitalizeFirstLetter(str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
            return index === 0
                ? word.toLowerCase()
                : word.toUpperCase();
        })
        .replace(/\s+/g, '')
        .replace(/-/g, '')
    );
};

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

/**
 * Creates set of colors for button.
 * @param {'primary' | 'secondary' | 'tertiary'} [variant = 'primary'] color variant.
 * @return {{main: string, disabled: string, text: string, accent: string}} button color set.
 */
const getButtonColorsSet = (variant = 'primary') => {
    switch (variant) {
        case 'secondary': {
            return {
                main: SecondaryButtonColor,
                disabled: SecondaryButtonColorDisabled,
                text: SecondaryButtonColorText,
                accent: SecondaryButtonColorAccent,
            };
        }
        case 'tertiary': {
            return {
                main: TertiaryButtonColor,
                disabled: TertiaryButtonColorDisabled,
                text: TertiaryButtonColorText,
                accent: TertiaryButtonColorAccent,
            };
        }
        default: {
            return {
                main: PrimaryButtonColor,
                disabled: PrimaryButtonColorDisabled,
                text: PrimaryButtonColorText,
                accent: PrimaryButtonColorAccent,
            };
        }
    }
};

module.exports = {
    camelCase,
    trimVariable,
    getValues,
    getButtonColorsSet
};
