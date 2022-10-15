import React from 'react';

import { Profiles } from '../../../widgets';
import { globalStore } from '../../globalStores';
import type { HFC } from '../../types/util';
import { setDisplayName } from '../../utils';

export const withProfileCheck: HFC = (Component?) => {
    return setDisplayName('withProfileCheck')((props) => {
        const { profile } = globalStore.profile;

        return profile
            ? <Component {...props} />
            : <Profiles />;
    });
};
