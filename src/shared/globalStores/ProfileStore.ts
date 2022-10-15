/**
 * Module contains global application profile store.
 * @module shared/globalStores/ProfileStore
 */

import type { Instance } from 'mobx-state-tree';
import { flow, getEnv, types } from 'mobx-state-tree';

import profilesStub from '../../../assets/json/profilesStub.json';
import getLogger from '../log';
import {
    getProfile as getLocalStorageProfile,
    setProfile as setLocalStorageProfile
} from '../storage/profile';
import { wait } from '../utils';


declare global {
    interface IGlobalStore {
        profile: TProfileStore;
    }
}

const logger = getLogger('ProfileStore');

const Profile = types.model('Profile', {
    id: types.string,
    name: types.string,
    lock: types.union(types.maybe(types.number), types['null'])
});

export type TProfile = {
    id: string;
    name: string;
    lock: Maybe<number>;
};

export const ProfileModel = types
    .model('ProfileStore', {
        profile: types.optional(types.maybeNull(Profile), null),
        profiles: types.optional(types.array(Profile), []),
    })
    .views((_self) => ({
        get fetch(): () => Promise<never> {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return getEnv(_self).fetch;
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

        const updateProfiles = (profiles): void => {
            _self.profiles = profiles;
        };

        const loadProfiles = flow(function *loadProfiles() {
            try {
                updateProfiles(yield _self.fetch());
            }
            catch (err: unknown) {
                logger.error('Failed to load profiles ', err);
            }
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
        fetch: () => wait(profilesStub)
    }
);

export type TProfileStore = Instance<typeof ProfileModel>;


