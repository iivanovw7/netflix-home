/**
 * Module contains `not found` page.
 * @module pages/technical/NotFound
 */
import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';
import React from 'react';

import { ErrorCodeMap } from '../../../shared/utils';
import { ErrorScreen, Header } from '../../../widgets';

import cls from './index.module.pcss';

const { NOT_FOUND } = ErrorCodeMap;

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
        <div className={cls.page}>
            <Header />
            <ErrorScreen
                className={cls.pageContent}
                error={NOT_FOUND}
                subtitle={MESSAGES.subtitle}
                title={MESSAGES.title}
            />
        </div>
    );
});
