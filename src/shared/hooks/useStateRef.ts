/**
 * Module contains useStateRef hook.
 * @module shared/hooks/useStateRef
 */

import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { useRef, useState } from 'react';

type UseStateRef = {
    <State>(initialState: State | (() => State)): readonly [State, Dispatch<SetStateAction<State>>, Readonly<MutableRefObject<State>>];
    <State = undefined>(): readonly [State | undefined, Dispatch<SetStateAction<State | undefined>>, Readonly<MutableRefObject<State>>];
};

/**
 * Combines `useState` with `useRef`.
 * @function
 * @category hooks
 * @template State
 * @param {State | function} [initialState] - `useState` initial state.
 * @return {Array.<State, Dispatch<SetStateAction<State>>, Readonly<MutableRefObject<State>>>} `useState` return type with `ref`.
 */
export const useStateRef: UseStateRef = <State>(initialState?: State | (() => State)) => {
    const [state, setState] = useState(initialState);
    const stateRef = useRef(initialState);

    stateRef.current = state;

    return [state, setState, stateRef] as const;
};
