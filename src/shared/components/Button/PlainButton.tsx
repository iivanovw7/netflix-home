/**
 * Module contains plain button component.
 * @module shared/components/PlainButton
 */
import classNames from 'classnames';
import type { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import React, { forwardRef, isValidElement } from 'react';

import { bem } from '../../utils';
import type { IconProps } from '../Icon';
import { Icon } from '../Icon';

import './PlainButton.pcss';

export type ButtonAttributeProps = Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'id' | 'name' | 'title' | 'style' | 'onMouseEnter' | 'onMouseLeave'>;

export type PlainButtonProps = ButtonAttributeProps & PropsWithChildren<{
    customIcon?: ReactNode;
    className?: string;
    dataId?: string | number;
    disabled?: boolean;
    icon?: IconProps;
    /** @default 'start' */
    iconPosition?: 'start' | 'end';
    /** @default 'horizontal' */
    layout?: 'horizontal' | 'vertical';
    /** @default 'medium' */
    size?: 'small' | 'medium' | 'large';
    text?: ReactNode,
    /** @default 'center' */
    textAlign?: 'left' | 'right' | 'center';
    /** @default 'button' */
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
}>;

const cls = bem('plain-button', { namespace: 'nh-components' });

/**
 * Creates `PlainButton` component.
 * @constructor
 * @name shared/components/PlainButton
 * @method
 * @param {object} props - contains component props.
 * @param {ForwardedRef<HTMLButtonElement>} ref - contains button `ref`.
 *
 * @return {ReactElement} React component with children.
 */
export const PlainButton = forwardRef<HTMLButtonElement, PlainButtonProps>((props, ref) => {
    const {
        className,
        children,
        customIcon,
        disabled = false,
        dataId,
        id,
        name: buttonName,
        layout = 'horizontal',
        icon,
        iconPosition = 'start',
        text,
        textAlign = 'center',
        type = 'button',
        title,
        size = 'medium',
        onClick
    } = props;

    const hasText = Boolean(text) || text === 0;
    const iconElement = customIcon || (icon && <Icon {...icon} />);

    return (
        <button
            ref={ref}
            className={classNames(
                cls({
                    custom: isValidElement(text),
                    vertical: layout === 'vertical',
                    small: size === 'small',
                    large: size === 'large'
                }),
                className
            )}
            data-id={dataId}
            disabled={disabled}
            id={id}
            name={buttonName}
            title={title}
            /* eslint-disable-next-line react/button-has-type */
            type={type}
            onClick={onClick}>
            {children}
            {hasText && (
                <div
                    className={cls('textBox', {
                        positionEnd: iconPosition === 'end'
                    })}
                >
                    {text}
                </div>
            )}
            {iconElement && (
                <div
                    className={cls('iconBox', {
                        left: textAlign === 'left',
                        right: textAlign === 'right'
                    })}
                >
                    {iconElement}
                </div>
            )}
        </button>
    );
});

PlainButton.displayName = 'PlainButton';
