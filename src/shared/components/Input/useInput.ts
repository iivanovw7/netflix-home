/**
 * Module contains useInput hook.
 * @module ~/shared/components/Input/useInput
 */
import type { ChangeEvent } from 'react';
import { useState, useCallback } from 'react';

export type TOnChange = (eventData: ChangeEvent<HTMLInputElement>) => void;

export type UseInput<Value> = {
    onChange: TOnChange;
    value: Value;
};

export const useInput = <Value>(initialValue: Value, onChange?: TOnChange): UseInput<Value> => {
    const [value, setValue] = useState<Value>(initialValue);

    const handleChange: UseInput<Value>['onChange'] = useCallback((eventData) => {
        setValue(eventData.currentTarget.value as Value);
        onChange?.(eventData);
    }, [onChange]);

    return {
        value,
        onChange: handleChange,
    };
};
