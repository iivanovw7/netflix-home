/**
 * Module contains application header notifications.
 * @module widgets/Header/Notifications
 */
import type { ReactElement } from 'react';
import React from 'react';

import { Button } from '../../shared/components';

import cls from './index.module.pcss';

/**
 * Header Notifications component.
 * @method
 * @return {ReactElement} React component with children.
 * @constructor
 */
export const Notifications = (): ReactElement => {
    return (
        <Button
            className={cls.notificationsToggle}
            color="secondary"
            fill="none"
            icon={{ name: 'bell', size: 24 }}
        />
    );
};
