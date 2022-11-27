/**
 * Module contains widgets header utils.
 */
import { render } from '@testing-library/react';
import React from 'react';

import type { HeaderProps } from '../../../src/widgets';
import { Header } from '../../../src/widgets';
import { getSpecTitle } from '../../_helper/common';

describe(getSpecTitle('widgets', 'Header'), () => {
    const renderHeader = (props?: HeaderProps) => {
        return render(
            <Header {...props} />
        );
    };

    it('Should render successfully', () => {
        expect(renderHeader().baseElement).toBeTruthy();
    });

    it('Should render 2 header sections', () => {
        const header = renderHeader();
        const sections = header.baseElement.getElementsByClassName('nh-widgets-header__section');

        expect(sections.length).toBe(2);
    });

    it('Should render logo image', () => {
        const header = renderHeader();
        const image = header.getByAltText('Netflix');

        expect(image).toBeTruthy();
        expect(image.className).toContain('nh-widgets-header-logo__image');
    });

    it('Should render avatar image', () => {
        const header = renderHeader();
        const image = header.getByAltText('avatar');

        expect(image).toBeTruthy();
        expect(image.className).toContain('nh-components-img__image');
    });
});
