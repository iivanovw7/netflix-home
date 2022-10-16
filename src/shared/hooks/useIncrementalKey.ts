/**
 * Module contains useIncrementalKey hook.
 * @module shared/hooks/useIncrementalKey
 */

import type { DispatchWithoutAction, ReducerStateWithoutAction} from 'react';
import { useReducer } from 'react';

export type UseIncrementalKey = (initialKey?: number) => [
    ReducerStateWithoutAction<(s: number) => number>, DispatchWithoutAction
];

/**
 * Used to create incremental keys inside components.
 * @function
 * @category hooks
 * @param {number} [initialKey = Number.MIN_SAFE_INTEGER] start key.
 * @return {number} key value.
 */
export const useIncrementalKey: UseIncrementalKey = (initialKey = Number.MIN_SAFE_INTEGER) => {
    return useReducer((s: number) => s + 1, initialKey);
};
