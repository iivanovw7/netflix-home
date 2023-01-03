/**
 * Module contains application header search bar.
 * @module widgets/Header/Search
 */
import bem from 'bem-ts';
import type { ReactElement } from 'react';
import React from 'react';

import { Button } from '../../../shared/components';

import './index.pcss';

const cls = bem('header-search', { namespace: 'nh-widgets' });

/**
 * Header Search component.
 * @method
 * @return {ReactElement} React component with children.
 * @constructor
 */
export const Search = (): ReactElement => {
    return (
        <Button
            className={cls('toggle')}
            color="secondary"
            fill="none"
            icon={{ name: 'search', size: 24 }}
        />
    );
};
