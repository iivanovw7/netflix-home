/**
 * Module contains application header.
 * @module widgets/Header
 */
import bem from 'bem-ts';
import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';

import Logo from '../../../assets/img/logo-v7.png?w=200&png&imagetools';
import { Container, Img } from '../../shared/components';
import { stores } from '../../shared/stores';

import { Menu } from './Menu';
import { Navigation } from './Navigation';
import { Notifications } from './Notifications';
import { Search } from './Search';

import './index.pcss';

const cls = {
    header: bem('header', { namespace: 'nh-widgets' }),
    logo: bem('header-logo', { namespace: 'nh-widgets' })
};

export type HeaderProps = PropsWithChildren<{
    withNavigation?: boolean;
}>;

/**
 * Header component.
 * @method
 * @param {object} props - contains component props.
 * @return {ReactElement} React component with children.
 * @constructor
 */
export const Header = (props: HeaderProps): ReactElement => {
    const { children, withNavigation } = props;
    const {
        profile: { profile },
    } = stores;

    return (
        <Container className={cls.header()}>
            <div className={cls.header('section')}>
                <Img
                    alt="Netflix"
                    className={cls.logo()}
                    imageClassName={cls.logo('image')}
                    src={Logo} />
                {profile && withNavigation && <Navigation />}
            </div>
            <div className={cls.header('section')}>
                {children}
                <Search />
                <Notifications />
                <Menu />
            </div>
        </Container>
    );
};

