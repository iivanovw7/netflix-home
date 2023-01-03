/**
 * Module contains profile local storage.
 * @module shared/storage/profile
 */
import type { Instance } from 'mobx-state-tree';

import type { models } from '../stores';

import { storage, storageKeySet } from './index';

type TProfile = Instance<typeof models.Profile>;

const { main: mainStorage } = storage;

/**
 * Saves new user profile.
 * @param {Object} profile - user profile.
 */
export const setProfile = (profile: unknown): void => {
    mainStorage.set(storageKeySet.profile, profile);
};

/**
 * Retrieves user profile out of local storage.
 * @return {Object | null} - user profile.
 */
export const getProfile = (): Nullable<TProfile> => {
    return mainStorage.get(storageKeySet.profile) as TProfile;
};
