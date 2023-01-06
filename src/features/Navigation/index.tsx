/**
 * Module contains application navigation.
 * @module ~/features/Navigation
 */
import type { ReactElement } from 'react';
import React from 'react';
import { matchPath } from 'react-router-dom';

import { NavLink, DropdownMenu, ItemTypeMap } from '../../shared/components';
import { useBreakpoints } from '../../shared/hooks';
import { getMenuItems } from '../../shared/menu';
import { stores } from '../../shared/stores';

import cls from './index.module.pcss';

/**
 * Navigation component.
 * @method
 * @return {ReactElement} React component with children.
 * @constructor
 */
export const Navigation = (): ReactElement => {
    const items = getMenuItems();
    const { pathname } = stores.router.location;
    const { mdDown, mdUp } = useBreakpoints('md');

    return (
        <div className={cls.nav}>
            {mdDown && (
                <DropdownMenu
                    withArrowFloating
                    withArrowToggle
                    items={[
                        ...items.map(({ to, text, disabled }) => ({
                            type: ItemTypeMap.link,
                            text,
                            disabled,
                            href: to,
                            color: 'secondary',
                            className: cls.menuItemLink,
                            active: !! matchPath(pathname, to)
                        }))
                    ]}
                    menuClassName={cls.menu}
                    menuItemClassName={cls.menuItem}
                    offset={{
                        alignmentAxis: 6,
                        mainAxis: 30
                    }}
                    placement="bottom"
                    toggleClassName={cls.menuToggle}
                >
                    Browse
                </DropdownMenu>
            )}
            {mdUp && items.map(({ to, text, disabled }) => (
                <div key={text} className={cls.navLink}>
                    <NavLink disabled={disabled} text={text} to={to} />
                </div>
            ))}
        </div>
    );
};
