/**
 * Module contains styled `Browse` page.
 * @module pages/browse/index.styled
 */
import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';
import React from 'react';

import { withProfileCheck } from '../../shared/components/Hoc';
import { Header } from '../../widgets';

/**
 * `Browse` page.
 * @method
 * @return {ReactElement} React component with children.
 * @constructor
 */
export const Browse = observer(withProfileCheck((): ReactElement => {
    return (
        <div>
            <Header withNavigation />
            Browse
        </div>
    );
}));
