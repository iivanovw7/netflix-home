/**
 * Module contains application `withWaitScreen` HOC.
 * @module app/providers/withWaitScreen
 */
import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';
import React from 'react';

import { settingsStore } from '../../shared/stores/SettingsStore';
import { setDisplayName } from '../../shared/utils';
import { WaitScreen } from '../../widgets';

/**
 * Application wait screen HOC component.
 * @constructor
 * @param {FunctionComponent} Component - represents child component.
 *
 * @return {function(*)} React component with children.
 */
export const withWaitScreen: HFC = (Component) => {
    return setDisplayName('WaitScreen')(observer((props): ReactElement => {
        return settingsStore.isWait
            ? <WaitScreen profile={settingsStore.waitProfile} />
            : <Component {...props} />;
    }));
};
