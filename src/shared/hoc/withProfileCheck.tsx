/**
 * Module contains profile check HOC.
 * @module shared/hoc/withProfileCheck
 */
import React from 'react';

import { Profiles } from '../../widgets';
import { stores } from '../stores';
import { setDisplayName } from '../utils';

/**
 * User profile check HOC.
 * @constructor
 * @param {FunctionComponent} Component - represents child component.
 *
 * @return {function(*)} React component with children.
 */
export const withProfileCheck: HFC = (Component?) => {
    return setDisplayName('withProfileCheck')((props) => {
        const { profile } = stores.profile;

        return profile
            ? <Component {...props} />
            : <Profiles />;
    });
};
