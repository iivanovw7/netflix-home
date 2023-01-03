/**
 * Module contains global application profile store.
 * @module shared/stores/ProfileStore
 */
import type { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';
import { flow, getEnv, types } from 'mobx-state-tree';

import PROFILES_STUB from '../../../assets/json/profilesStub.json';
import { getLogger } from '../log';
import {
    getProfile as getLocalStorageProfile,
    setProfile as setLocalStorageProfile
} from '../storage/profile';
import {
    makeApiRequest,
    wait,
} from '../utils';

import { Profile } from './models';
import { settingsStore } from './SettingsStore';

declare global {
    interface IGlobalStore {
        profile: TProfileStore;
    }
}

const logger = getLogger('ProfileStore');

export type ProfileModelEnv = {
    fetch: <Data>(data: Data, delay?: number) => Promise<Data>
};

const ProfileModel = types
    .model('ProfileStore', {
        profile: types.optional(types.maybeNull(Profile), null),
        profiles: types.optional(types.array(Profile), []),
    })
    .views((profileModel) => ({
        get fetch(): ProfileModelEnv['fetch'] {
            return getEnv<ProfileModelEnv>(profileModel).fetch;
        },
    }))
    .actions((profileModel) => {
        /**
         *  Sets new user`s profiles.
         *  @private
         *  @param {Profile} profile - profiles list.
         */
        const setProfile = (profile): void => {
            setLocalStorageProfile(profile);
            profileModel.profile = { ...profile };
        };

        /**
         *  Changes global loader state.
         *  @private
         *  @param {TProfile} profile - profiles list.
         */
        const setProfileLoader = (profile) => (isLoading: boolean) => {
            if (isLoading) {
                settingsStore.startWait(profile);
            }
            else {
                settingsStore.stopWait();
            }
        };

        /**
         *  Updates user`s profiles.
         *  @private
         *  @param {Array.<Profile>} profiles - profiles list.
         */
        const updateProfiles = (profiles): void => {
            profileModel.profiles = profiles;
        };

        /**
         * Sets new use profile.
         * @param {Object} profile - user profile.
         */
        const changeUserProfile = flow(function *changeUserProfile(profile) {
            // Imitates additional profile data request: bookmarks, favorites, etc.
            setProfile(yield makeApiRequest({
                request: async () => {
                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    return profileModel.fetch(profile, 3000);
                },
                onError: (errorData: unknown) => {
                    logger.error('Failed to load profiles ', errorData);
                },
                setLoading: setProfileLoader(profile)
            }));
        });

        /**
         *  Loads user profile from local storage.
         */
        const loadLocalProfile = (): void => {
            const profile = getLocalStorageProfile();

            if (profile) {
                profileModel.profile = { ...profile };
            }
        };

        /**
         *  Fetches user`s profiles STUB.
         */
        const loadProfiles = flow(function *loadProfiles() {
            updateProfiles(yield makeApiRequest({
                request: async () => {
                    return profileModel.fetch(PROFILES_STUB);
                },
                onError: (errorData: unknown) => {
                    logger.error('Failed to load profiles ', errorData);
                },
            }));
        });

        /**
         * Removes active profile.
         */
        const resetProfile = (): void => {
            setLocalStorageProfile(null);
            profileModel.profile = null;
        };

        return {
            changeUserProfile,
            loadLocalProfile,
            loadProfiles,
            resetProfile
        };
    });

export const profileStore = ProfileModel.create(
    {
        profile: getLocalStorageProfile(),
        profiles: []
    },
    {
        // TODO: Replace stub with API.
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        fetch: (data, delay = 300) => wait(data, delay),
    }
);

export type TProfileStore = Instance<typeof ProfileModel>;
export type TProfileStoreSnapshotIn = SnapshotIn<typeof ProfileModel>;
export type TProfileStoreSnapshotOut = SnapshotOut<typeof ProfileModel>;
