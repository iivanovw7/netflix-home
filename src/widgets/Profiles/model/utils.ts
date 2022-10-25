/**
 * Module contains `Profile` unlock modal component.
 * @module widgets/Profiles/model/utils
 */

import { allPass, pipe, isNil, not } from 'ramda';

import { isNumeric } from '../../../shared/utils';

export type PredicateFn = (val?: Maybe<string>) => boolean;

/**
 * Lngth verification predicate.
 * @function
 * @param {number} valueLength - required value length.
 * @return {boolean} `true` if value has required length `false`.
 */
const hasLength = (valueLength: number): PredicateFn => (val) => val?.length === valueLength;

/**
 * Verifies code.
 * @function
 * @return {boolean} `true` if code is valid and `false` otherwise.
 */
export const isValidCode = allPass<PredicateFn>([
    pipe(isNil, not),
    hasLength(4),
    isNumeric,
]);
