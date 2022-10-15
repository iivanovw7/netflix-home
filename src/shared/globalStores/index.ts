/**
 * Module contains global aplication stores.
 * @module shared/globalStores
 */

import { controller } from './controller';
import { profileStore } from './ProfileStore';
import { routerStore } from './RouterStore';
import { settingsStore } from './SettingsStore';

export const globalStore = controller.stores;

export const initGlobalStore = controller.init({
    router: routerStore,
    profile: profileStore,
    settings: settingsStore
});
