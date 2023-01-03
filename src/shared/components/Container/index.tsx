/**
 * Module contains `Container` component.
 * @module ~/shared/components/Container
 */
import classNames from 'classnames';
import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';

import { bem } from '../../utils';

import './index.pcss';

export type ContainerProps = PropsWithChildren<{
    className?: string;
}>;

const cls = bem('container', { namespace: 'nh-components' });

/**
 * `Container` component.
 * @name ~/shared/components/Container
 * @constructor
 * @method
 * @param {object} props - contains component props.
 * @return {ReactElement} React component with children.
 */
export const Container = (props: ContainerProps): ReactElement => {
    const { className, children } = props;

    return (
        <div className={classNames(cls(), className)}>
            {children}
        </div>
    );
};
