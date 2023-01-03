/**
 * Module contains application `withTheme` HOC.
 * @module app/providers/withTheme
 */
import type { ReactElement } from 'react';
import React, { useEffect } from 'react';

import { settingsStore } from '../../shared/stores/SettingsStore';
import { env, setDisplayName } from '../../shared/utils';

const { html } = env;

/**
 * Application theme HOC component.
 * @constructor
 * @param {FunctionComponent} Component - represents child component.
 *
 * @return {function(*)} React component with children.
 */
export const withTheme: HFC = (Component) => {
    return setDisplayName('ThemeProvider')((props): ReactElement => {
        useEffect(() => {
            html.dataset.theme = settingsStore.theme;
        }, []);

        return <Component {...props} />;
    });
};
