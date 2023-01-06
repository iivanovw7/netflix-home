/**
 * Module contains DropdownMenu element.
 * @module shared/components/DropdownMenu
 */
import type { Placement, Strategy } from '@floating-ui/react';
import {
    arrow,
    autoUpdate,
    flip,
    FloatingFocusManager,
    FloatingNode,
    FloatingPortal,
    offset,
    safePolygon,
    shift,
    useClick,
    useDismiss,
    useFloating,
    useFloatingNodeId,
    useFloatingTree,
    useHover,
    useInteractions,
    useListNavigation,
    useRole,
} from '@floating-ui/react';
import classNames from 'classnames';
import type { CSSProperties, PropsWithChildren, RefObject } from 'react';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

import { bem, capitalizeFirstLetter, EventMap, KeyMap, mergeRefs, offEvent, onEvent } from '../../utils';
import { Button } from '../Button';

import type { TMenuItem } from './MenuItem';
import { MenuItems } from './MenuItems';
import { ARROW_SIZE, StaticSidesMap } from './model/constants';

import './index.pcss';

export type DropdownMenuRef = {
    close: () => void;
    elementRef: RefObject<HTMLDivElement>;
    isOpen: boolean;
    open: () => void;
};

export type DropdownMenuProps = PropsWithChildren<{
    items: TMenuItem[];
    menuClassName?: string;
    menuItemClassName?: string;
    offset?: {
        alignmentAxis?: Pixels;
        mainAxis?: Pixels;
    },
    onClick?: () => void;
    onClose?: () => void;
    open?: boolean;
    /** @default 'bottom' */
    placement?: Placement;
    /** @default 'absolute' */
    strategy?: Strategy;
    toggleClassName?: string;
    withArrowFloating?: boolean;
    withArrowToggle?: boolean;
}>;

const cls = bem('dropdown-menu', { namespace: 'nh-components' });

const {
    POINTERMOVE,
    KEYDOWN
} = EventMap;

const CLOSE_DELAY: Milliseconds = 500;

/**
 * Creates `DropdownMenu` component.
 * @constructor
 * @name ~/shared/components/DropdownMenu
 * @method
 * @param {object} props - contains component props.
 * @param {ForwardedRef<DropdownMenuProps>} ref - contains button `ref`.
 *
 * @return {ReactElement} React component with children.
 */
export const DropdownMenu = forwardRef<DropdownMenuRef, DropdownMenuProps>((props, forwardedRef) => {
    const {
        toggleClassName,
        children,
        items,
        menuClassName,
        menuItemClassName,
        offset: offsetParams,
        onClick,
        onClose,
        open: isDropdownOpen,
        placement,
        strategy,
        withArrowFloating,
        withArrowToggle
    } = props;

    const [isOpen, setIsOpen] = useState(isDropdownOpen ?? false);
    const [activeIndex, setActiveIndex] = useState<Nullable<number>>(null);
    const [allowHover, setAllowHover] = useState(true);

    const dropdownRef = useRef<Nullable<HTMLDivElement>>(null);
    const listItemsRef = useRef<Array<Nullable<HTMLButtonElement | HTMLAnchorElement>>>([]);
    const arrowRef = useRef<Nullable<HTMLDivElement>>(null);

    const tree = useFloatingTree();
    const nodeId = useFloatingNodeId();

    const {
        x,
        y,
        reference,
        floating,
        strategy: menuStrategy,
        context,
        middlewareData: {
            arrow: {
                x: arrowX = 0,
                y: arrowY = 0
            } = {}
        },
    } = useFloating<HTMLButtonElement>({
        open: isOpen,
        nodeId,
        strategy,
        onOpenChange: setIsOpen,
        placement,
        middleware: [
            offset(offsetParams),
            flip(),
            shift(),
            withArrowFloating && arrow({
                element: arrowRef
            })
        ],
        whileElementsMounted: autoUpdate
    });

    const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
        useHover(context, {
            handleClose: safePolygon({ restMs: 25 }),
            delay: { open: 75, close: CLOSE_DELAY }
        }),
        useClick(context, {
            toggle: ! allowHover,
            event: 'mousedown',
            ignoreMouse: false
        }),
        useRole(context, {
            role: 'menu'
        }),
        useDismiss(context),
        useListNavigation(context, {
            activeIndex,
            listRef: listItemsRef,
            onNavigate: setActiveIndex
        }),
    ]);

    const handleTreeClick = useCallback(() => {
        setIsOpen(false);
        onClose?.();
    }, [onClose]);

    const handlePointerMove = useCallback(({ pointerType }: PointerEvent) => {
        if (pointerType === 'mouse') {
            setAllowHover(true);
        }
    }, []);

    const handleKeyDown = useCallback(() => {
        setAllowHover(false);
    }, []);

    useImperativeHandle(forwardedRef, () => ({
        open: () => setIsOpen(true),
        close: handleTreeClick,
        elementRef: dropdownRef,
        isOpen
    }));

    useEffect(() => {
        tree?.events.on('click', handleTreeClick);

        return () => {
            tree?.events.off('click', handleTreeClick);
        };
    }, [handleTreeClick, tree]);

    useEffect(() => {
        onEvent(window, KEYDOWN, handleKeyDown, true);
        onEvent(window, POINTERMOVE, handlePointerMove as unknown as EventListener, {
            once: true,
            capture: true
        });

        return () => {
            offEvent(window, KEYDOWN, handleKeyDown, true);
            offEvent(window, POINTERMOVE, handlePointerMove as unknown as EventListener, {
                capture: true
            });
        };
    }, [allowHover, handleKeyDown, handlePointerMove]);

    const side = placement?.split('-')[0];
    const staticSide = StaticSidesMap[side as StaticSidesMap];

    const floatingStyle: CSSProperties = {
        ...(Boolean(staticSide) && {
            [`padding${capitalizeFirstLetter(staticSide)}`]: withArrowFloating
                ? ARROW_SIZE
                : 0
        })
    };

    const arrowStyle: CSSProperties = {
        left: arrowX || 0,
        top: arrowY || 0,
        right: 0,
        bottom: 0,
        width: ARROW_SIZE,
        height: ARROW_SIZE,
        [staticSide]: `-${ARROW_SIZE / 2}px`,
    };

    const contentStyle: CSSProperties = {
        position: menuStrategy,
        top: y ?? 0,
        left: x ?? 0,
    };

    const referenceRef = useMemo(
        () => mergeRefs([reference, dropdownRef]),
        [reference, dropdownRef]
    );

    return (
        <FloatingNode id={nodeId}>
            <Button
                ref={referenceRef}
                color="secondary"
                fill="none"
                size="small"
                {...getReferenceProps({
                    className: classNames(cls('toggle'), toggleClassName),
                    onClick: (eventData) => {
                        eventData.stopPropagation();
                        onClick?.();
                    },
                })}
            >
                {children}
                {Boolean(withArrowToggle) && (
                    <span className={cls('arrowToggle', { isOpen })} />
                )}
            </Button>
            <FloatingPortal>
                {Boolean(isOpen) && (
                    <FloatingFocusManager
                        modal
                        returnFocus
                        visuallyHiddenDismiss
                        context={context}
                        initialFocus={0}
                    >
                        <div
                            ref={floating}
                            className={cls('floating')}
                            style={contentStyle}
                            {...getFloatingProps({
                                onKeyDown: (eventData) => {
                                    if (eventData.key === KeyMap.Tab) {
                                        setIsOpen(false);
                                    }
                                }
                            })}
                        >
                            <MenuItems
                                style={floatingStyle}
                                items={items}
                                activeIndex={activeIndex}
                                className={classNames(
                                    cls('menu'),
                                    menuClassName
                                )}
                                menuItemClassName={menuItemClassName}
                                getItemProps={getItemProps}
                                listItemsRef={listItemsRef}
                                allowHover={allowHover}
                                setActiveIndex={setActiveIndex}
                            />
                            {Boolean(withArrowFloating) && (
                                <span
                                    ref={arrowRef}
                                    className={cls('arrowFloating')}
                                    style={arrowStyle}
                                />
                            )}
                        </div>
                    </FloatingFocusManager>
                )}
            </FloatingPortal>
        </FloatingNode>
    );
});

DropdownMenu.displayName = 'DropdownMenu';
