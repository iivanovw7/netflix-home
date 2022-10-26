/**
 * Module contains date utils test suite
 */

import picocolors from 'picocolors';

export const getTestName = (title: string | number | null | undefined, description: string): string => {
    return `[${picocolors.yellow(title)}]: ${description}`;
};
