/**
 * Module contains SVG icon component.
 * @module ~/shared/components/Icon
 */
import classNames from 'classnames';
import type { CSSProperties, ReactElement } from 'react';
import React, { forwardRef } from 'react';
// eslint-disable-next-line import/no-unresolved
import icons from 'virtual:svg-icons-names';

import { bem, findOr } from '../../utils';

import './index.pcss';

export type IconProps = {
    className?: string;
    fill?: string;
    height?: number;
    name: string;
    rotate?: number;
    size?: number;
    styles?: CSSProperties;
    width?: number;
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
        (val) => val === `${PREFIX}-${id}`,
        icons
    );
};

/**
 * Dynamically loads icon from assets.
 * @name ~/shared/components/Icon
 * @method
 * @param {object} props - contains component props.
 * @return {ReactElement} React component with children.
 * @constructor
 */
export const Icon = forwardRef<HTMLDivElement, IconProps>((props, ref): ReactElement => {
    const {
        name: iconName,
        fill = 'currentColor',
        width,
        height,
        rotate,
        size,
        className,
        styles
    } = props;

    const style: CSSProperties = {
        width: width || size,
        height: height || size,
        fill,
    };

    if (rotate) {
        style.transform = `rotate(${rotate}deg)`;
    }

    return (
        <div style={styles} ref={ref} className={classNames(cls(), className)}>
            <svg aria-hidden="true" style={style}>
                <use fill={fill} href={`#${getIcon(iconName)}`} />
            </svg>
        </div>
    );
});

Icon.displayName = 'Icon';
