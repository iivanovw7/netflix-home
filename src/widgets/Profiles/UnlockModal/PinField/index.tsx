/**
 * Module contains `Profile` unlock modal component.
 * @module widgets/Profiles/unlockModal/PinField
 */
import { observer } from 'mobx-react-lite';
import React, { forwardRef, useCallback } from 'react';

import type { BaseInputProps } from '../../../../shared/components';
import { BaseInput } from '../../../../shared/components';
import { bem, isNumeric } from '../../../../shared/utils';
import { PIN_VALIDATION_ERROR } from '../model/validation';

import './index.pcss';

export type PinFieldProps = {
    pinNumber: string;
    pinNumberIndex: number;
    onSetPinValidation: (value: string) => void;
    onPinNumberChange: (pinNumber: string) => Promise<void> | void;
    onKeyDown: BaseInputProps['onKeyDown'];
};

const cls = bem('pin-field', { namespace: 'nh-widgets-profiles' });

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
            className={cls()}
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
