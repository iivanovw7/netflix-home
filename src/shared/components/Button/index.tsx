/**
 * Module contains button component.
 * @module shared/components/Button
 */
import classNames from 'classnames';
import React, { forwardRef } from 'react';

import type { Fill, Color } from '../../types';
import { bem } from '../../utils';

import type { PlainButtonProps } from './PlainButton';
import { PlainButton } from './PlainButton';

import './index.pcss';

const cls = bem('button', { namespace: 'nh-components' });

export type ButtonProps = PlainButtonProps & {
    className?: string;
    /** @default 'primary' */
    color?: Color | 'danger';
    /** @default 'full' */
    fill?: Fill;
    fluid?: boolean;
};

/**
 * Creates `Button` component.
 * @constructor
 * @name ~/shared/components/Button
 * @method
 * @param {object} props - contains component props.
 * @param {ForwardedRef<HTMLButtonElement>} ref - contains button `ref`.
 *
 * @return {ReactElement} React component with children.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
        className,
        color = 'primary',
        fill = 'full',
        fluid = false,
        ...plainButtonProps
    } = props;

    return (
        <PlainButton
            ref={ref}
            className={classNames(
                cls({
                    fluid,
                    outlined: fill === 'outlined',
                    fillNone: fill === 'none',
                    secondary: color === 'secondary',
                    tertiary: color === 'tertiary'
                }),
                className
            )}
            {...plainButtonProps}
        />
    );
});

Button.displayName = 'Button';

