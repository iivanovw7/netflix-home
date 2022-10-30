/**
 * Module contains `ErrorScreen` page.
 * @module shared/components/ErrorBoundary/ErrorScreen
 */
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';
import React, { useCallback } from 'react';

import { routePath } from '../../../pages/routes';
import { Button, H1, P, Strong } from '../../../shared/components';
import { bem, getErrorCodeString } from '../../../shared/utils';
import { navigate } from '../../globalStores/RouterStore';
import type { ErrorData } from '../../utils';

import './ErrorScreen.pcss';

export type ErrorScreenProps = {
    title: string;
    subtitle: string;
    error: ErrorData | number,
    className?: string;
};

const cls = bem('error-screen', { namespace: 'nh-components' });

const MESSAGES = {
    button: 'Netflix Home',
    code: 'Error Code '
};

/**
 * Error screen component.
 * @method
 * @constructor
 * @return {ReactElement} React component with children.
 */
export const ErrorScreen = observer((props: ErrorScreenProps): ReactElement => {
    const {
        title,
        subtitle,
        error,
        className
    } = props;

    const handleHomeClick = useCallback(() => {
        navigate.redirect(routePath.home);
    }, []);

    return (
        <div className={classNames(cls('content'), className)}>
            <H1 className={cls('title')} text={title} />
            <div className={cls('body')}>
                <P className={cls('message')} text={subtitle} />
                <Button color="secondary" text={MESSAGES.button} onClick={handleHomeClick} />
            </div>
            <div className={cls('footer')}>
                <span className={cls('code')}>
                    {MESSAGES.code}
                    <Strong text={getErrorCodeString(error)} />
                </span>
            </div>
        </div>
    );
});
