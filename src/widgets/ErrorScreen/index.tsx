/**
 * Module contains `ErrorScreen` component.
 * @module ~/widgets/ErrorScreen
 */
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';
import React, { useCallback } from 'react';

import { routePath } from '../../pages/routes';
import { Button, H1, P, Strong } from '../../shared/components';
import { navigate } from '../../shared/stores/RouterStore';
import { bem, getErrorCodeString } from '../../shared/utils';
import type { ErrorData } from '../../shared/utils';

import './index.pcss';

export type ErrorScreenProps = {
    className?: string;
    error: ErrorData | number,
    subtitle: string;
    title: string;
};

const cls = bem('error-screen', { namespace: 'nh-widgets' });

const MESSAGES = {
    button: 'Netflix Home',
    code: 'Error Code '
};

/**
 * Error screen component.
 * @method
 * @name ~/widgets/ErrorScreen
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
