import type { IReactionDisposer } from 'mobx';

/**
 * Module contains withDisposer helper.
 * @module shared/utils/withDisposer
 */

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
