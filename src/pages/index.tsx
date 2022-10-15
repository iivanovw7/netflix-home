/**
 * Module contains application routing component.
 * @module pages
 */

import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Browse } from './browse';
import { routePath } from './routes';
import { NotFound } from './technical';

const {
    home,
    browse,
    notFound
} = routePath;

/**
 * Contains application routing.
 * @method
 * @return {ReactElement} React component with children.
 * @constructor
 */
export const Routing = observer((): ReactElement => {
    return (
        <Routes>
            <Route path={browse} element={<Browse />} />
            <Route path={notFound} element={<NotFound />} />
            <Route path={home} element={<Navigate replace to={browse} />} />
            <Route path="/*" element={<Navigate replace to={notFound} />} />
        </Routes>
    );
});

