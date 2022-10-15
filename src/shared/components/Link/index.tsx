/**
 * Module contains `link` element.
 * @module shared/components/Link
 */
import classNames from 'classnames';
import type { AnchorHTMLAttributes, MouseEventHandler, PropsWithChildren } from 'react';
import React, { createElement, forwardRef } from 'react';

import { bem } from '../../utils';
import type { IconProps } from '../Icon';
import { Icon } from '../Icon';

import './index.pcss';

export type LinkProps = PropsWithChildren<{
    /** @default "primary" */
    color?: 'primary' | 'secondary' | 'tertiary' | 'inherit';
    className?: string;
    textClassName?: string;
    /** @default "false" */
    disabled?: boolean;
    tag?: 'a' | 'button';
    icon?: IconProps,
    /** @default "medium" */
    iconOffset?: 'medium' | 'large';
    /** @default "end" */
    iconPosition?: 'start' | 'end';
    noHoverAccent?: boolean;
    noWrap?: boolean;
    /** @default "_self" */
    target?: '_self' | '_blank' | '_parent' | '_top';
    text?: string;
    /** @default "never" */
    underline?: 'hover' | 'always' | 'never';
    variant?: string;
    onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}> & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'download' | 'href' | 'title'>;

const cls = bem('link');

/**
 * Creates Link component.
 * @name shared/components/Link
 * @method
 * @param {object} props - contains component props.
 *
 * @return {ReactElement} React component with children.
 * @constructor
 */
export const Link = forwardRef<HTMLButtonElement | HTMLAnchorElement, LinkProps>((props, ref) => {
    const {
        children,
        className,
        textClassName,
        tag,
        color,
        disabled,
        text,
        icon,
        iconPosition,
        iconOffset,
        noHoverAccent,
        noWrap,
        underline,
        ...htmlAttributes
    } = props;

    return createElement(
        tag || htmlAttributes.href
            ? 'a'
            : 'button',
        {
            ...htmlAttributes,
            ref,
            className: classNames(
                cls({
                    disabled,
                    colorInherit: color === 'inherit',
                    colorSecondary: color === 'secondary',
                    colorTertiary: color === 'tertiary',
                    underline: underline === 'always',
                    underlineHover: underline === 'hover',
                    withIcon: Boolean(icon),
                    iconStart: iconPosition === 'start',
                    noHoverAccent,
                }),
                className
            ),
        },
        children,
        text && (
            <span className={classNames(
                cls(
                    'text',
                    { noWrap }
                ),
                textClassName
            )}>
                {text}
            </span>
        ),
        icon && (
            <Icon
                {...icon}
                className={classNames(
                    cls(
                        'icon',
                        { onlyChild: ! text, offsetLarge: iconOffset === 'large' }
                    ),
                    icon.className
                )}
            />
        )
    );
});

Link.displayName = 'Link';

Link.defaultProps = {
    color: 'primary',
    disabled: false,
    iconOffset: 'medium',
    iconPosition: 'end',
    target: '_self',
    underline: 'never',
};

