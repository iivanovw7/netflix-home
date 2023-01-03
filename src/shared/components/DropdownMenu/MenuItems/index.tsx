/**
 * Module contains DropdownMenu MenuItems element.
 * @module shared/components/DropdownMenu/MenuItems
 */
import type { useInteractions } from '@floating-ui/react/src/useInteractions';
import classNames from 'classnames';
import type { CSSProperties, MutableRefObject } from 'react';
import React, { useCallback } from 'react';

import { bem } from '../../../utils';
import type { MenuItemProps, TMenuItem } from '../MenuItem';
import { MenuItem } from '../MenuItem';

import './index.pcss';

export type MenuItemsProps = Pick<MenuItemProps, 'onItemClick'> & {
    activeIndex: Nullable<number>;
    allowHover?: boolean;
    className?: string;
    getItemProps: ReturnType<typeof useInteractions>['getItemProps'];
    items?: TMenuItem[];
    listItemsRef: MutableRefObject<Nullable<HTMLButtonElement | HTMLAnchorElement>[]>;
    menuItemClassName?: string;
    setActiveIndex: (index: number) => void;
    style?: CSSProperties;
};

const cls = bem('dropdown-menu-items', { namespace: 'nh-components' });

/**
 * Creates `MenuItems` component.
 * @constructor
 * @name ~/shared/components/DropdownMenu/MenuItems
 * @method
 * @param {object} props - contains component props.
 *
 * @return {ReactElement} React component with children.
 */
export const MenuItems = (props: MenuItemsProps) => {
    const {
        activeIndex,
        allowHover,
        style,
        className,
        items = [],
        menuItemClassName,
        listItemsRef,
        onItemClick,
        getItemProps,
        setActiveIndex
    } = props;

    const getMenuItemProps = useCallback((index: number) => {
        return getItemProps({
            tabIndex: activeIndex === index
                ? 0
                : -1,
            role: 'menuitem',
            className: classNames(
                cls('item'),
                menuItemClassName
            ),
            ref: (node: HTMLButtonElement) => {
                listItemsRef.current[index] = node;
            },
            onPointerEnter: () => {
                if (allowHover) {
                    setActiveIndex(index);
                }
            }
        });
    }, [
        activeIndex,
        allowHover,
        getItemProps,
        listItemsRef,
        menuItemClassName,
        setActiveIndex
    ]);

    return (
        <ul style={style} className={classNames(cls(), className)}>
            {items.map((item, index) => (
                <MenuItem
                    key={item.key ?? index}
                    item={item}
                    onItemClick={onItemClick}
                    {...getMenuItemProps(index)}
                />
            ))}
        </ul>
    );
};
