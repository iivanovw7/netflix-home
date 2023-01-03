/**
 * Module contains profile check HOC.
 * @module ~/widgets/Profiles/withProfileCheck
 */
import React from 'react';

import { stores } from '../../shared/stores';
import { setDisplayName } from '../../shared/utils';

import { Profiles } from './index';

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
