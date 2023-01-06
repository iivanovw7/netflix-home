/**
 * Module contains `ProfileUnlock` pin field component.
 * @module ~/widgets/ProfileUnlock/PinField
 */
import { observer } from 'mobx-react-lite';
import React, { forwardRef, useCallback } from 'react';

import type { BaseInputProps } from '../../../shared/components';
import { BaseInput } from '../../../shared/components';
import { isNumeric } from '../../../shared/utils';
import { PIN_VALIDATION_ERROR } from '../model/validation';

import cls from './index.module.pcss';

export type PinFieldProps = {
    onKeyDown: BaseInputProps['onKeyDown'];
    onPinNumberChange: (pinNumber: string) => Promise<void> | void;
    onSetPinValidation: (value: string) => void;
    pinNumber: string;
    pinNumberIndex: number;
};

const BasePinField = forwardRef<HTMLInputElement, PinFieldProps>((props, ref) => {
    const { pinNumber, pinNumberIndex, onSetPinValidation, onPinNumberChange, onKeyDown } = props;

    const handleChange = useCallback((eventData) => {
        const { currentTarget: { value } } = eventData;

        if (value !== ' ' && isNumeric(value)) {
            // eslint-disable-next-line no-void
            void onPinNumberChange(String(value));
        }
        else {
            onSetPinValidation(PIN_VALIDATION_ERROR);
        }
    }, [onPinNumberChange, onSetPinValidation]);

    return (
        <BaseInput
            ref={ref}
            value={pinNumber === ''
                ? pinNumber
                : '•'}
            aria-label={`PIN Entry Input ${pinNumberIndex + 1}.`}
            autoFocus={pinNumberIndex === 0}
            className={cls.pinField}
            maxLength={1}
            tab-index={0}
            type="tel"
            onChange={handleChange}
            onKeyDown={onKeyDown}
        />
    );
});

BasePinField.displayName = 'BasePinField';

export const PinField = observer(BasePinField);
