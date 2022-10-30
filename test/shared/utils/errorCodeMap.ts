/**
 * Module contains date utils test suite
 */

import { ERROR_PREFIX, errorCodeMap, getErrorCodeString } from '../../../src/shared/utils';
import { getSpecTitle } from '../../_helper/common';

const {
    NOT_FOUND,
    UNKNOWN_ERROR
} = errorCodeMap;

describe(getSpecTitle('shared.utils', 'errorCodeMap'), () => {
    describe('errorCodeMap', () => {
        it('Should have errorCode map', () => {
            expect(errorCodeMap).toBeDefined();

        });

        it('Should  should contain specific fields errorCodeMap', () => {
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
                .toBe(`${ERROR_PREFIX}-${code}`);

            expect(getErrorCodeString(NOT_FOUND))
                .toBe(`${ERROR_PREFIX}-${NOT_FOUND}`);

            expect(getErrorCodeString(UNKNOWN_ERROR))
                .toBe(`${ERROR_PREFIX}-${UNKNOWN_ERROR}`);
        });
    });
});
