/**
 * Module contains async method stub.
 * @module shared/utils/stub/wait
 */

export const wait = async <T>(data?: T, delay = 300): Promise<unknown> => {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => setTimeout(() => resolve(data), delay));
};
