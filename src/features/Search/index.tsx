/**
 * Module contains application header search bar.
 * @module widgets/Header/Search
 */
import type { ReactElement } from 'react';
import React from 'react';

import { Button } from '../../shared/components';

import cls from './index.module.pcss';

/**
 * Header Search component.
 * @method
 * @return {ReactElement} React component with children.
 * @constructor
 */
export const Search = (): ReactElement => {
    return (
        <Button
            className={cls.searchToggle}
            color="secondary"
            fill="none"
            icon={{ name: 'search', size: 24 }}
        />
    );
};
