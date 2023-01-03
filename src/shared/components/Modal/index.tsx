/**
 * Module contains modal component.
 * @module shared/components/Modal
 */

import classNames from 'classnames';
import type { FC, RefObject } from 'react';
import React from 'react';

import { bem } from '../../utils';
import { Button } from '../Button';
import type { IconProps } from '../Icon';

import type { DialogProps } from './Dialog';
import { Dialog } from './Dialog';

import './index.pcss';

export type ModalBaseProps = DialogProps & {
    backdropRef?: RefObject<HTMLDivElement>;
    className?: string;
    closeButtonClassName?: string;
    closeButtonIconProps?: Partial<IconProps>;
    content?: React.ReactNode;
    contentRef?: RefObject<HTMLDivElement>;
    withCloseButton?: boolean;
};

const cls = bem('modal', { namespace: 'nh-components' });

/**
 * Creates Modal component.
 * Controlled globally via context.
 * @see {@link ~/shared/context/ModalManager}
 *
 * @name ~/shared/components/Modal
 * @method
 * @param {object} props - contains component props.
 *
 * @return {ReactNode} React component with children.
 * @constructor
 */
export const Modal: FC<ModalBaseProps> = (props) => {
    const {
        content,
        className,
        closeButtonClassName,
        closeButtonIconProps,
        withCloseButton,
        onRequestClose,
        ...dialogProps
    } = props;

    const closeButton = withCloseButton && (
        <Button
            className={classNames(
                cls('close'),
                closeButtonClassName
            )}
            icon={{
                name: 'cross',
                width: 36,
                height: 36,
                ...closeButtonIconProps
            }}
            color="tertiary"
            fill="none"
            onClick={onRequestClose}
        />
    );

    return (
        <Dialog {...dialogProps} onRequestClose={onRequestClose}>
            <div className={classNames(cls(), className)}>
                {closeButton}
                {content}
            </div>
        </Dialog>
    );
};
