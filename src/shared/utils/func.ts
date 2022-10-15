/**
 * Module contains uncategorized utility functions.
 * @module shared/utils/func
 */

import type { HFC } from '../types/util';

export { v4 as uuid } from 'uuid';
export { default as bem, setup } from 'bem-ts';


/**
 * Used to assign display name to a method or a component.
 * @category Func
 * @param {string} displayName - component`s display name.
 *
 * @return {function(*): *} returns static name setter.
 *
 * @example
 *      export const withContext = (Component) => setDisplayName('Provider')((props) => {
 *          return <div><Component { ...props } /></div>
 *      });
 */
export const setDisplayName = (displayName: string): HFC => {
    return (BaseComponent) => {
        BaseComponent[displayName] = displayName;

        return BaseComponent;
    };
};

export const wait = async <T>(data: T, delay = 300): Promise<T> => {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => setTimeout(() => resolve(data), delay));
};


