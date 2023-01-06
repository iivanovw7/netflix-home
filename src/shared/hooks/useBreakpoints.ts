/**
 * Module contains useBreakpoints hook.
 * @module ~/shared/hooks/useBreakpoints
 */
import type { MutableRefObject } from 'react';
import { useEffect, useMemo, useRef } from 'react';

import cssVariables from '../styles/variables.json';
import { offEvent, onEvent } from '../utils';

import { useForceUpdate } from './useForceUpdate';

type TDirectionString = 'Up' | 'Down';
type TBreakpoint = typeof BREAKPOINTS[number];

type TDirectionResult<Breakpoints extends Array<TBreakpoint>, Direction extends TDirectionString> = {
    [Breakpoint in Breakpoints[number] as `${Breakpoint}${Direction}`]: boolean;
};

type Result<T extends Array<TBreakpoint>> = TDirectionResult<T, 'Down'> & TDirectionResult<T, 'Up'>;
type BreakpointsMap = Result<Array<TBreakpoint>>;
type MatchRule = keyof BreakpointsMap;

/**
 * List of valid breakpoints used as hook parameters.
 * @readonly
 * @type {Array.<string>}
 */
const BREAKPOINTS = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'] as const;

/**
 * Represents map of breakpoint rules.
 * @readonly
 * @type {Object.<module:~/shared/hooks/useBreakpoints.BREAKPOINTS, string>}
 */
const breakpointRulesMap = {
    xs: `(min-width: ${cssVariables['width-xs']})`,
    sm: `(min-width: ${cssVariables['width-sm']})`,
    md: `(min-width: ${cssVariables['width-md']})`,
    lg: `(min-width: ${cssVariables['width-lg']})`,
    xl: `(min-width: ${cssVariables['width-xl']})`,
    xxl: `(min-width: ${cssVariables['width-xxl']})`,
    xxxl: `(min-width: ${cssVariables['width-xxxl']})`,
} satisfies { [Breakpoint in TBreakpoint]: string; };

/**
 * Represents map of breakpoint matches for different directions..
 * @readonly
 * @type {Object.<module:~/shared/hooks/useBreakpoints.BREAKPOINTS, { down: MatchRule; up: MatchRule; }>}
 */
const breakpointMatchesMap: Record<TBreakpoint, { down: MatchRule; up: MatchRule; }> = {
    xs: { down: 'xsDown', up: 'xsUp' },
    sm: { down: 'smDown', up: 'smUp' },
    md: { down: 'mdDown', up: 'mdUp' },
    lg: { down: 'lgDown', up: 'lgUp' },
    xl: { down: 'xlDown', up: 'xlUp' },
    xxl: { down: 'xxlDown', up: 'xxlUp' },
    xxxl: { down: 'xxxlDown', up: 'xxxlUp' },
};

/**
 * Returns map of conditions corresponding received list of breakpoints.
 * @name ~/shared/hooks/useBreakpoints
 * @see {@link https://developer.mozilla.org/en-US/docs/web/api/window/matchmedia matchmedia}
 * @function
 * @category hooks
 * @param {Array.<TBreakpoint>} breakpoints - lists of breakpoints
 *      @see {@link module:~/shared/hooks/useBreakpoints/BREAKPOINTS}
 *
 * @return {Result<Array.<TBreakpoint>>} object, containing breakpoint conditions for different change directions.
 */
export const useBreakpoints = <Breakpoints extends Array<TBreakpoint>>(
    ...breakpoints: Breakpoints
): Result<Breakpoints> => {
    const { forceUpdate } = useForceUpdate();

    const xsUp = useRef(false);
    const smUp = useRef(false);
    const mdUp = useRef(false);
    const lgUp = useRef(false);
    const xlUp = useRef(false);
    const xxlUp = useRef(false);
    const xxxlUp = useRef(false);

    const breakpointsRefsMap: Record<string, MutableRefObject<boolean>> = {
        xs: xsUp,
        sm: smUp,
        md: mdUp,
        lg: lgUp,
        xl: xlUp,
        xxl: xxlUp,
        xxxl: xxxlUp,
    };

    const listenerSetters = useMemo(() => {
        const setters: Array<() => void | (() => void)> = [];

        for (const breakpoint of breakpoints) {
            const handleMediaMatch = ({ matches }: MediaQueryListEvent) => {
                breakpointsRefsMap[breakpoint].current = matches;
                forceUpdate();
            };

            const mediaQuery = matchMedia(breakpointRulesMap[breakpoint]);

            breakpointsRefsMap[breakpoint].current = mediaQuery.matches;

            setters.push(() => {
                onEvent(mediaQuery, 'change', handleMediaMatch);

                return () => offEvent(mediaQuery, 'change', handleMediaMatch);
            });
        }

        return setters;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const disposers = listenerSetters.map((set) => set());

        return () => disposers.forEach((dispose) => dispose?.());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return breakpoints.reduce((acc, breakpoint) => {
        const { down, up } = breakpointMatchesMap[breakpoint];

        acc[up] = breakpointsRefsMap[breakpoint].current;
        acc[down] = ! breakpointsRefsMap[breakpoint].current;

        return acc;
    }, {} as Result<Breakpoints>);
};
