/**
 * Module contains application header menu.
 * @module widgets/Header/Menu
 */
import bem from 'bem-ts';
import type { ReactElement } from 'react';
import React from 'react';

import placeholder from '../../../../assets/img/avatar-placeholder.png?w=32&png&imagetools';
import { AVATARS, Img, Link } from '../../../shared/components';
import { stores } from '../../../shared/stores';

import './index.pcss';

const cls = bem('header-menu', { namespace: 'nh-widgets' });

/**
 * Header Menu component.
 * @method
 * @return {ReactElement} React component with children.
 * @constructor
 */
export const Menu = (): ReactElement => {
    const { profile } = stores.profile;
    const profileIndex = profile?.index;

    return (
        <Link className={cls('toggle')} tag="a">
            <Img
                src={profileIndex
                    ? AVATARS[profileIndex]
                    : placeholder}
                alt="avatar"
                className={cls('avatar')}
                size={28} />
        </Link>
    );
};
