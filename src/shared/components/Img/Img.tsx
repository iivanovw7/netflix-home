/**
 * Module renders an image with parameters
 * @module shared/components/Img
 */
import classNames from 'classnames';
import type { CSSProperties, ReactElement } from 'react';
import React from 'react';

import './index.pcss';
import { bem } from '../../utils';

const cls = bem('image');

export type ImgProps = {
    alt: string;
    className?: string;
    height?: string | number;
    dataId?: string | number;
    keepSize?: boolean;
    maxWidth?: string | number;
    size?: string | number;
    src: string;
    width?: string | number;
    onClick?: () => void;
    onLoad?: () => void;
};

/**
 * Creates image component.
 * @name shared/components/Img
 * @method
 * @param {object} props - contains component props.
 *
 * @return {ReactElement} React component with children.
 * @constructor
 */
export const Img = (props: ImgProps): ReactElement => {
    const {
        className,
        src,
        width: widthProp,
        height: heightProp,
        alt,
        keepSize,
        maxWidth: maxWidthProp,
        dataId,
        size,
        onClick,
        onLoad
    } = props;

    const width = widthProp || size;
    const height = heightProp || size;
    const maxWidth = maxWidthProp ?? width;

    const wrapperStyle: CSSProperties = {};
    const params: Record<string, string> = {};

    if (maxWidth) {
        wrapperStyle.maxWidth = maxWidth;
    }

    if (width) {
        params.width = String(width);
    }

    if (height) {
        params.height = String(height);
    }

    if (keepSize) {
        wrapperStyle.width = width;
        wrapperStyle.height = height;
    }

    if (typeof width === 'number' && typeof height === 'number') {
        wrapperStyle['--aspect-ratio'] = width / height;
    }

    return (
        <div className={classNames(cls(), className)} style={wrapperStyle} onClick={onClick}>
            <img
                src={src}
                alt={alt}
                data-id={dataId}
                onLoad={onLoad}
                onClick={onClick} />
        </div>
    );
};
