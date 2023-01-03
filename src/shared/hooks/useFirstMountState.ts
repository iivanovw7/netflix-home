/**
 * Module contains useOnClickOutside hook.
 * @module ~/shared/hooks/useOnClickOutside
 */
import { useRef } from 'react';

/**
 * Determines first render.
 * @name ~/shared/hooks/useOnClickOutside
 * @function
 * @category hooks
 * @return {boolean} Returns `true` if component is just mounted (on first render) and `false` otherwise.
 */
export const useFirstMountState = (): boolean => {
    const isFirst = useRef(true);

    if (isFirst.current) {
        isFirst.current = false;

        return true;
    }

    return isFirst.current;
};
