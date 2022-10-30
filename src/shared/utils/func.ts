/**
 * Module contains uncategorized utility functions.
 * @module shared/utils/func
 */
import type { IReactionDisposer } from 'mobx';

export { v4 as uuid } from 'uuid';
export { default as bem, setup as setBemConfig } from 'bem-ts';

/**
 * Used to assign display name to a method or a component.
 * @function
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

export const wait = async <T>(data?: T, delay = 300): Promise<unknown> => {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => setTimeout(() => resolve(data), delay));
};

export type TDisposerFn = () => void;

export type TStoreWithSubscriptions = {
    subscribeReactions: () => TDisposerFn;
};

/**
 * Receives list of disposers and creates `unsubscribe` method.
 * @param {Function} disposers - list of disposers.
 * @return {Function} unsubscribe method.
 * @example
 *     subscribeReactions = () => {
 *         return withDisposer([
 *             reaction(
 *                 () => this.A,
 *                 () => this.reactionA(),
 *             ),
 *         ]);
 *     };
 */
export const withDisposer = (disposers: IReactionDisposer[]): TDisposerFn => {
    return () => disposers.forEach((disposer) => disposer());
};


