/**
 * Module contains `Profile` unlock modal component.
 * @module widgets/Profiles/unlockModal
 */
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

import type { ModalProps } from '../../../shared/components';
import { H3, P } from '../../../shared/components';
import { useUnmount } from '../../../shared/hooks';
import { bem, Key } from '../../../shared/utils';

import { useUnlockState, withUnlockStore } from './model';
import { PIN_IDS, PIN_LENGTH } from './model/constants';
import { PinField } from './PinField';

import './index.pcss';

export type GetUnlockModalPropsParams = UnlockModalContentProps;

export type UnlockModalContentProps = {
    lock: string;
    onClose: ModalProps['onClose'];
    onSuccess: () => void;
};

const cls = bem('unlock-modal', { namespace: 'nh-widgets-profiles' });

const MESSAGES = {
    status: 'Profile Lock is currently on.',
    title: 'Enter your PIN to access this profile.',
    errorTitle: 'Whoops, wrong PIN. Please try again.'
};

/**
 * `Profile` unlock modal component.
 * @constructor
 * @name widgets/Profiles/unlockModal
 * @method
 * @param {object} props - contains component props.
 *
 * @return {ReactElement} React component with children.
 */
const UnlockModalContent = observer((props: UnlockModalContentProps) => {
    const { onSuccess } = props;
    const {
        isPinError,
        pin,
        pinValidation,
        resetFiled,
        setPinError,
        setLock,
        setPinNumber,
        setPinValidation,
        onSubmit,
    } = useUnlockState();

    const fieldsRef = useRef(new Map<number, HTMLInputElement>());
    const setFieldRef = useCallback((pinNumberIndex: number) => {
        return (ref: Nullable<HTMLInputElement>) => {
            if (ref) {
                fieldsRef.current.set(pinNumberIndex, ref);
            }
        };
    }, []);

    const handlePinNumberChange = useCallback((pinNumberIndex: number) => {
        return async (value: string) => {
            setPinNumber(pinNumberIndex, value);
            setPinError(false);

            if (pin.join('').length === PIN_LENGTH) {
                if (await onSubmit()) {
                    onSuccess();
                }
            }

            if (pinNumberIndex <= PIN_LENGTH - 1) {
                fieldsRef.current.get(pinNumberIndex + 1)?.focus();
            }
        };
    }, [setPinNumber, setPinError, pin, onSubmit, onSuccess]);

    const handleKeyDown = (pinNumberIndex: number) => (eventData) => {
        switch (eventData.key) {
            case Key.Backspace: {
                const prevFieldRef = fieldsRef.current.get(pinNumberIndex - 1);

                eventData.preventDefault();
                setPinNumber(pinNumberIndex, '');

                if (pinNumberIndex > 0 && prevFieldRef) {
                    prevFieldRef.focus();
                    prevFieldRef.select();
                }

                break;
            }
        }
    };

    useLayoutEffect(() => {
        setLock(props.lock);
    }, [props.lock, setLock]);

    useEffect(() => {
        if (isPinError) {
            fieldsRef.current.get(0)?.focus();
        }
    }, [isPinError]);

    useUnmount(() => {
        resetFiled();
    });

    return (
        <div className={cls('content')}>
            <P className={cls('status')} text={MESSAGES.status} />
            <H3
                className={cls(
                    'title',
                    { error: isPinError })}
                text={MESSAGES[isPinError
                    ? 'errorTitle'
                    : 'title']} />
            <div className={cls('pinPad')}>
                <div className={cls('pinContainer', { error: isPinError })}>
                    {pin.map((pinNumber: string, pinNumberIndex: number) => (
                        <PinField
                            key={PIN_IDS[pinNumberIndex]}
                            ref={setFieldRef(pinNumberIndex)}
                            pinNumber={pinNumber}
                            pinNumberIndex={pinNumberIndex}
                            onKeyDown={handleKeyDown(pinNumberIndex)}
                            onPinNumberChange={handlePinNumberChange(pinNumberIndex)}
                            onSetPinValidation={setPinValidation}
                        />
                    ))}
                </div>
            </div>
            <p className={cls('validation')}>
                {pinValidation}
            </p>
        </div>
    );
});

export const getUnlockModalProps = (params: GetUnlockModalPropsParams): ModalProps => {
    const { lock, onClose, onSuccess } = params;

    return {
        hoc: withUnlockStore,
        className: cls(),
        closeButtonClassName: cls('close'),
        closeButtonIconProps: {
            className: cls('closeIcon')
        },
        content: (
            <UnlockModalContent lock={lock} onClose={onClose} onSuccess={onSuccess} />
        ),
        paperClassName: cls('paper'),
        width: 'max',
        withCloseButton: true
    };
};
