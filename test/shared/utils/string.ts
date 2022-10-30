import { capitalizeFirstLetter } from '../../../src/shared/utils';
import { getSpecTitle } from '../../_helper/common';

describe(getSpecTitle('shared.utils', 'string'), () => {
    describe('capitalizeFirstLetter', () => {
        const check = (val: string, assert: string = val) => {
            expect(capitalizeFirstLetter(val)).toEqual(assert);
        };

        it('Should return value', () => {
            check('test', 'Test');
            check('capitalizeFirstLetter', 'CapitalizeFirstLetter');
            check('123');
            check('_test');
            check('TEST');
        });
    });
});
