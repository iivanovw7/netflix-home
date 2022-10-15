/**
 * Module contains application local storages.
 * @module shared/storage
 */

import type { StoreType } from 'store2';
import storeLib from 'store2';

/**
 * Set of storage keys.
 * @readonly
 * @enum {string}
 */
export const storeKeySet: Record<string, string> = {
    /** User profile id. */
    profile: 'profile',
};

const mainStore = storeLib;

export let store = mainStore;

/**
 * Returns current local store instance.
 * @param {string} storeName - storage name prefix.
 * @return {StoreType} - returns local storage instance.
 */
export function getStore(storeName: string): StoreType {
    return storeLib.namespace(storeName);
}

/**
 * Sets and returns new storage if name passed, otherwise uses default store.
 * @param {string} storeName - storage name prefix.
 * @return {StoreType} - returns local storage instance.
 */
export function setMainStore(storeName: string): StoreType {
    store = storeName
        ? getStore(storeName)
        : mainStore;

    return store;
}
