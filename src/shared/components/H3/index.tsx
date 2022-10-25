/**
 * Module contains `H3` component.
 * @module shared/components/H3
 */
import classNames from 'classnames';
import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';

import { bem } from '../../utils';

import './index.pcss';

export type H3Props = PropsWithChildren<{
    text?: string;
    className?: string;
}>;

const cls = bem('header-3', { namespace: 'nh-components' });

/**
 * `H3` component.
 * @method
 * @constructor
 * @param {object} props - contains component props.
 * @return {ReactElement} React component with children.
 */
export const H3 = (props: H3Props): ReactElement => {
    const { className, text, children } = props;

    return (
        <h3 className={classNames(cls(), className)}>
            {text}
            {children}
        </h3>
    );
};
