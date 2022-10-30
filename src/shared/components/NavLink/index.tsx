import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

import { bem } from '../../utils';

import './index.pcss';

export type NavLinkProps = {
    text: string;
    to: string;
    replace?: boolean;
    disabled?: boolean;
    className?: string;
};

const cls = bem('nav-link', { namespace: 'nh-components' });

/**
 * Creates `NavLink` component.
 * @constructor
 * @name shared/components/NavLink
 * @method
 * @param {object} props - contains component props.
 * @param {ForwardedRef<NavLink>} ref - contains link `ref`.
 *
 * @return {ReactElement} React component with children.
 */
export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>((props, ref) => {
    const {
        to,
        replace,
        disabled,
        text,
        className
    } = props;

    return (
        <RouterLink
            ref={ref}
            className={classNames(cls({ disabled }), className)}
            replace={replace}
            to={to}>
            {({ isActive }) => (
                <span className={cls('text', { active: isActive })}>
                    {text}
                </span>
            )}
        </RouterLink>
    );
});

NavLink.displayName = 'NavLink';
