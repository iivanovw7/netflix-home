/**
 * Module contains date utils test suite
 */

import { ERROR_PREFIX, errorCodeMap, getErrorCodeString } from '../../../src/shared/utils';
import { getTestName } from '../../_helper/common';

jest.mock('../../../src/shared/utils/env', jest.fn);

describe(getTestName('shared.utils', 'errorCodeMap'), () => {
    describe('errorCodeMap', () => {
        it('Should have errorCode map', () => {
            expect(errorCodeMap).toBeDefined();

        });

        it('Should  should contain specific fields errorCodeMap', () => {
            const checkErrorCode = (code) => {
                expect(code).toBeGreaterThan(0);
            };

            checkErrorCode(errorCodeMap.PAGE_NOT_FOUND);
            checkErrorCode(errorCodeMap.UNKNOWN_ERROR);
        });
    });

    describe('getErrorCodeString', () => {
        it('Should return error code string', () => {
            const code = 1;

            expect(getErrorCodeString(code))
                .toBe(`${ERROR_PREFIX}-${code}`);

            expect(getErrorCodeString(errorCodeMap.PAGE_NOT_FOUND))
                .toBe(`${ERROR_PREFIX}-${errorCodeMap.PAGE_NOT_FOUND}`);

            expect(getErrorCodeString(errorCodeMap.UNKNOWN_ERROR))
                .toBe(`${ERROR_PREFIX}-${errorCodeMap.UNKNOWN_ERROR}`);
        });
    });
});
