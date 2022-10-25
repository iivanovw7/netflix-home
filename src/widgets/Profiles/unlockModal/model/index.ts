/**
 * Module contains `UnlockModal` store model.
 * @module widgets/Profiles/unlockModal/model
 */

import { runInAction } from 'mobx';
import type { Instance } from 'mobx-state-tree';
import { cast, types } from 'mobx-state-tree';
import { equals } from 'ramda';

import { withStoreContext } from '../../../../shared/hoc/withStoreContext';
import getLogger from '../../../../shared/log';
import { makeApiRequest, wait } from '../../../../shared/utils';

import { DEFAULT_PIN } from './constants';
import { validateUnlockModalData } from './validation';

const { array, string, optional } = types;

const logger = getLogger('UnlockModal store');

export const UnlockModel = types
    .model({
        lock: optional(array(string), DEFAULT_PIN),
        pin: optional(array(string), DEFAULT_PIN),
        pinValidation: optional(string, ''),
        isPinError: optional(types['boolean'], false),
    })
    .views((_self) => ({
        get isPinCorrect() {
            return equals(_self.lock, _self.pin);
        },
    }))
    .actions((_self) => ({
        resetFiled() {
            _self.pin = cast(DEFAULT_PIN);
            _self.isPinError = false;
            _self.pinValidation = '';
        },
        setLock(lock: string) {
            for (const [index, value] of lock.split('').entries()) {
                _self.lock[index] = value;
            }
        },
        setPinNumber(index: number, value: string) {
            _self.pin[index] = value;
            _self.pinValidation = '';
        },
        setPinError(value: boolean) {
            _self.isPinError = value;
        },
        setPinValidation(value = '') {
            _self.pinValidation = value;
        },
        async onSubmit() {
            return await makeApiRequest({
                request: async () => {
                    const { isPinCorrect, pin } = _self;

                    validateUnlockModalData({ pin: pin.join('') });

                    runInAction(() => {
                        _self.isPinError = ! isPinCorrect;

                        if (! isPinCorrect) {
                            _self.pin = cast(DEFAULT_PIN);
                            _self.pinValidation = '';
                        }
                    });

                    return await wait(isPinCorrect);
                },
                onError: (errorData: unknown) => {
                    logger.error(errorData);
                },
                onValidationError: (validationError) => {
                    _self.pinValidation = validationError.errors[0];
                }
            });
        }
    }));

export const unlockModel = UnlockModel.create();

export type TUnlockModel = Instance<typeof UnlockModel>;

export const [useUnlockState, withUnlockStore] = withStoreContext<TUnlockModel>(unlockModel);
