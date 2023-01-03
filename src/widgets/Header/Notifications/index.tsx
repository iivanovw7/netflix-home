/**
 * Module contains application header notifications.
 * @module widgets/Header/Notifications
 */
import bem from 'bem-ts';
import type { ReactElement } from 'react';
import React from 'react';

import { Button } from '../../../shared/components';

import './index.pcss';

const cls = bem('header-notifications', { namespace: 'nh-widgets' });

/**
 * Header Notifications component.
 * @method
 * @return {ReactElement} React component with children.
 * @constructor
 */
export const Notifications = (): ReactElement => {
    return (
        <Button
            className={cls('toggle')}
            color="secondary"
            fill="none"
            icon={{ name: 'bell', size: 24 }}
        />
    );
};
