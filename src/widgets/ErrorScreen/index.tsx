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
import { getErrorCodeString } from '../../shared/utils';
import type { ErrorData } from '../../shared/utils';

import cls from './index.module.pcss';

export type ErrorScreenProps = {
    className?: string;
    error: ErrorData | number,
    subtitle: string;
    title: string;
};

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
        <div className={classNames(cls.errorScreenCode, className)}>
            <H1 className={cls.errorScreenTitle} text={title} />
            <div className={cls.errorScreenBody}>
                <P className={cls.errorScreenMessage} text={subtitle} size="large" />
                <Button color="secondary" text={MESSAGES.button} onClick={handleHomeClick} />
            </div>
            <div className={cls.errorScreenFooter}>
                <span className={cls.errorScreenCode}>
                    {MESSAGES.code}
                    <Strong text={getErrorCodeString(error)} />
                </span>
            </div>
        </div>
    );
});
