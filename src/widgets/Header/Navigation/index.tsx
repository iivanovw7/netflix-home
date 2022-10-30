/**
 * Module contains application header navigation.
 * @module widgets/Header
 */
import bem from 'bem-ts';
import type { ReactElement } from 'react';
import React from 'react';

import { NavLink } from '../../../shared/components/NavLink';
import { getMenuItems } from '../../../shared/menu';
import { uuid } from '../../../shared/utils';

import './index.pcss';

const cls = bem('header-navigation', { namespace: 'nh-widgets' });

/**
 * Header Navigation component.
 * @method
 * @return {ReactElement} React component with children.
 * @constructor
 */
export const Navigation = (): ReactElement => {
    const items = getMenuItems();

    return (
        <div className={cls()}>
            {items.map((item) => {
                const { to, text, disabled } = item;

                return (
                    <div key={uuid()} className={cls('element')}>
                        <NavLink disabled={disabled} text={text} to={to} />
                    </div>
                );
            })}
        </div>
    );
};
