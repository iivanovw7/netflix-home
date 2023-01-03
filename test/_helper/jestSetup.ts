import '@testing-library/jest-dom';

jest.mock('../../src/shared/utils/env', () => {
    return {
        env: {
            isBrowser: true
        }
    };
});
