/**
 * Module contains application main entry point.
 * @module main
 */
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';
import './shared/styles/main.pcss';

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';
import { reportWebVitals } from './reportWebVitals';
import config from './shared/config';
import { initGlobalStore } from './shared/globalStores';
import { setLogLevel } from './shared/log';
import { setMainStore } from './shared/storage';
import { setBemConfig } from './shared/utils';

const { logLevel } = config;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const MOUNT_NODE = document.getElementById('app')!;
const root = createRoot(MOUNT_NODE);

setLogLevel(logLevel);
setMainStore('netflix-home');
setBemConfig({
    namespace: 'nh',
    elementDelimiter: '__',
});

initGlobalStore();

/**
 *  Renders application at specified mount point.
 */
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

