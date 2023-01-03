import { findOr } from '../../../../src/shared/utils';

let undef;

const DEFAULT_VALUE = 'default';
const LIST = [1, 2, 3, NaN];

describe('shared/utils/list', () => {
    describe('findOr', () => {
        const check = (predicate, assert: string | number = DEFAULT_VALUE) => {
            expect(findOr(DEFAULT_VALUE, predicate, LIST)).toBe(assert);
        };

        it('Should return value', () => {
            check((val) => val === 1, 1);
            check((val) => val === 4);
            check((val) => Number.isNaN(val));
            check((val) => val === null);
            check((val) => val === undef);
        });
    });
});
