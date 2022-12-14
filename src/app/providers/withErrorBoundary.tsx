/**
 * Module contains application `withErrorBoundary` HOC.
 * @module app/providers/withErrorBoundary
 */
import type { ReactElement } from 'react';
import React from 'react';

import { ErrorBoundary, ErrorFallback } from '../../shared/components';
import { setDisplayName } from '../../shared/utils';

/**
 * Application error fallback HOC.
 * @constructor
 * @param {FunctionComponent} Component - represents child component.
 *
 * @return {function(*)} React component with children.
 */
export const withErrorBoundary: HFC = (Component) => {
    return setDisplayName('ErrorBoundary')((props): ReactElement => {
        return (
            <ErrorBoundary fallback={<ErrorFallback />}>
                <Component {...props} />
            </ErrorBoundary>
        );
    });
};
