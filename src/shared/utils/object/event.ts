/**
 * Module contains utility functions related to events.
 * @module shared/utils/event
 */
import type { SyntheticEvent } from 'react';

type TTarget = Window | Document | HTMLElement | EventTarget;
type TEventListener = Parameters<HTMLElement['addEventListener']>;

/*
    eslint-disable
    @typescript-eslint/no-explicit-any,
*/

type TListeners = [string, AnyFunction | null, ...any];

/**
 * Contains `event` names.
 * @category Event
 * @readonly
 * @name EventMap
 * @enum {string}
 */
export const EventMap: Record<string, string> = {
    POINTERDOWN: 'pointerdown',
    RESIZE: 'resize',
    POINTERMOVE: 'pointermove',
    KEYDOWN: 'keydown',
} as const;

/**
 * Adds `event` listener to a target object.
 * @function
 * @category Event
 * @param {TTarget} obj - represents target object reference.
 * @param {...any} args - event type string, listener function, options.
 */
export const onEvent = <T extends TTarget>(
    obj: Nullable<T>,
    ...args: Parameters<T['addEventListener']> | TListeners
): void => {
    if (obj?.addEventListener) {
        obj.addEventListener(...(args as TEventListener));
    }
};

/**
 * Removes `event` listener out of a target object.
 * @function
 * @category Event
 * @param {TTarget} obj - represents target object reference.
 * @param {...any} args - event type string, listener function, options.
 */
export const offEvent = <T extends TTarget>(
    obj: T | null,
    ...args: Parameters<T['removeEventListener']> | TListeners
): void => {
    if (obj?.removeEventListener) {
        obj.removeEventListener(...(args as TEventListener));
    }
};

/**
 * Sets custom value to event data object.
 * @param {SyntheticEvent} eventData - target event.
 * @param {any} value to set.
 * @return {SyntheticEvent} new event.
 */
export const setEventValue = <Value, Event extends SyntheticEvent>(
    eventData: Event,
    value: Value
): CustomValueEvent<Value, Event> => {
    eventData.target = new Proxy(eventData.target, {
        get: (target, property) => {
            if (property === 'value') {
                return value;
            }

            return (target as any)[property] as CustomValueEvent<Value, Event>;
        },
    });

    return eventData as any as CustomValueEvent<Value, Event>;
};

export type CustomValueEvent<Value, Event extends SyntheticEvent = SyntheticEvent> = Omit<Event, 'target'> & {
    target: Event['target'] & { value: Value };
};

/*
    eslint-enable
    @typescript-eslint/no-explicit-any,
*/
