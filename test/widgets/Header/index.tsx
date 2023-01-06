/**
 * Module contains widgets header utils.
 */
import { render } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';
import * as React from 'react';

import type { HeaderProps } from '../../../src/widgets';
import { Header } from '../../../src/widgets';

// eslint-disable-next-line @typescript-eslint/no-shadow
let matchMedia;

describe('widgets/Header', () => {
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });

    afterEach(() => {
        matchMedia.clear();
    });

    const renderHeader = (props?: HeaderProps) => render(<Header {...props} />);

    it('Should render successfully', () => {
        expect(renderHeader().baseElement).toBeTruthy();
    });

    it('Should render logo image', () => {
        const header = renderHeader();
        const image = header.getByAltText('Netflix');

        expect(image).toBeTruthy();
        expect(image.className).toContain('nh-components-img__image');
    });

    it('Should render avatar image', () => {
        const header = renderHeader();
        const image = header.getByAltText('avatar');

        expect(image).toBeTruthy();
        expect(image.className).toContain('nh-components-img__image');
    });
});
