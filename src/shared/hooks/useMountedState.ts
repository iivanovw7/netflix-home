/**
 * Module contains useMountedState hook.
 * @module ~/shared/hooks/useMountedState
 */
import { useCallback, useEffect, useRef } from 'react';

type TUseMountedState = () => () => boolean;

/**
 * Used to check component's mount state.
 * Does not cause component re-render.
 * @name ~/shared/hooks/useMountedState
 * @function
 * @category hooks
 * @return {function} Returns a function that will return `true` if component mounted and `false` otherwise.
 */
export const useMountedState: TUseMountedState = () => {
    const mountedRef = useRef<boolean>(false);
    const getMountedState = useCallback(() => mountedRef.current, []);

    useEffect(() => {
        mountedRef.current = true;

        return () => {
            mountedRef.current = false;
        };
    }, []);

    return getMountedState;
};
