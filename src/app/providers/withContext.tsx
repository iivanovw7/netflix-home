/**
 * Module contains application `withContext` HOC.
 * @module app/providers/withContext
 */
import type { RefObject, ReactElement} from 'react';
import React, { useEffect, useMemo, useRef } from 'react';

import { ModalManager } from '../../shared/components';
import type { ContextValue } from '../../shared/context';
import { Context, ctx, setContext } from '../../shared/context';
import { setDisplayName } from '../../shared/utils';
import { createRefContext } from '../model/utils';

/**
 * Application `context` HOC.
 * @constructor
 * @param {FunctionComponent} Component - represents child component.
 * @return {AnyComponent} React component with children.
 */
export const withContext: HFC = (Component) => {
    return setDisplayName('ContextProvider')((props): ReactElement => {
        const refs = Object
            .entries(ctx)
            .reduce((acc, [key, defaultContext]) => {
                acc[key] = useRef(defaultContext);

                return acc;
            }, {} as { [K in keyof ContextValue]: React.RefObject<ContextValue[K]> });

        const contextValue = useMemo(() => Object
            .entries(refs)
            .reduce((acc, [key, ref]) => {
                acc[key] = createRefContext(ref as RefObject<never>);

                return acc;

                // eslint-disable-next-line react-hooks/exhaustive-deps
            }, {} as ContextValue), []
        );

        useEffect(() => {
            setContext(contextValue);
        }, [contextValue]);

        return (
            <Context.Provider value={contextValue}>
                <Component {...props} />
                <ModalManager ref={refs.modal} />
            </Context.Provider>
        );
    });
};

