/**
 * Module contains useForceUpdate hook.
 * @module ~/shared/hooks/useForceUpdate
 */
import { useIncrementalKey } from './useIncrementalKey';

export type UseForceUpdate = () => { forceUpdate: () => void };

/**
 * Forces component to re-render.
 * @name ~/shared/hooks/useForceUpdate
 * @function
 * @category hooks
 * @return {UseForceUpdate} Returns forceUpdate function.
 */
export const useForceUpdate: UseForceUpdate = () => {
    const [, forceUpdate] = useIncrementalKey();

    return { forceUpdate };
};
