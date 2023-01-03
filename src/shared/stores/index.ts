/**
 * Module contains global application stores.
 * @module shared/stores
 */

import { controller } from './controller';
import { profileStore } from './ProfileStore';
import { routerStore } from './RouterStore';
import { settingsStore } from './SettingsStore';

export const stores = controller.stores;

export const initStore = controller.init({
    router: routerStore,
    profile: profileStore,
    settings: settingsStore
});
