/**
 * POSTCSS mixins
 * @module styles/mixins
 */

'use strict';

const { getValues } = require('./utils');
const variables = require('./variables.json');

/**
 * Sets base font rules.
 *
 * @param {object} mixin - parent node
 * @param {number | string} size - font size.
 * @param {number | string} lineHeight - line height.
 * @param {number | string} [fontHeight] - optional font height.
 * @return {object} mixin - returns mixin content.
 */
const fontSize = (mixin, size, lineHeight, fontHeight) => {
    const mixinContent = {
        'font-size': size,
        'line-height': lineHeight,
    };

    if (fontHeight) {
        mixinContent['font-weight'] = fontHeight;
    }

    return mixinContent;
};

/**
 * Contains map of breakpoints.
 * @readonly
 * @name breakpointMap
 * @enum {string}
 */
const breakpointMap = {
    vertical: '(max-aspect-ratio: 4/3)',
    landscape: '(orientation: landscape)',
    'xs-up': `(min-width: ${variables['width-xs']})`,
    'sm-up': `(min-width: ${variables['width-sm']})`,
    'md-up': `(min-width: ${variables['width-md']})`,
    'lg-up': `(min-width: ${variables['width-lg']})`,
    'xl-up': `(min-width: ${variables['width-xl']})`,
    'xxl-up': `(min-width: ${variables['width-xxl']})`,
    'xxxl-up': `(min-width: ${variables['width-xxxl']})`,
    'xs-down': `(max-width: ${variables['width-xs']})`,
    'sm-down': `(max-width: ${variables['width-sm']})`,
    'md-down': `(max-width: ${variables['width-md']})`,
    'lg-down': `(max-width: ${variables['width-lg']})`,
    'xl-down': `(max-width: ${variables['width-xl']})`,
    'xxl-down': `(max-width: ${variables['width-xxl']})`,
    'xxxl-down': `(max-width: ${variables['width-xxxl']})`,
};

/**
 * Returns media query with provided breakpointMap values
 * @param {object} mixin - parent node.
 * @param {string} breakpoints - rest parameters should be breakpoints.
 * @return {object} mixin - returns mixin content.
 */
const media = (mixin, ...breakpoints) => {
    const conditions = getValues(breakpointMap, ...breakpoints);

    let mediaQuery = '@media screen';

    for (const condition of conditions) {
        if (condition) {
            mediaQuery = `${mediaQuery} and ${condition}`;
        }
    }

    return {
        [mediaQuery]: {
            '@mixin-content': {},
        },
    };
};

/**
 * Sets clipping rules for non-fit text.
 * @param {object} mixin - parent node.
 * @param {string} [overflow = 'ellipsis'] textOverflow - text-overflow value.
 * @param {boolean} [addWhiteSpace = true] - if `true` nowrap white-space property will be applied.
 * @return {object} mixin - returns mixin content.
 *
 * @example css
 *      `@mixin textOverflow;`
 *      `@mixin text-overflow clip;`
 *      `@mixin text-overflow ellipsis, false;`
 */
const textOverflow = (mixin, overflow = 'ellipsis', addWhiteSpace = true) => {
    const mixinContent = {
        overflow: 'hidden',
        'text-overflow': overflow,
    };

    if (addWhiteSpace) {
        mixinContent['white-space'] = 'nowrap';
    }

    return mixinContent;
};

/**
 * Centers both horizontally and vertically or in one direction,
 *      assuming parent element has `position: relative;` property.
 *
 * @param {object} mixin - parent node
 * @param {"X" | "Y"} [axis]
 *      string represents `axis`, if nothing passed - centers in both directions.
 * @return {object} mixin - returns mixin content.
 *
 * @example
 *  @include center-absolute;
 *  @include center-absolute(X);
 *  @include center-absolute(Y);
 */
const centerAbsolute = (mixin, axis) => ({
    position: 'absolute',
    ...(() => {
        switch (axis) {
            case 'X': {
                return {
                    left: '50%',
                    transform: 'translateX(-50%)',
                };
            }
            case 'Y': {
                return {
                    top: '50%',
                    transform: 'translateY(-50%)',
                };
            }
            default: {
                return {
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                };
            }
        }
    })(),
});

module.exports = {
    breakpointMap,
    fontSize,
    media,
    textOverflow,
    centerAbsolute,
};
