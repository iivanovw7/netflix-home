/**
 * Module contains application `withRouter` HOC.
 * @module app/providers/withRouter
 */
import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';
import React from 'react';
import { Router } from 'react-router-dom';

import { navigate, routerStore } from '../../shared/globalStores/RouterStore';
import { setDisplayName } from '../../shared/utils';

const {
    go,
    push,
    redirect,
    createHref
} = navigate;

/**
 * Application router HOC.
 * @constructor
 * @param {ReactElement} Component - represents child component.
 *
 * @return {function(*)} React component with children.
 */
export const withRouter: HFC = (Component) => {
    return setDisplayName('BrowserRouter')(observer((props): ReactElement => {
        return (
            <Router
                navigator={{
                    go,
                    push,
                    replace: redirect,
                    createHref
                }}
                location={routerStore.location}
            >
                <Component {...props} />
            </Router>
        );
    }));
};
