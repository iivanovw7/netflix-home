/**
 * Module contains environment related utils.
 * @module shared/utils/env
 */

export type RunningMode = 'development' | 'test' | 'production';

export type Env = {
    html: HTMLElement;
    isDarkTheme: boolean;
    isDevelopment: boolean;
    isProduction: boolean;
    runningMode: RunningMode;
};

/**
 * Indicates whether the `theme` is set to dark or not.
 * @function
 * @category env
 * @return {boolean}
 *  returns `true` if is in dark mode.
 */
const isDarkTheme = (): boolean => window.matchMedia('(prefers-color-scheme: dark)').matches;

export const env: Env = {
    /**
     * Refers to a current document `html` element.
     * @readonly
     * @type {HTMLElement}
     */
    html: document.documentElement,
    /**
     * Refers true if dark theme is enabled,
     * @readonly
     * @type {boolean}
     */
    isDarkTheme: isDarkTheme(),
    /**
     * Equals `true` is running in development mode.
     * @readonly
     * @type {boolean}
     */
    isDevelopment: import.meta.env.DEV,
    /**
     * Equals `true` is running in production mode.
     * @readonly
     * @type {boolean}
     */
    isProduction: import.meta.env.PROD,
    /**
     * App running mode.
     * @readonly
     * @type {string}
     */
    runningMode: import.meta.env.MODE as RunningMode,
};
