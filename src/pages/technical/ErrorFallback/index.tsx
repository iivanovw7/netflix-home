/**
 * Module contains ErrorFallback page.
 * @module pages/technical/ErrorFallback
 */
import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';
import React from 'react';

import { bem, ErrorCodeMap } from '../../../shared/utils';
import { Header, ErrorScreen } from '../../../widgets';

import './index.pcss';

const cls = bem('error-fallback', { namespace: 'nh-pages-technical' });

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
    <div className={cls()}>
        <Header />
        <ErrorScreen
            className={cls('content')}
            error={NOT_FOUND}
            subtitle={MESSAGES.subtitle}
            title={MESSAGES.title}
        />
    </div>
));
