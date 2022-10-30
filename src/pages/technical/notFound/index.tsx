/**
 * Module contains `not found` page.
 * @module pages/technical/notFound
 */
import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';
import React from 'react';

import { ErrorScreen } from '../../../shared/components';
import { bem, errorCodeMap } from '../../../shared/utils';
import { Header } from '../../../widgets';

import './index.pcss';

const cls = bem('not-found', { namespace: 'nh-components' });

const { NOT_FOUND } = errorCodeMap;

const MESSAGES = {
    title: 'Lost your way?',
    subtitle: 'Sorry, we can`t find that page. You`ll find lots to explore on the home page.',
};

/**
 * `404` page.
 * @method
 * @constructor
 * @return {ReactElement} React component with children.
 */
export const NotFound = observer((): ReactElement => {

    return (
        <div className={cls()}>
            <Header />
            <ErrorScreen
                className={cls('content')}
                error={NOT_FOUND}
                subtitle={MESSAGES.subtitle}
                title={MESSAGES.title}
            />
        </div>
    );
});
