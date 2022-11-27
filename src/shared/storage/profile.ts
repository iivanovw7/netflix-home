/**
 * Module contains profile local storage.
 * @module shared/storage/profile
 */
import type { TProfile } from '../stores/ProfileStore';

import { store, storeKeySet } from './index';

/**
 * Saves new user profile.
 * @param {Object} profile - user profile.
 */
export function setProfile(profile: unknown): void {
    store.set(storeKeySet.profile, profile);
}

/**
 * Retrieves user profile out of local storage.
 * @return {Object | null} - user profile.
 */
export function getProfile(): Nullable<TProfile> {
    return store.get(storeKeySet.profile) as TProfile;
}
