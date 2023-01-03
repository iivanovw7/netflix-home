/**
 * Module contains App container.
 * @module app
 */
import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';
import React, { useLayoutEffect } from 'react';

import { Routing } from '../pages';
import { stores } from '../shared/stores';

import { withProviders } from './providers';

/**
 * Main application component.
 * @constructor
 * @return {ReactElement} React component with children.
 */
export const App = observer(withProviders((): ReactElement => {
    const {
        profile: { loadLocalProfile, loadProfiles },
    } = stores;

    useLayoutEffect(() => {
        // eslint-disable-next-line no-void
        void loadProfiles();
        loadLocalProfile();
    }, [loadLocalProfile, loadProfiles]);

    return <Routing />;
}));
