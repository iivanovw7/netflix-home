/**
 * Module contains `not found` page.
 * @module pages/technical/notFound
 */
import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';
import React, { useCallback } from 'react';

import { Button, H1, P, Strong } from '../../../shared/components';
import { navigate } from '../../../shared/globalStores/RouterStore';
import { bem, errorCodeMap, getErrorCodeString } from '../../../shared/utils';
import { Header } from '../../../widgets';
import { routePath } from '../../routes';

import './index.pcss';

const cls = bem('not-found', { namespace: 'pages-technical' });

const { NOT_FOUND } = errorCodeMap;

const MESSAGES = {
    title: 'Lost your way?',
    body: 'Sorry, we can`t find that page. You`ll find lots to explore on the home page.',
    button: 'Netflix Home',
    code: 'Error Code '
};

/**
 * `404` page.
 * @method
 * @constructor
 * @return {ReactElement} React component with children.
 */
export const NotFound = observer((): ReactElement => {

    const handleHomeClick = useCallback(() => {
        navigate.redirect(routePath.home);
    }, []);

    return (
        <div className={cls('page')}>
            <Header />
            <div className={cls('content')}>
                <H1 className={cls('title')} text={MESSAGES.title} />
                <div className={cls('contentBody')}>
                    <P className={cls('message')} text={MESSAGES.body} />
                    <Button color="secondary" text={MESSAGES.button} onClick={handleHomeClick} />
                </div>
                <div className={cls('contentFooter')}>
                    <span className={cls('errorCode')}>
                        {MESSAGES.code}
                        <Strong text={getErrorCodeString(NOT_FOUND)} />
                    </span>
                </div>
            </div>
        </div>
    );
});
