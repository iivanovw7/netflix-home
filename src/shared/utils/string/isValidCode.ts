/**
 * Module contains `isValidCode` checker.
 * @module shared/utils/string/isValidCode
 */

import { allPass, pipe, isNil, not } from 'ramda';

import { isNumeric } from '../type';

export type LengthPredicateFn = (value?: Maybe<string>) => boolean;

/**
 * Length verification predicate.
 * @function
 * @param {number} valueLength - required value length.
 * @return {boolean} `true` if value has required length `false`.
 */
const hasLength = (valueLength: number): LengthPredicateFn => (val) => val?.length === valueLength;

/**
 * Creates string code validation function. Verifies if string can be converted in number of required length.
 * @function
 * @param {string} [value] - validating string value.
 * @param {number} [valueLength = 4] - required code length.
 * @return {LengthPredicateFn} `true` if code is valid and `false` otherwise.
 */
export const isValidCode = (value?: Maybe<string>, valueLength = 4) => allPass<LengthPredicateFn>([
    pipe(isNil, not),
    hasLength(valueLength),
    isNumeric,
])(value);
