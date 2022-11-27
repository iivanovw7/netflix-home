/**
 * Module contains isNumeric type check helper.
 * @module shared/utils/type/isNumeric
 */

import { identical, not, pipe } from 'ramda';

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
