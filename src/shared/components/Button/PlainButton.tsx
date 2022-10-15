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

export type PlainButtonProps =
    PropsWithChildren<{
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
        text: ReactNode,
        /** @default 'center' */
        textAlign?: 'left' | 'right' | 'center';
        /** @default 'button' */
        type?: 'button' | 'submit' | 'reset';
        /** @default 'primary' */
        variant?: 'primary' | 'secondary' | 'danger';
        onClick?: () => void;
    }>
    & Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'id' | 'name' | 'title' | 'style' | 'onMouseEnter' | 'onMouseLeave'>;

const cls = bem('plain-button');

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
        disabled,
        dataId,
        id,
        name: buttonName,
        layout,
        icon,
        iconPosition,
        text,
        textAlign,
        type,
        title,
        size,
        onClick
    } = props;

    const hasText = Boolean(text) || text === 0;
    const iconElement = customIcon || (icon && <Icon {...icon} />);

    return (
        <button
            ref={ref}
            data-id={dataId}
            className={classNames(
                cls({
                    custom: isValidElement(text),
                    vertical: layout === 'vertical',
                    small: size === 'small',
                    large: size === 'large'
                }),
                className
            )}
            id={id}
            title={title}
            name={buttonName}
            // eslint-disable-next-line react/button-has-type
            type={type}
            disabled={disabled}
            onClick={onClick}>
            {children}
            {hasText && (
                <div
                    className={cls('iconBox', {
                        positionEnd: iconPosition === 'end'
                    })}
                >
                    {text}
                </div>
            )}
            {iconElement && (
                <div
                    className={cls('textBox', {
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

PlainButton.defaultProps = {
    disabled: false,
    iconPosition: 'start',
    layout: 'horizontal',
    size: 'medium',
    textAlign: 'center',
    type: 'button',
    variant: 'primary',
};
