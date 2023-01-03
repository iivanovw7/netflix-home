import type { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';
import { types } from 'mobx-state-tree';

import { Profile } from './models';

declare global {
    interface IGlobalStore {
        settings: TSettingsStore;
    }
}

const SettingsModel = types
    .model('SettingsStore', {
        theme: types.optional(types.string, 'dark'),
        waitQueue: types.optional(types.number, 0),
        waitProfile: types.optional(types.maybeNull(Profile), null),
    })
    .views((settingsModel) => ({
        get isWait(): boolean {
            return settingsModel.waitQueue > 0;
        }
    }))
    .actions((settingsModel) => {
        const setTheme = (theme: 'dark' | 'light') => {
            settingsModel.theme = theme;
        };

        const startWait = (profile?) => {
            settingsModel.waitQueue++;

            if (profile) {
                settingsModel.waitProfile = { ...profile };
            }
        };

        const stopWait = () => {
            if (settingsModel.waitQueue > 0) {
                settingsModel.waitQueue--;
                settingsModel.waitProfile = null;
            }
        };

        const completeWait = () => {
            if (settingsModel.waitQueue > 0) {
                settingsModel.waitQueue = 0;
                settingsModel.waitProfile = null;
            }
        };

        return {
            setTheme,
            startWait,
            stopWait,
            completeWait
        };
    });

export const settingsStore = SettingsModel.create();

export type TSettingsStore = Instance<typeof SettingsModel>;
export type TSettingsStoreSnapshotIn = SnapshotIn<typeof SettingsModel>;
export type TSettingsStoreSnapshotOut = SnapshotOut<typeof SettingsModel>;
