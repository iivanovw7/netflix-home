/**
 * Module contains global modal manager.
 * @module shared/components/Modal/ModalManager
 */
import { identity } from 'ramda';
import type { FC } from 'react';
import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef
} from 'react';
// eslint-disable-next-line camelcase
import { unstable_batchedUpdates } from 'react-dom';

import { useIncrementalKey, useStateRef } from '../../hooks';

import type { ModalBaseProps } from './ModalBase';
import { ModalBase } from './ModalBase';

export type ModalProps = Omit<ModalBaseProps, 'open' | 'contentRef' | 'onRequestClose'> & {
    hoc?: (Modal: typeof ModalBase) => typeof ModalBase;
    onClose?: () => void;
};

export type ModalManagerRef = {
    open: (props: ModalProps) => void;
    setProps: (arg: Partial<ModalProps> | ((currentData: ModalProps) => ModalProps)) => void;
    close: () => void;
    contentRef: NonNullable<ModalBaseProps['contentRef']>;
    backdropRef: NonNullable<ModalBaseProps['backdropRef']>;
};

/**
 * Creates ModalManager component.
 * @name shared/components/Modal/ModalManager
 * @method
 * @param {object} props - contains component props.
 *
 * @return {ReactNode} React component with children.
 * @constructor
 */
export const ModalManager = forwardRef<ModalManagerRef>((_, ref) => {
    const contentRef = useRef<Nullable<HTMLDivElement>>(null);
    const backdropRef = useRef<Nullable<HTMLDivElement>>(null);
    const [isOpen, setOpen, isOpenRef] = useStateRef(false);
    const [ { hoc = identity, ...baseProps }, setProps, propsRef] = useStateRef<ModalProps>({});
    const [modalKey, updateModalKey] = useIncrementalKey();

    const openModal: ModalManagerRef['open'] = useCallback((props) => {
        unstable_batchedUpdates(() => {
            setProps(props);
            updateModalKey();
            setOpen(true);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const closeModal = useCallback(() => {
        if (isOpenRef.current) {
            setOpen(false);
            backdropRef.current = null;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateProps: ModalManagerRef['setProps'] = useCallback((arg) => {
        const currentProps = propsRef.current;

        const props = typeof arg === 'function'
            ? arg(currentProps)
            : { ...currentProps, ...arg };

        setProps(props);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({
        open: openModal,
        setProps: updateProps,
        close: closeModal,
        contentRef,
        backdropRef,
    }));

    useEffect(() => {
        if (! isOpen) {
            propsRef.current.onClose?.();
        }
    }, [isOpen, propsRef]);

    const Modal = useMemo<FC<ModalBaseProps>>(() => hoc(ModalBase), [hoc]);

    return (
        <Modal
            {...baseProps}
            key={modalKey}
            backdropRef={backdropRef}
            contentRef={contentRef}
            open={isOpen}
            onRequestClose={closeModal}
        />
    );
});

ModalManager.displayName = 'ModalManager';
