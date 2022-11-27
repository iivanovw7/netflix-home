/**
 * Module contains `UnlockModal` store model.
 * @module widgets/Profiles/unlockModal/model
 */

import { runInAction } from 'mobx';
import type { Instance } from 'mobx-state-tree';
import { cast, getEnv, types } from 'mobx-state-tree';
import { equals } from 'ramda';

import { withStoreContext } from '../../../../shared/hoc/withStoreContext';
import getLogger from '../../../../shared/log';
import { makeApiRequest, wait } from '../../../../shared/utils';

import { DEFAULT_PIN } from './constants';
import { validateUnlockModalData } from './validation';

export type UnlockModelEnv = {
    fetch: <Data>(data: Data) => Promise<Data>
};

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
        get fetch(): UnlockModelEnv['fetch'] {
            return getEnv<UnlockModelEnv>(_self).fetch;
        },
    }))
    .actions((_self) => {
        /**
         *  Resets pin field.
         */
        const resetFiled = () => {
            _self.pin = cast(DEFAULT_PIN);
            _self.isPinError = false;
            _self.pinValidation = '';
        };
        /**
         *  Sets new lock string.
         *  @param {string} lock - lock string.
         */
        const setLock = (lock: string) => {
            for (const [index, value] of lock.split('').entries()) {
                _self.lock[index] = value;
            }
        };
        /**
         *  Sets pin value.
         *  @param {number} index - pin input index.
         *  @param {string} value - pin input value.
         */
        const setPinNumber = (index: number, value: string) => {
            _self.pin[index] = value;
            _self.pinValidation = '';
        };
        /**
         *  Sets pin code error.
         *  @param {boolean} value - pin error value.
         */
        const setPinError = (value: boolean) => {
            _self.isPinError = value;
        };
        /**
         *  Sets pin validation string.
         *  @param {boolean} value - validation string.
         */
        const setPinValidation = (value = '') => {
            _self.pinValidation = value;
        };
        /**
         *  Submits current pin code to verify result.
         */
        const onSubmit = async () => makeApiRequest({
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

                return await _self.fetch(isPinCorrect);
            },
            onError: (errorData: unknown) => {
                logger.error(errorData);
            },
            onValidationError: (validationError) => {
                _self.pinValidation = validationError.errors[0];
            }
        });

        return {
            resetFiled,
            setLock,
            setPinNumber,
            setPinError,
            setPinValidation,
            onSubmit
        };
    });

export const unlockModel = UnlockModel.create({}, {
    // TODO: Replace stub with api.
    fetch: <Data>(data: Data) => wait(data)
});

export type TUnlockModel = Instance<typeof UnlockModel>;

export const [useUnlockState, withUnlockStore] = withStoreContext<TUnlockModel>(unlockModel);
