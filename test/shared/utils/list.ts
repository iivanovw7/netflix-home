import { findOr, toArray } from '../../../src/shared/utils';
import { getSpecTitle } from '../../_helper/common';

let undef;

describe(getSpecTitle('shared.utils', 'list'), () => {
    describe('findOr', () => {
        const DEFAULT_VALUE = 'default';
        const LIST = [1, 2, 3, NaN];

        const check = (predicate, assert: string | number = DEFAULT_VALUE) => {
            expect(findOr(DEFAULT_VALUE, predicate, LIST)).toBe(assert);
        };

        it('Should return value', () => {
            check((val) => val === 1, 1);
            check((val) => val === 4);
            check((val) => isNaN(val));
            check((val) => val === null);
            check((val) => val === undef);
        });
    });

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
