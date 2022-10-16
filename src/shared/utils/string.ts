/**
 * Module contains strings related utility functions.
 * @module shared/utils/string
 */

/**
 * Capitalizes first string letter.
 * @function
 * @category String
 * @param {string} str - target string.
 * @return {string} result.
 */
export const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * CamelCase text converter `fn`.
 * @function
 * @category String
 * @param {string} str - string value.
 * @return {string} result string.
 */
export const camelCase = (str: string): string => {
    return capitalizeFirstLetter(str)
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function replacer(word, index) {
            return index === 0
                ? word.toLowerCase()
                : word.toUpperCase();
        })
        .replace(/\s+/g, '')
        .replace(/-/g, '');
};
