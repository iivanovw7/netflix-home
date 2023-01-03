/**
 * Module contains mergeRefs util.
 * @module shared/utils/object/mergeRefs
 */
import type { MutableRefObject, RefCallback, LegacyRef } from 'react';

import { isFunction } from '../type';

/**
 * Merges multiple ref objects.
 * @param {...Ref<Element>} refs List of refs to merge.
 * @return {Ref<Element>} Merged ref.
 */
export const mergeRefs = <T extends AnyObject>(refs: Array<MutableRefObject<T> | LegacyRef<T>>): RefCallback<T> => {
    return (value) => {
        refs.forEach((ref) => {
            if (isFunction(ref)) {
                (ref as AnyFunction)(value);
            }
            else if (ref !== null) {
                (ref as MutableRefObject<Nullable<T>>).current = value;
            }
        });
    };
};
