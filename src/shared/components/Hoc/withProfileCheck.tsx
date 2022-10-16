/**
 * Module contains profile check HOC.
 * @module shared/components/Hoc/withProfileCheck
 */
import React from 'react';

import { Profiles } from '../../../widgets';
import { globalStore } from '../../globalStores';
import { setDisplayName } from '../../utils';

export const withProfileCheck: HFC = (Component?) => {
    return setDisplayName('withProfileCheck')((props) => {
        const { profile } = globalStore.profile;

        return profile
            ? <Component {...props} />
            : <Profiles />;
    });
};
