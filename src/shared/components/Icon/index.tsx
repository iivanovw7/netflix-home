/**
 * Module contains SVG icon component.
 * @module shared/components/Icon
 */
import classNames from 'classnames';
import { findOr } from 'ramda-adjunct';
import type { CSSProperties, ReactElement } from 'react';
import React from 'react';
// eslint-disable-next-line import/no-unresolved
import icons from 'virtual:svg-icons-names';

import './index.pcss';
import { bem } from '../../utils';

export type IconProps = {
    fill?: string;
    height?: number;
    name: string;
    rotate?: number;
    size?: number;
    width?: number;
    className?: string;
};

const cls = bem('icon', { namespace: 'nh-components' });
const PREFIX = 'icon';

/**
 * Gets icon file extension string.
 * @param {string} id - string representing file path.
 * @return {string} string representing image file type.
 */
const getIcon = (id: string): string => {
    return findOr(
        `${PREFIX}-no-icon`,
        (val: string) => val === `${PREFIX}-${id}`,
        icons
    );
};

/**
 * Dynamically loads icon from assets.
 * @name shared/components/Icon
 * @method
 * @param {object} props - contains component props.
 * @return {ReactElement} React component with children.
 * @constructor
 */
export const Icon = (props: IconProps): ReactElement => {
    const {
        name: iconName,
        fill = 'currentColor',
        width,
        height,
        rotate,
        size,
        className
    } = props;

    const style: CSSProperties = {
        width: width || size,
        height: height || size,
        fill
    };

    if (rotate) {
        style.transform = `rotate(${rotate}deg)`;
    }

    return (
        <div className={classNames(cls(), className)}>
            <svg style={style} aria-hidden="true">
                <use href={`#${getIcon(iconName)}`} fill={fill} />
            </svg>
        </div>
    );
};
