/**
 * Module contains `H2` component.
 * @module ~/shared/components/H2
 */
import classNames from 'classnames';
import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';

import './index.pcss';
import { bem } from '../../utils';

export type H2Props = PropsWithChildren<{
    className?: string;
    text?: string;
}>;

const cls = bem('header-2', { namespace: 'nh-components' });

/**
 * `H2` component.
 * @name ~/shared/components/H2
 * @method
 * @constructor
 * @param {object} props - contains component props.
 * @return {ReactElement} React component with children.
 */
export const H2 = (props: H2Props): ReactElement => {
    const { className, text, children } = props;

    return (
        <h2 className={classNames(cls(), className)}>
            {text}
            {children}
        </h2>
    );
};
