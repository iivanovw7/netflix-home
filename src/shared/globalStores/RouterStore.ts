/**
 * Module contains global application router store.
 * @module shared/globalStores/RouterStore
 */
import type { BrowserHistory, Location as BrowserLocation, Path, To } from 'history';
import { createBrowserHistory } from 'history';
import { reaction } from 'mobx';
import type { Instance } from 'mobx-state-tree';
import { types } from 'mobx-state-tree';
import type { NavigateOptions } from 'react-router';

import { noop } from '../utils';

declare global {
    interface IGlobalStore {
        router: TRouterStore;
    }
}

/**
 * Sync the history object with the given mst router store.
 * @param {object} browserHistory - 'History' instance to subscribe and sync to.
 * @param {object} store - Router store instance to sync with the history changes.
 * @return {History} history object.
 */
export const syncHistoryWithStore = (browserHistory: BrowserHistory, store: TRouterStore): BrowserHistory => {
    store._setHistory(browserHistory);

    /**
     * Compares location keys.
     * @param {Location} locationA - prev location.
     * @param {Location} locationB - next location.
     * @return {boolean} `true` if locations are equal.
     */
    function isLocationEqual(locationA, locationB): boolean {
        return Boolean((
            locationA &&
            locationB &&
            locationA.key &&
            locationB.key &&
            locationA.key === locationB.key
        ));
    }

    const handleLocationChange = ({ location: browserLocation }: { location: BrowserLocation }) => {
        if (! isLocationEqual(store.location, browserLocation)) {
            store._setLocation({ ...browserLocation });
        }
    };

    const unsubscribeFromHistory = browserHistory.listen(handleLocationChange);

    const unsubscribeFromStoreLocation = reaction(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        () => store.location,
        (browserLocation) => {
            if (! isLocationEqual(browserHistory.location, browserLocation)) {
                browserHistory.replace({ ...browserLocation } as Partial<Path>);
            }
        }
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (browserHistory as any).unsubscribe = () => {
        unsubscribeFromHistory();
        unsubscribeFromStoreLocation();
    };

    handleLocationChange({ location: browserHistory.location });

    return browserHistory;
};

export const RouterModel = types
    .model('RouterStore', {
        location: types.optional(types.frozen(), noop),
        history: types.optional(types.frozen(), null),
        action: types.optional(types.string, '')
    })
    .actions((_self) => {
        let browserHistory;

        /**
         * Sets new history object.
         * @param {Location} initialHistory - new location history.
         */
        const _setHistory = (initialHistory) => {
            browserHistory = initialHistory;
        };

        /**
         * Sets new location.
         * @param {Location} newLocation new browser location.
         */
        const _setLocation = (newLocation) => {
            _self.location = newLocation;
            _self.action = browserHistory.action;
        };

        /**
         * Absolute router navigation.
         * @param {string} path - new path.
         * @param {Object} state - location state.
         */
        const navigateToAbsolute = <State = unknown>(path: string, state?: State): void => {
            browserHistory.push(path, state);
        };

        /**
         * Relative router navigation.
         * @param {string} path - new path.
         * @param {Object} state - location state.
         */
        const navigateToRelative = <State = unknown>(path: string, state?: State): void => {
            browserHistory.push(
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                `${browserHistory.location.pathname.replace(/\/$/, '')}${path}`,
                state
            );
        };

        /**
         * Navigates back.
         */
        const navigateBack = (): void => {
            history.back();
        };

        /**
         * Router redirect.
         * @param {string} path - new path.
         * @param {Object} state - location state.
         * @param {NavigateOptions} opts - navigate opts object.
         */
        const redirectTo = <State = unknown>(path: string, state?: State, opts?: NavigateOptions): void => {
            browserHistory.replace(path, state, opts);
        };

        /**
         * Creates href of the given value.
         * @see {@link https://github.com/remix-run/history/blob/main/docs/api-reference.md#history.createHref}
         * @param {To} to target path.
         * @return {string} valid href string.
         */
        const createHref = (to: To): string => {
            return browserHistory.createHref(to) as string;
        };

        /**
         * Push new location.
         * @param {To} to - destination location.
         * @param {Object} state - object represents location state.
         * @param {NavigateOptions} opts - object represent router navigation options.
         */
        const push = <State = unknown>(to: To, state?: State, opts?: NavigateOptions): void => {
            browserHistory.push(to, state, opts);
        };

        /**
         * Navigates `n` entries backwards or forwards.
         * @param {number} delta - number of entries.
         */
        const go = (delta: number): void => {
            browserHistory.go(delta);
        };

        return {
            _setHistory,
            _setLocation,
            navigateToAbsolute,
            navigateToRelative,
            navigateBack,
            redirectTo,
            push,
            go,
            createHref
        };
    });

export const routerStore = RouterModel.create();

syncHistoryWithStore(createBrowserHistory(), routerStore);

const {
    navigateToAbsolute,
    navigateToRelative,
    navigateBack,
    redirectTo,
    createHref,
    push,
    go
} = routerStore;

export const navigate = {
    absolute: navigateToAbsolute,
    relative: navigateToRelative,
    redirect: redirectTo,
    back: navigateBack,
    createHref,
    push,
    go
};

export type TRouterStore = Instance<typeof RouterModel>;
