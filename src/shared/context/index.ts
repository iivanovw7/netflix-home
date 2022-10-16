/**
 * Module contains global application context methods.
 * @module shared/context
 */

import { createContext } from 'react';

import type { ErrorBoundaryContext} from '../components/ErrorBoundary/ErrorBoundaryContext';
import { errorBoundaryContext } from '../components/ErrorBoundary/ErrorBoundaryContext';
import { defaultModalContext } from '../components/Modal/modalContext';
import type { ModalManagerRef } from '../components/Modal/ModalManager';

export type ContextValue = {
    modal: ModalManagerRef;
    errorBoundary: ErrorBoundaryContext;
};

export type SetContext = (value: ContextValue) => ContextValue;

export const ctx = {
    modal: defaultModalContext,
    errorBoundary: errorBoundaryContext
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Context = createContext(null as any);

export const setContext: SetContext = (value) => Object.assign(ctx, value);
