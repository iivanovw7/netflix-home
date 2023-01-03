/**
 * Module contains application main entry point.
 * @module main
 */
import 'virtual:svg-icons-register';
import './shared/styles/main.pcss';

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';
import { reportWebVitals } from './reportWebVitals';
import config from './shared/config';
import { setLogLevel } from './shared/log';
import { setMainStorage } from './shared/storage';
import { initStores } from './shared/stores';
import { setBemConfig } from './shared/utils';

const { logLevel } = config;

const MOUNT_NODE = document.getElementById('app')!;
const root = createRoot(MOUNT_NODE);

setLogLevel(logLevel);
setMainStorage('netflix-home');
setBemConfig({
    namespace: 'nh',
    elementDelimiter: '__',
});

initStores();

/** Renders application at specified mount point. */
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
