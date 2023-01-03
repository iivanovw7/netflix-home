/**
 * Module contains useOnClickOutside hook.
 * @module ~/shared/hooks/useOnClickOutside
 */
import type { RefObject } from 'react';
import { useEffect } from 'react';

/**
 * React hook for listening for clicks outside a list specified elements.
 * @name ~/shared/hooks/useOnClickOutside
 * @function
 * @category hooks
 * @param {Function} handler - click handler.
 * @param {Array.<RefObject>} elements - list of element refs.
 */
export const useOnClickOutside = (handler: () => void, ...elements: RefObject<Maybe<Element>>[]) => {
    useEffect(() => {
        const listener = (eventData: PointerEvent) => {
            for (const element of elements) {
                if (element?.current?.contains(eventData.target as never)) {
                    return;
                }
            }

            handler();
        };

        document.addEventListener('pointerdown', listener);

        return () => document.removeEventListener('pointerdown', listener);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...elements, handler]);
};
