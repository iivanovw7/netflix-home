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

