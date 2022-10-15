/**
 * Module contains global application context methods.
 * @module shared/context
 */

import { createContext } from 'react';

import type { ErrorBoundaryContext} from '../components/ErrorBoundary/ErrorBoundaryContext';
import { errorBoundaryContext } from '../components/ErrorBoundary/ErrorBoundaryContext';

export type ContextValue = {
    errorBoundary: ErrorBoundaryContext
};

export type SetContext = (value: ContextValue) => ContextValue;

export const ctx = {
    errorBoundary: errorBoundaryContext
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Context = createContext(null as any);

export const setContext: SetContext = (value) => Object.assign(ctx, value);
