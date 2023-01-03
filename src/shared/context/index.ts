/**
 * Module contains global application context methods.
 * @module ~/shared/context
 */

import { createContext } from 'react';

import type { ModalManagerRef } from './ModalManager';
import { defaultModalContext } from './ModalManager/model/context';

export type ContextValue = {
    modal: ModalManagerRef;
};

export type SetContext = (value: ContextValue) => ContextValue;

export const ctx = {
    modal: defaultModalContext,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Context = createContext(null as any);

export const setContext: SetContext = (value) => Object.assign(ctx, value);
