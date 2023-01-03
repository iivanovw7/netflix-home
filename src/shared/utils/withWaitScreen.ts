/**
 * Module contains withWaitScreen helper.
 * @module shared/utils/withWaitScreen
 */
import { settingsStore } from '../stores/SettingsStore';

type SetLoading = (isLoading: boolean) => void;

/**
 * Threshold delay in `ms`.
 * @readonly
 * @type {number}
 */
const THRESHOLD: Readonly<number> = 700;

/**
 * withWaitScreen helper.
 * @function
 * @param {SetLoading} setLocalLoading - set loading method.
 * @param {number} [threshold = 700] - change state threshold.
 *
 * @return {function(*)} global loader state changer method.
 */
export const withWaitScreen = (setLocalLoading: SetLoading, threshold = THRESHOLD) => {
    let timerId: number | undefined;
    let hasSetGlobalLoading = false;

    return (isLoading = true) => {
        setLocalLoading(isLoading);
        clearTimeout(timerId);

        if (isLoading) {
            timerId = window.setTimeout(() => {
                settingsStore.startWait();
                hasSetGlobalLoading = true;
            }, threshold);
        }
        else if (hasSetGlobalLoading) {
            settingsStore.stopWait();
            hasSetGlobalLoading = false;
        }
    };
};
