/**
 * Module renders an image with parameters
 * @module shared/components/Img
 */
import classNames from 'classnames';
import type { CSSProperties, ReactElement, ReactEventHandler} from 'react';
import React, { useCallback } from 'react';

import placeholder from '../../../../assets/img/placeholder-square.png';
import { bem } from '../../utils';

import './index.pcss';

const cls = bem('img', { namespace: 'nh-components' });

export type ImgProps = {
    alt: string;
    className?: string;
    imageClassName?: string;
    height?: string | number;
    dataId?: string | number;
    keepSize?: boolean;
    maxWidth?: string | number;
    size?: string | number;
    rounded?: boolean;
    src?: string;
    width?: string | number;
    onClick?: () => void;
    onLoad?: () => void;
};

type HandleError = ReactEventHandler<HTMLImageElement>;

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
        imageClassName,
        src,
        width: widthProp,
        height: heightProp,
        alt,
        keepSize,
        rounded,
        maxWidth: maxWidthProp,
        dataId,
        size,
        onClick,
        onLoad
    } = props;

    const width = widthProp || size;
    const height = heightProp || size;
    const maxWidth = maxWidthProp ?? width;

    const containerStyles: CSSProperties = {};

    if (maxWidth) {
        containerStyles.maxWidth = maxWidth;
    }

    if (keepSize) {
        containerStyles.width = String(width);
        containerStyles.height = String(height);
    }

    if (typeof width === 'number' && typeof height === 'number') {
        containerStyles['--aspect-ratio'] = width / height;
    }

    const handleError: HandleError = useCallback((eventData) => {
        const { currentTarget } = eventData;

        currentTarget.onerror = null;
        currentTarget.src = placeholder;
    }, []);

    return (
        <div className={classNames(cls({ rounded }), className)} style={containerStyles} onClick={onClick}>
            <img
                alt={alt}
                className={classNames(cls('image'), imageClassName)}
                data-id={dataId}
                loading="lazy"
                src={src}
                onError={handleError}
                onLoad={onLoad} />
        </div>
    );
};
