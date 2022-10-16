/**
 * Module contains `Strong` component.
 * @module shared/components/Strong
 */
import classNames from 'classnames';
import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';

import { bem } from '../../utils';

const cls = bem('strong', { namespace: 'nh-components' });

export type StrongProps = PropsWithChildren<{
    text?: string;
    className?: string;
}>;

/**
 * `Strong` component.
 * @method
 * @constructor
 * @param {object} props - contains component props.
 *
 * @return {ReactElement} React component with children.
 */
export const Strong = (props: StrongProps): ReactElement => {
    const { className, text, children } = props;

    return (
        <strong className={classNames(cls(), className)}>
            {text}
            {children}
        </strong>
    );
};
