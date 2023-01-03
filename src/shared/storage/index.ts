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
export const storageKeySet: Record<string, string> = {
    /** User profile id. */
    profile: 'profile',
};

const mainStorage = storeLib;

export const storage = {
    main: mainStorage
};

/**
 * Returns current local store instance.
 * @param {string} storeName - storage name prefix.
 * @return {StoreType} - returns local storage instance.
 */
export const getStore = (storeName: string): StoreType => {
    return storeLib.namespace(storeName);
};

/**
 * Sets and returns new storage if name passed, otherwise uses default store.
 * @param {string} storeName - storage name prefix.
 * @return {StoreType} - returns local storage instance.
 */
export const setMainStorage = (storeName: string): StoreType => {
    storage.main = storeName
        ? getStore(storeName)
        : mainStorage;

    return storage.main;
};
