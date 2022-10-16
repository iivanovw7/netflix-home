/**
 * Module contains modal base element.
 * @module shared/components/Modal/ModalBase
 */

import type { FC, RefObject } from 'react';
import React from 'react';

import type { DialogProps } from './Dialog';
import { Dialog } from './Dialog';

export type ModalBaseProps = DialogProps & {

    className?: string;

    contentRef?: RefObject<HTMLDivElement>;

    backdropRef?: RefObject<HTMLDivElement>;
};

export const ModalBase: FC<ModalBaseProps> = (props) => {
    const { children, className, onRequestClose, ...dialogProps } = props;

    return (
        <Dialog {...dialogProps} onRequestClose={onRequestClose}>
            <span>ModalBase CONTENT</span>
            {children}
        </Dialog>
    );
};
