/**
 * Module contains MenuItem element.
 * @module shared/components/DropdownMenu/MenuItem
 */
import classNames from 'classnames';
import type {
    ReactElement,
    CSSProperties,
    ReactNode,
    MouseEvent as ReactMouseEvent,
    ChangeEvent as ReactChangeEvent,
    KeyboardEvent as ReactKeyboardEvent
} from 'react';
import React, { forwardRef } from 'react';

import type { Size } from '../../../types';
import type { CustomValueEvent } from '../../../utils';
import { bem, KeyMap, setEventValue } from '../../../utils';
import type { PlainButtonProps } from '../../Button/PlainButton';
import { PlainButton } from '../../Button/PlainButton';
import type { LinkProps } from '../../Link';
import { Link } from '../../Link';
import { ItemTypeMap } from '../model/constants';
import './index.pcss';

export type MenuItemType = 'button' | 'link' | 'divider';

export type MenuItemBase<Type extends MenuItemType> = {
    active?: boolean;
    className?: string;
    disabled?: boolean;
    key?: React.Key;
    onClick?: (event: MenuChangeEvent) => void;
    style?: CSSProperties;
    text?: ReactNode;
    type: Type;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any;
};

export type MenuChangeEvent = CustomValueEvent<TMenuItem['value']>;

// eslint-disable-next-line max-len
export type MenuItemButton = MenuItemBase<'button'> & Pick<PlainButtonProps, 'text' | 'customIcon' | 'icon' | 'onKeyDown'>;
export type MenuItemLink = MenuItemBase<'link'> & Pick<LinkProps, 'icon' | 'tag' | 'underline' | 'onKeyDown'>;
export type MenuItemDivider = Omit<MenuItemBase<'divider'>, 'onClick' | 'disabled' | 'active' | 'text'>;
export type TMenuItem = MenuItemButton | MenuItemLink | MenuItemDivider;

export type MenuItemProps = {
    className?: string;
    item: TMenuItem;
    itemSize?: Size;
    onItemClick?: (eventData: MenuChangeEvent) => void;
};

const cls = bem('dropdown-menu-item', { namespace: 'nh-components' });

/**
 * Creates `MenuItems` component.
 * @constructor
 * @name ~/shared/components/DropdownMenu/MenuItem
 * @method
 * @param {object} props - contains component props.
 * @param {ForwardedRef<HTMLButtonElement>} ref - contains button `ref`.
 *
 * @return {ReactElement} React component with children.
 */
export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>((props, ref): ReactElement => {
    const {
        item,
        onItemClick,
        itemSize = 'medium',
        className,
        ...restProp
    } = props;

    if (item.type === ItemTypeMap.divider) {
        return <li className={cls('divider')} />;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { key: itemKey, active, type, style, text, ...restItemProps } = item;

    const handleClick = (baseEvent: ReactMouseEvent<HTMLElement> | ReactChangeEvent<HTMLElement>) => {
        const eventData = setEventValue(baseEvent, item.value);

        (item).onClick?.(eventData);
        onItemClick?.(eventData);
    };

    const handleKeyDown = (baseEvent: ReactKeyboardEvent<HTMLElement>) => {
        const eventData = setEventValue(baseEvent, item.value);

        switch (baseEvent.key) {
            case KeyMap.Enter: {
                (item).onClick?.(eventData);
                onItemClick?.(eventData);
                break;
            }
            default: {
                break;
            }
        }
    };

    const baseProps: PlainButtonProps | LinkProps = {
        ...restItemProps,
        style,
        text,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        className: classNames(
            cls('item', {
                active,
                link: type === ItemTypeMap.link
            }),
            restItemProps.className
        ),
    };

    return (
        <li className={classNames(cls(), className)}>
            {(() => {
                switch (type) {
                    case 'link': {
                        return (
                            <Link
                                ref={ref}
                                color="inherit"
                                iconPosition="start"
                                {...restProp}
                                {...baseProps as LinkProps}
                            />
                        );
                    }
                    default: {
                        return (
                            <PlainButton
                                ref={ref}
                                size={itemSize}
                                style={style}
                                textAlign="left"
                                {...restProp}
                                {...baseProps}
                            />
                        );
                    }
                }
            })()}
        </li>
    );
});

MenuItem.displayName = 'MenuItem';
