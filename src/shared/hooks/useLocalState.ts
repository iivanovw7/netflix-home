/**
 * Module contains useLocalState hook.
 * @module shared/hooks/useLocalState
 */

import { useContext} from 'react';
import type { Context } from 'react';

/**
 * Used to access store context inside Provider component.
 * @template Store
 * @param {Context<Store>} Context - object represents context.
 * @return {NonNullable<Store>} store context.
 */
export const useLocalState = <Store>(Context: Context<Store>): NonNullable<Store> => {
    const context = useContext(Context);

    if (! context) throw new Error('State must be used within a Provider');

    return context;
};
