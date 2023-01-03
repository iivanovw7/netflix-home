/**
 * Module contains `H1` component.
 * @module ~/shared/components/H1
 */
import classNames from 'classnames';
import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';

import './index.pcss';
import { bem } from '../../utils';

export type H1Props = PropsWithChildren<{
    className?: string;
    text?: string;
}>;

const cls = bem('header-1', { namespace: 'nh-components' });

/**
 * `H1` component.
 * @name ~/shared/components/H1
 * @method
 * @constructor
 * @param {object} props - contains component props.
 * @return {ReactElement} React component with children.
 */
export const H1 = (props: H1Props): ReactElement => {
    const { className, text, children } = props;

    return (
        <h1 className={classNames(cls(), className)}>
            {text}
            {children}
        </h1>
    );
};
