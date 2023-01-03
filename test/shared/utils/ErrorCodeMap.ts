/**
 * Module contains date utils test suite
 */

import { ERROR_PREFIX, ErrorCodeMap, getErrorCodeString } from '../../../src/shared/utils';

const {
    NOT_FOUND,
    UNKNOWN_ERROR,
} = ErrorCodeMap;

describe('shared/utils/ErrorCodeMap', () => {
    describe('ErrorCodeMap', () => {
        it('Should have ErrorCodeMap map', () => {
            expect(ErrorCodeMap).toBeDefined();
        });

        it('Should  should contain specific fields ErrorCodeMap', () => {
            const checkErrorCode = (code) => {
                expect(code).toBeGreaterThan(0);
            };

            checkErrorCode(NOT_FOUND);
            checkErrorCode(UNKNOWN_ERROR);
        });
    });

    describe('getErrorCodeString', () => {
        it('Should return error code string', () => {
            const code = 1;

            expect(getErrorCodeString(code))
                .toBe(`${String(ERROR_PREFIX)}-${code}`);

            expect(getErrorCodeString(NOT_FOUND))
                .toBe(`${String(ERROR_PREFIX)}-${String(NOT_FOUND)}`);

            expect(getErrorCodeString(UNKNOWN_ERROR))
                .toBe(`${String(ERROR_PREFIX)}-${String(UNKNOWN_ERROR)}`);
        });
    });
});
