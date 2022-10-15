import type { Instance } from 'mobx-state-tree';
import { types } from 'mobx-state-tree';

declare global {
    interface IGlobalStore {
        settings: TSettingsStore;
    }
}

export const SettingsModel = types
    .model('SettingsStore', {
        theme: types.optional(types.string, 'dark')
    })
    .actions((_self) => {
        const setTheme = (theme: 'dark' | 'light') => {
            _self.theme = theme;
        };

        return {
            setTheme
        };
    });

export const settingsStore = SettingsModel.create();

export type TSettingsStore = Instance<typeof SettingsModel>;
