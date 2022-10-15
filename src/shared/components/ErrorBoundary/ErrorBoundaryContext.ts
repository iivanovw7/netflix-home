/**
 * Contains ErrorBoundary context.
 * @module shared/component/ErrorBoundaryContext
 */
import type { ErrorInfo } from 'react';

import getLogger from '../../../shared/log';

const logger = getLogger('ErrorBoundary');

export type ErrorBoundaryContext = {
    log: (error: Error, info: ErrorInfo) => void;
};

const DEFAULT_ERROR_BOUNDARY_CONTEXT = {
    log(error: Error, info: ErrorInfo) {
        logger.error(`Application error: ${error.stack || ''}, componentStack: ${String(info)}`);
    },
};

export const errorBoundaryContext = { ...DEFAULT_ERROR_BOUNDARY_CONTEXT };

export const setErrorBoundaryContext = (value: ErrorBoundaryContext = DEFAULT_ERROR_BOUNDARY_CONTEXT): void => {
    Object.assign(errorBoundaryContext, value);
};
