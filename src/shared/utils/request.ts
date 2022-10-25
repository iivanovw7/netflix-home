/**
 * Module contains request utility functions.
 * @module shared/utils/request
 */

import type { ValidationError } from 'yup';

import getLogger from '../../shared/log';

import { isValidationError } from './validation';

type SetLoading = (isLoading: boolean) => void;

export type MakeApiRequestParams<Req extends () => Promise<unknown>> = {
    request: Req;
    onError: (error: unknown) => void;
    onValidationError?: (error: ValidationError) => void;
    setLoading?: SetLoading;
    ignoreErrors?: unknown[];
};

const logger = getLogger('Request');

/**
 * Network request helper function.
 * Also accepts error handlers and loader in parameters.
 * @func makeApiRequest
 * @category Request
 * @param {MakeApiRequestParams} params - object represents request parameters.
 * @return {Promise.<boolean | undefined>} The element found, or the default value.
 */
export const makeApiRequest = async <Req extends () => Promise<unknown>, Res = AsyncReturnType<Req>>(
    params: MakeApiRequestParams<Req>
    // eslint-disable-next-line consistent-return
): Promise<Voidable<Res extends Maybe<void> ? true : Res>> => {
    const {
        request,
        onError,
        onValidationError,
        setLoading,
    } = params;

    try {
        setLoading?.(true);
        const result = await request();

        return (result ?? true) as unknown as Promise<Voidable<Res extends Maybe<void> ? true : Res>>;
    }
    catch (errorData: unknown) {
        if (isValidationError(errorData)) {
            logger.error('[ValidationError]:', errorData.path, errorData.errors);
            onValidationError?.(errorData);
        }
        else {
            logger.error(errorData);
            onError(errorData);
        }
    }
    finally {
        setLoading?.(false);
    }
};
