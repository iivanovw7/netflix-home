/**
 * Module contains useIsomorphicLayoutEffect hook.
 * @module ~/shared/hooks/useIsomorphicLayoutEffect
 */
import { useEffect, useLayoutEffect } from 'react';

import { env } from '../utils';

export type UseIsomorphicLayoutEffect = typeof useEffect | typeof useLayoutEffect;

export const useIsomorphicLayoutEffect: UseIsomorphicLayoutEffect = env.isBrowser
    ? useLayoutEffect
    : useEffect;
