/**
 * Module contains application providers.
 * @module app/providers
 */

import { compose } from 'ramda';

import { withContext } from './withContext';
import { withErrorBoundary } from './withErrorBoundary';
import { withRouter } from './withRouter';
import { withTheme } from './withTheme';

/**
 * Combines application providers.
 * @function
 * @param {ReactElement} Component - represents child component.
 *
 * @return {function(*)} all HOC`s combined.
 */
export const withProviders = compose(
    withContext,
    withRouter,
    withErrorBoundary,
    withTheme
);
