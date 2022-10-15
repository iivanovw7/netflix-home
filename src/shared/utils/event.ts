/**
 * Module contains utility functions related to events.
 * @module shared/utils/event
 */

type TTarget = Window | Document | HTMLElement | EventTarget;
type TEventListener = Parameters<HTMLElement['addEventListener']>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TListeners = [string, AnyFunction | null, ...any];

/**
 * Contains `event` names.
 * @category Event
 * @readonly
 * @name eventMap
 * @enum {string}
 */
export const eventMap: Record<string, string> = {
    POINTERDOWN: 'pointerdown',
    RESIZE: 'resize'
};

/**
 * Adds `event` listener to a target object.
 * @category Event
 * @param {TTarget} obj - represents target object reference.
 * @param {...any} args - event type string, listener function, options.
 */
export function on<T extends TTarget>(obj: T | null, ...args: Parameters<T['addEventListener']> | TListeners): void {
    if (obj?.addEventListener) {
        obj.addEventListener(...(args as TEventListener));
    }
}

/**
 * Removes `event` listener out of a target object.
 * @param {TTarget} obj - represents target object reference.
 * @param {...any} args - event type string, listener function, options.
 */
export function off<T extends TTarget>(obj: T | null, ...args: Parameters<T['removeEventListener']> | TListeners): void {
    if (obj?.removeEventListener) {
        obj.removeEventListener(...(args as TEventListener));
    }
}
