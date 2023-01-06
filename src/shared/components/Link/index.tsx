/**
 * Module contains `link` element.
 * @module ~/shared/components/Link
 */
import classNames from 'classnames';
import type { AnchorHTMLAttributes, MouseEventHandler, PropsWithChildren, ReactNode } from 'react';
import React, { createElement, forwardRef } from 'react';

import type { Color, Position, Size } from '../../types';
import { bem } from '../../utils';
import type { IconProps } from '../Icon';
import { Icon } from '../Icon';
import type { ImgProps } from '../Img';
import { Img } from '../Img';

import './index.pcss';

export type TLinkElement = HTMLButtonElement | HTMLAnchorElement;

export type LinkProps = PropsWithChildren<{
    className?: string;
    /** @default "primary" */
    color?: Color | 'inherit';
    /** @default "false" */
    disabled?: boolean;
    icon?: IconProps,
    /** @default "medium" */
    iconOffset?: Size;
    /** @default "end" */
    iconPosition?: Position;
    image?: ImgProps;
    /** @default "medium" */
    imageOffset?: Size;
    /** @default "end" */
    imagePosition?: Position;
    noWrap?: boolean;
    onClick?: MouseEventHandler<TLinkElement>;
    tag?: 'a' | 'button';
    target?: '_self' | '_blank' | '_parent' | '_top';
    text?: ReactNode;
    textClassName?: string;
    /** @default "never" */
    underline?: 'hover' | 'always' | 'never';
    variant?: string;
}> & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'download' | 'href' | 'title' | 'tabIndex' | 'onKeyDown'>;

const cls = bem('link', { namespace: 'nh-components' });

/**
 * Creates `Link` component.
 * @name ~/shared/components/Link
 * @method
 * @param {object} props - contains component props.
 * @return {ReactElement} React component with children.
 * @constructor
 */
export const Link = forwardRef<TLinkElement, LinkProps>((props, ref) => {
    const {
        children,
        className,
        textClassName,
        tag = 'a',
        color = 'primary',
        disabled = false,
        text,
        icon,
        iconPosition = 'end',
        iconOffset = 'medium',
        image,
        imagePosition = 'end',
        imageOffset = 'medium',
        noWrap,
        underline = 'never',
        ...htmlAttributes
    } = props;

    return createElement(
        tag,
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
                    withImage: Boolean(image),
                    iconStart: iconPosition === 'start',
                    imageStart: imagePosition === 'start'
                }),
                className
            ),
        },
        children,
        text && (
            <span
                className={classNames(
                    cls(
                        'text',
                        { noWrap }
                    ),
                    textClassName
                )}
            >
                {text}
            </span>
        ),
        icon && (
            <Icon
                {...icon}
                className={classNames(
                    cls(
                        'icon',
                        {
                            onlyChild: ! text && ! image,
                            offsetSmall: iconOffset === 'small',
                            offsetLarge: iconOffset === 'large'
                        }
                    ),
                    icon.className
                )}
            />
        ),
        image && (
            <Img
                {...image}
                className={classNames(
                    cls(
                        'image',
                        {
                            onlyChild: ! text && ! icon,
                            offsetSmall: imageOffset === 'small',
                            offsetLarge: imageOffset === 'large'
                        }
                    ),
                    image.className
                )}
            />
        )
    );
});

Link.displayName = 'Link';

