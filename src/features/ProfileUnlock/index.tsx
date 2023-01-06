/**
 * Module contains `ProfileUnlock` modal component.
 * @module ~/widgets/ProfileUnlock
 */
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

import { H3, P } from '../../shared/components';
import type { ModalProps } from '../../shared/context/ModalManager';
import { useUnmount } from '../../shared/hooks';
import { KeyMap } from '../../shared/utils';

import cls from './index.module.pcss';
import { useUnlockState, withUnlockStore } from './model';
import { PIN_IDS, PIN_LENGTH } from './model/constants';
import { PinField } from './PinField';

export type GetProfileUnlockPropsParams = ProfileUnlockProps;

export type ProfileUnlockProps = {
    lock: string;
    onClose: ModalProps['onClose'];
    onSuccess: () => Promise<void>;
};

const MESSAGES = {
    status: 'Profile Lock is currently on.',
    title: 'Enter your PIN to access this profile.',
    errorTitle: 'Whoops, wrong PIN. Please try again.',
};

/**
 * `ProfileUnlock` modal component.
 * @constructor
 * @name ~/widgets/ProfileUnlock
 * @method
 * @param {ProfileUnlockProps} props - contains component props.
 *
 * @return {ReactElement} React component with children.
 */
const ProfileUnlock = observer((props: ProfileUnlockProps) => {
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
                    await onSuccess();
                }
            }

            if (pinNumberIndex <= PIN_LENGTH - 1) {
                fieldsRef.current.get(pinNumberIndex + 1)?.focus();
            }
        };
    }, [setPinNumber, setPinError, pin, onSubmit, onSuccess]);

    const handleKeyDown = (pinNumberIndex: number) => (eventData) => {
        switch (eventData.key) {
            case KeyMap.Backspace: {
                const prevFieldRef = fieldsRef.current.get(pinNumberIndex - 1);

                eventData.preventDefault();
                setPinNumber(pinNumberIndex, '');

                if (pinNumberIndex > 0 && prevFieldRef) {
                    prevFieldRef.focus();
                    prevFieldRef.select();
                }

                break;
            }
            default: {
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
        <div className={cls.modalContent}>
            <P className={cls.modalStatus} text={MESSAGES.status} size="large" />
            <H3
                className={classNames(
                    cls.modalTitle,
                    {
                        [cls.modalTitleError]: isPinError
                    }
                )}
                text={MESSAGES[isPinError
                    ? 'errorTitle'
                    : 'title']}
            />
            <div className={cls.pinPad}>
                <div
                    className={classNames(
                        cls.pinPadContainer,
                        {
                            [cls.pinPadContainerError]: isPinError
                        }
                    )}
                >
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
            <p className={cls.modalValidation}>
                {pinValidation}
            </p>
        </div>
    );
});

export const getProfileUnlockProps = (params: GetProfileUnlockPropsParams): ModalProps => {
    const { lock, onClose, onSuccess } = params;

    return {
        hoc: withUnlockStore,
        className: cls.modal,
        closeButtonClassName: cls.modalClose,
        closeButtonIconProps: {
            className: cls.modalCloseIcon,
        },
        content: (
            <ProfileUnlock lock={lock} onClose={onClose} onSuccess={onSuccess} />
        ),
        paperClassName: cls.modalPaper,
        width: 'max',
        withCloseButton: true,
    };
};
