import { toArray } from '../../../../src/shared/utils';
import { getSpecTitle } from '../../../_helper/common';

let undef;

describe(getSpecTitle('shared.utils', 'list'), () => {
    describe('toArray', () => {
        const check = (value, assert = value) => {
            expect(toArray(value)).toEqual(assert);
        };

        it('Should return value', () => {
            check([1]);
            check([null]);
            check([undef]);
            check(1, [1]);
            check(null, [null]);
            check(undef, [undef]);
        });
    });
});
