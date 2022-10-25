/**
 * Module contains useUnmount hook.
 * @module shared/hooks/useUnmount
 */

import { useRef } from 'react';

import { useEffectOnce } from './useEffectOnce';

/**
 * React lifecycle hook that calls a function when the component will unmount.
 *      Use useLifecycles if you need both a mount and unmount function.
 * @function
 * @category hooks
 * @param {Function} callback - unmount callback.
 *
 * @example
 *      const Test = () => {
 *          useUnmount(() => console.log('Unmount'));
 *          return null;
 *      };
 */
export const useUnmount = (callback: () => void): void => {
    const callbackRef = useRef(callback);

    callbackRef.current = callback;

    useEffectOnce(() => () => callbackRef.current());
};
