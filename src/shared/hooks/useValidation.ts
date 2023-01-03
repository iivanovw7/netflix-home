/**
 * Module contains useValidation hook.
 * @module ~/shared/hooks/useValidation
 */

import { useEffect, useState } from 'react';

export type UseValidationParams<Value = unknown> = {
    errorText?: string;
    hasError?: boolean;
    validate?: Validate<Value>;
    value?: Value;
};

export type UseValidationResult = {
    hasValidationError?: boolean;
    validationError: string;
};

export type UseValidation = <Value = unknown>(params: UseValidationParams<Value>) => UseValidationResult;

/**
 * Validation hook.
 * @name ~/shared/hooks/useValidation
 * @function
 * @category hooks
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
