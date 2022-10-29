/**
 * Module contains date utils test suite
 */

import picocolors from 'picocolors';

export const getSpecTitle = (title: Maybe<string | number>, description: string): string => {
    return `[${picocolors.yellow(title)}]: ${description}`;
};
