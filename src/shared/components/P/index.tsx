/**
 * Module contains `P` component.
 * @module ~/shared/components/P
 */
import classNames from 'classnames';
import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';

import type { Size } from '../../types';
import { bem } from '../../utils';

import './index.pcss';

export type PProps = PropsWithChildren<{
    className?: string;
    /** @default 'medium' */
    size?: Size;
    text?: string;
}>;

const cls = bem('paragraph', { namespace: 'nh-components' });

/**
 * Creates `P` component.
 * @name ~/shared/components/P
 * @method
 * @param {object} props - contains component props.
 * @return {ReactElement} React component with children.
 * @constructor
 */
export const P = (props: PProps): ReactElement => {
    const { className, text, children, size = 'medium' } = props;

    return (
        <p
            className={classNames(
                cls(
                    {
                        small: size === 'small',
                        large: size === 'large'
                    }
                ),
                className
            )}
        >
            {text}
            {children}
        </p>
    );
};
