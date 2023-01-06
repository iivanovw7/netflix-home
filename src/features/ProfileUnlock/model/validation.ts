/**
 * Module contains `ProfileUnlock` validation helpers.
 * @module ~/widgets/ProfileUnlock/model/validation
 */

import { validateForm, VALIDATION_SCHEMAS, yup } from '../../../shared/utils';

type UnlockModalData = { pin: string };
type UnlockModalSchema = Record<keyof UnlockModalData, yup.AnySchema>;

const { STRING_REQUIRED } = VALIDATION_SCHEMAS;

export const PIN_VALIDATION_ERROR = 'Your PIN must be 4 numbers.';

const PIN_SCHEMA = STRING_REQUIRED.length(4, PIN_VALIDATION_ERROR);

export const unlockModalSchema = yup.object<UnlockModalSchema>({
    pin: PIN_SCHEMA,
});

export const validateUnlockModalData = (data: UnlockModalData): { validatedData: UnlockModalData } => {
    return validateForm(unlockModalSchema, data);
};
