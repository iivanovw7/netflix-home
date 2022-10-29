/**
 * Module contains global application profile store.
 * @module shared/globalStores/ProfileStore
 */
import type { Instance } from 'mobx-state-tree';
import { flow, getEnv, types } from 'mobx-state-tree';

import PROFILES_STUB from '../../../assets/json/profilesStub.json';
import getLogger from '../log';
import {
    getProfile as getLocalStorageProfile,
    setProfile as setLocalStorageProfile
} from '../storage/profile';
import { makeApiRequest, wait } from '../utils';

declare global {
    interface IGlobalStore {
        profile: TProfileStore;
    }
}

const logger = getLogger('ProfileStore');

const Profile = types.model('Profile', {
    id: types.string,
    name: types.string,
    lock: types.union(types.maybe(types.string), types['null'])
});

export type TProfile = {
    id: string;
    name: string;
    lock: Maybe<string>;
};

export type ProfileModelEnv = {
    fetch: () => Promise<never>
};

export const ProfileModel = types
    .model('ProfileStore', {
        profile: types.optional(types.maybeNull(Profile), null),
        profiles: types.optional(types.array(Profile), []),
    })
    .views((_self) => ({
        get fetch(): ProfileModelEnv['fetch'] {
            return getEnv<ProfileModelEnv>(_self).fetch;
        },
    }))
    .actions((_self) => {
        /**
         *  Loads user profile from local storage.
         */
        const loadProfile = (): void => {
            const profile = getLocalStorageProfile();

            if (profile) {
                _self.profile = { ...profile };
            }
        };

        /**
         *  Updates user`s profiles.
         *  @param {Array.<Profile>} profiles - profiles list.
         */
        const updateProfiles = (profiles): void => {
            _self.profiles = profiles;
        };

        /**
         *  Fetches user`s profiles STUB.
         */
        const loadProfiles = flow(function *loadProfiles() {
            updateProfiles(yield makeApiRequest({
                request: async () => {
                    return await _self.fetch();
                },
                onError: (errorData: unknown) => {
                    logger.error('Failed to load profiles ', errorData);
                },
            }));
        });

        /**
         * Sets new use profile.
         * @param {Object} profile - user profile.
         */
        const setProfile = (profile: TProfile): void => {
            setLocalStorageProfile(profile);
            _self.profile = { ...profile };
        };

        return {
            loadProfile,
            loadProfiles,
            setProfile
        };
    });

export const profileStore = ProfileModel.create(
    {
        profile: getLocalStorageProfile(),
        profiles: []
    },
    {
        fetch: () => wait(PROFILES_STUB)
    }
);

export type TProfileStore = Instance<typeof ProfileModel>;


