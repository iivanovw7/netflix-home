/**
 * Module contains `ProfileUnlock` constants.
 * @module ~/widgets/ProfileUnlock/model/constants
 */

import { uuid } from '../../../shared/utils';

/**
 * Pin Code length.
 * @type {number}
 */
export const PIN_LENGTH = 4;

/**
 * Default Pin Code.
 * @type {number}
 */
export const DEFAULT_PIN = new Array(PIN_LENGTH)
    .fill('');

/**
 * Pin `ids` for Code inputs.
 * @type {number}
 */
export const PIN_IDS = new Array(PIN_LENGTH)
    .fill('')
    .map(() => uuid() as string);
