/**
 * Module contains `not found` page.
 * @module pages/technical/notFound
 */
import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';
import React from 'react';

import { ErrorScreen } from '../../../shared/components/ErrorBoundary/ErrorScreen';
import { bem, errorCodeMap } from '../../../shared/utils';
import { Header } from '../../../widgets';

import './ErrorFallback.pcss';

const cls = bem('error-fallback', { namespace: 'nh-components' });

const { NOT_FOUND } = errorCodeMap;

const MESSAGES = {
    title: 'Sorry for interruption',
    subtitle: 'Sorry, we`re having trouble with your request.',
};

/**
 * ErrorFallback page.
 * @method
 * @constructor
 * @return {ReactElement} React component with children.
 */
export const ErrorFallback = observer((): ReactElement => {

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
