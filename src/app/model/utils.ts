/**
 * Module contains app container utils.
 * @module app/model/util
 */
import type { RefObject } from 'react';

import { isFunction } from '../../shared/utils';

/*
    eslint-disable
    @typescript-eslint/no-unsafe-return,
    @typescript-eslint/no-explicit-any,
    @typescript-eslint/no-non-null-assertion
 */

/**
 * Creates application context.
 * @param {object} ref - ref object.
 * @return {{}} - object context reference.
 */
export const createRefContext = <T extends AnyObject<any>>(ref: RefObject<T>): NonNullable<RefObject<T>['current']> => {
    return Object.keys(ref.current!).reduce<AnyObject>((acc, key) => {
        if (isFunction(ref.current![key])) {
            acc[key] = (...args: any[]) => ref.current?.[key](...args);
        }
        else {
            Object.defineProperty(acc, key, {
                get: function get() {
                    return ref.current?.[key];
                },
            });
        }

        return acc;
    }, {}) as NonNullable<RefObject<T>['current']>;
};

/*
    eslint-enable
    @typescript-eslint/no-explicit-any,
    @typescript-eslint/no-unsafe-return,
    @typescript-eslint/no-non-null-assertion
*/
