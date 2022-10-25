/**
 * Module contains useEffectOnce hook.
 * @module shared/hooks/useEffectOnce
 */

import type { EffectCallback} from 'react';
import { useEffect } from 'react';

/**
 * React lifecycle hook that runs an effect only once.
 * @function
 * @category hooks
 * @param {EffectCallback} effect - effect callback.
 */
export const useEffectOnce = (effect: EffectCallback): void => {
    // eslint-disable-next-line
    useEffect(effect, []);
};
