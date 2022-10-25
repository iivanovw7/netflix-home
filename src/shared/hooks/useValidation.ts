/**
 * Module contains useValidation hook.
 * @module shared/hooks/useValidation
 */

import { useEffect, useState } from 'react';

export type UseValidationParams<Value = unknown> = {
    value?: Value;
    validate?: Validate<Value>;
    hasError?: boolean;
    errorText?: string;
};

export type UseValidationResult = {
    validationError: string;
    hasValidationError?: boolean;
};

export type UseValidation = <Value = unknown>({ value, validate, errorText, hasError }: UseValidationParams<Value>) => UseValidationResult;

/**
 * Validation hook.
 * @param {UseValidationParams} params - object contains validation properties.
 * @return {UseValidationResult} object represents validation result.
 */
export const useValidation: UseValidation = (params) => {
    const { value, validate, errorText, hasError } = params;
    const [validationError, setValidationError] = useState('');

    useEffect(() => {
        if (validate) {
            setValidationError(String(validate(value)) || '');
        }
        else {
            setValidationError((hasError && errorText) || '');
        }
    }, [hasError, errorText, validate, value]);

    return {
        validationError,
        hasValidationError: validate
            ? Boolean(validationError)
            : hasError,
    };
};
