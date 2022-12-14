/**
 * Module contains Dialog element.
 * @module shared/components/Modal/Dialog
 */
import classNames from 'classnames';
import type {
    AnimationEventHandler,
    FC,
    KeyboardEventHandler,
    MouseEventHandler,
    PropsWithChildren
} from 'react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useMountedState } from '../../hooks';
import type { Size } from '../../types';
import { bem, Key } from '../../utils';
import { Portal } from '../Portal';

import './Dialog.pcss';

export type DialogProps = PropsWithChildren<{
    open: boolean;
    onRequestClose: () => void;
    backdropClassName?: string;
    paperClassName?: string;
    /** @default "medium" */
    width?: ExtractType<Size, 'medium' | 'large'> | 'auto' | 'max';
    transitionWidth?: boolean;
    outerScroll?: boolean;
    disableBackdropClick?: boolean;
    disableEscapeKeyDown?: boolean;
    backdropRef?: React.RefObject<HTMLDivElement>;
}>;

export type ClickHandler = MouseEventHandler<HTMLDivElement>;
export type KeyDownHandler = KeyboardEventHandler<HTMLDivElement>;
export type AnimationHandler = AnimationEventHandler<HTMLDivElement>;

const cls = bem('dialog', { namespace: 'nh-components' });

/**
 * Creates Dialog component.
 * @name shared/components/Modal/Dialog
 * @method
 * @param {object} props - contains component props.
 *
 * @return {ReactNode} React component with children.
 * @constructor
 */
export const Dialog: FC<DialogProps> = (props) => {
    const {
        children,
        open: modalOpen,
        onRequestClose,
        outerScroll,
        transitionWidth,
        width,
        disableBackdropClick,
        disableEscapeKeyDown,
        backdropClassName,
        paperClassName,
        backdropRef,
    } = props;

    const isMounted = useMountedState();
    const paperRef = useRef<HTMLDivElement>(null);

    const [isOpen, setOpen] = useState<boolean>(modalOpen);
    const [isClosing, setClosing] = useState<boolean>(false);

    const handleBackdropClick: ClickHandler = useCallback(() => {
        if (disableBackdropClick) return;

        onRequestClose();
    }, [disableBackdropClick, onRequestClose]);

    const handleKeyDown: KeyDownHandler = useCallback((e) => {
        if (e.key !== Key.Escape || disableEscapeKeyDown) return;

        e.stopPropagation();
        onRequestClose();
    }, [disableEscapeKeyDown, onRequestClose]);

    const handleAnimationEnd: AnimationHandler = useCallback(({ animationName }) => {
        if (animationName === 'fade-out') {
            setOpen(false);
            setClosing(false);
        }
    }, []);

    const handleClick: ClickHandler = useCallback((eventData) => {
        eventData.stopPropagation();
    }, []);

    useEffect(() => {
        if (isMounted() && ! modalOpen) {
            setClosing(true);
        }
    }, [isMounted, modalOpen]);

    useEffect(() => {
        const paper = paperRef.current;

        if (isOpen && paper && ! paper.contains(document.activeElement)) {
            paper.focus();
        }
    }, [isOpen]);

    if (! isOpen) return null;

    return (
        <Portal>
            <div
                ref={backdropRef}
                className={classNames(
                    cls('backdrop', { isClosing }),
                    backdropClassName
                )}
                onAnimationEnd={handleAnimationEnd}
                onClick={handleBackdropClick}
                onKeyDown={handleKeyDown}
            >
                <div
                    ref={paperRef}
                    className={classNames(
                        cls('paper', {
                            widthLarge: width === 'large',
                            widthAuto: width === 'auto',
                            widthMax: width === 'max',
                            outerScroll,
                            transitionWidth,
                        }),
                        paperClassName
                    )}
                    tabIndex={-1}
                    onClick={handleClick}
                >
                    {children}
                </div>
            </div>
        </Portal>
    );
};

