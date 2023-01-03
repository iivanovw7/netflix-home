/**
 * Module contains global application stores.
 * @module shared/stores
 */

import { controller } from './controller';
import { Profile } from './models';
import { profileStore } from './ProfileStore';
import { routerStore } from './RouterStore';
import { settingsStore } from './SettingsStore';

export const { stores } = controller;

export const initStores = controller.init({
    router: routerStore,
    profile: profileStore,
    settings: settingsStore
});

export const models = {
    Profile
};
