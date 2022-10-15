/**
 * Module contains application header.
 * @module widgets/Header
 */
import bem from 'bem-ts';
import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';

import Logo from '../../../assets/img/logo-v7.png?w=200&png&imagetools';
import { Container, Img } from '../../shared/components';
import { globalStore } from '../../shared/globalStores';
import './index.pcss';

const cls = bem('header');

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
    } = globalStore;

    return (
        <Container className={cls()}>
            <div className={cls('section')}>
                <Img
                    alt="Netflix"
                    className={cls('image')}
                    width="10"
                    src={Logo} />
                {profile && withNavigation && 'Navigation'}
            </div>
            <div className={cls('section')}>
                {children}
            </div>
        </Container>
    );
};

