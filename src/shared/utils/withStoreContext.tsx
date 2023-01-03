/**
 * Module contains store context check HOC.
 * @module shared/components/Hoc/withStoreContext
 */
import { observer } from 'mobx-react-lite';
import type { FC } from 'react';
import React, { createContext } from 'react';

import { useLocalState } from '../hooks/useLocalState';

import { setDisplayName } from './setDisplayName';

/**
 * withStoreContext HOC.
 * @constructor
 * @template IStore
 * @param {IStore} localStore - local store object.
 *
 * @return {function(*)} React component with children.
 */
export function withStoreContext<IStore>(localStore: IStore): [
    (() => IStore),
    (<IProps>(WrappedComponent: FC<IProps>) => FC<IProps>)
] {
    const Context = createContext<IStore | null>(null);
    const useState = () => useLocalState(Context);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const withProvider = <IProps, _>(WrappedComponent: FC<IProps>) => {
        const Cmp = observer(WrappedComponent);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return setDisplayName('')((props: any) => (
            <Context.Provider value={localStore}>
                <Cmp {...(props)} />
            </Context.Provider>
        ));
    };

    return [useState, withProvider];
}
