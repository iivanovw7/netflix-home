/**
 * Module contains application header.
 * @module ~/widgets/Header
 */
import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';
import React from 'react';

import Logo from '../../../assets/img/logo-v7.png?w=200&png&imagetools';
import { Navigation, Notifications, Search } from '../../features';
import { Menu } from '../../features/Menu';
import { Container, Img } from '../../shared/components';
import { stores } from '../../shared/stores';

import cls from './index.module.pcss';

export type HeaderProps = {
    withNavigation?: boolean;
};

/**
 * Header component.
 * @method
 * @name ~/widgets/Header
 * @param {object} props - contains component props.
 * @return {ReactElement} React component with children.
 * @constructor
 */
export const Header = observer((props: HeaderProps): ReactElement => {
    const { withNavigation } = props;
    const {
        profile: { profile },
    } = stores;

    return (
        <Container className={cls.header}>
            <div className={cls.headerSection}>
                <Img
                    alt="Netflix"
                    className={cls.headerLogo}
                    imageClassName={cls.headerLogoImage}
                    src={Logo}
                />
                {!! profile && withNavigation && <Navigation />}
            </div>
            <div className={cls.headerSection}>
                <Search />
                <Notifications />
                <Menu />
            </div>
        </Container>
    );
});
