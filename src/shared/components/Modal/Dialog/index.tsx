/**
 * Module contains Dialog element.
 * @module shared/components/Modal/Dialog
 */
import classNames from 'classnames';
import type { AnimationEventHandler, FC, PropsWithChildren } from 'react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useMountedState, useFirstMountState, useOnClickOutside } from '../../../hooks';
import type { Size } from '../../../types';
import { bem, KeyMap, offEvent, EventMap, onEvent } from '../../../utils';
import { Portal } from '../../Portal';

import './index.pcss';

export type DialogProps = PropsWithChildren<{
    backdropClassName?: string;
    backdropRef?: React.RefObject<HTMLDivElement>;
    disableBackdropClick?: boolean;
    disableEscapeKeyDown?: boolean;
    onRequestClose: () => void;
    open: boolean;
    outerScroll?: boolean;
    paperClassName?: string;
    transitionWidth?: boolean;
    /** @default "medium" */
    width?: ExtractType<Size, 'medium' | 'large'> | 'auto' | 'max';
}>;

export type AnimationHandler = AnimationEventHandler<HTMLDivElement>;

const cls = bem('modal-dialog', { namespace: 'nh-components' });

const FADE_OUT = 'fade-out';
const { KEYDOWN } = EventMap;

/**
 * Creates Dialog component.
 * @name ~/shared/components/Modal/Dialog
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

    const isFirstMount = useFirstMountState();
    const isMounted = useMountedState();
    const paperRef = useRef<HTMLDivElement>(null);

    const [isOpen, setOpen] = useState<boolean>(modalOpen);
    const [isClosing, setClosing] = useState<boolean>(false);

    const handleBackdropClick = useCallback(() => {
        if (disableBackdropClick) {
            return;
        }

        onRequestClose();
    }, [disableBackdropClick, onRequestClose]);

    const handleKeyDown = useCallback((eventData) => {
        if (eventData.key !== KeyMap.Escape || disableEscapeKeyDown) {
            return;
        }

        eventData.stopPropagation();
        onRequestClose();
    }, [disableEscapeKeyDown, onRequestClose]);

    const handleAnimationEnd: AnimationHandler = useCallback(({ animationName }) => {
        if (animationName === FADE_OUT) {
            setOpen(false);
            setClosing(false);
        }
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
    useEffect(() => {
        if (isFirstMount) {
            onEvent(window, KEYDOWN, handleKeyDown);
        }

        return () => {
            offEvent(window, KEYDOWN, handleKeyDown);
        };
    }, [handleKeyDown, isFirstMount]);

    useOnClickOutside(handleBackdropClick, paperRef);

    if (! isOpen) {
        return null;
    }

    return (
        <Portal>
            <div
                ref={backdropRef}
                className={classNames(
                    cls('backdrop', { isClosing }),
                    backdropClassName
                )}
                onAnimationEnd={handleAnimationEnd}
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
                >
                    {children}
                </div>
            </div>
        </Portal>
    );
};

