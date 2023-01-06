/**
 * Module contains ErrorFallback page.
 * @module pages/technical/ErrorFallback
 */
import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';
import React from 'react';

import { ErrorCodeMap } from '../../../shared/utils';
import { Header, ErrorScreen } from '../../../widgets';

import cls from './index.module.pcss';

const { NOT_FOUND } = ErrorCodeMap;

const MESSAGES = {
    subtitle: 'Sorry, we`re having trouble with your request.',
    title: 'Sorry for interruption'
};

/**
 * ErrorFallback page.
 * @method
 * @constructor
 * @return {ReactElement} React component with children.
 */
export const ErrorFallback = observer((): ReactElement => (
    <div className={cls.page}>
        <Header />
        <ErrorScreen
            className={cls.pageContent}
            error={NOT_FOUND}
            subtitle={MESSAGES.subtitle}
            title={MESSAGES.title}
        />
    </div>
));
