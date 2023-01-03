/**
 * Module contains application `withErrorBoundary` HOC.
 * @module app/providers/withErrorBoundary
 */
import type { ReactElement } from 'react';
import React from 'react';

import { ErrorFallback } from '../../pages/technical';
import { setDisplayName } from '../../shared/utils';

import { ErrorBoundary } from './ErrorBoundary';

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
