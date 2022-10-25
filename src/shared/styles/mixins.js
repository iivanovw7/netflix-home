/**
 * POSTCSS mixins
 * @module styles/mixins
 */

'use strict';

const { opacify } = require('./functions');
const { getValues, getButtonColorsSet } = require('./utils');
const variables = require('./variables.json');

/* eslint-disable node/no-unsupported-features/es-syntax */

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
        'line-height': lineHeight
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
            '@mixin-content': {}
        }
    };
};

/**
 * Used to add button color styles.
 * @param {object} mixin - parent node.
 * @param {'primary' | 'secondary' | 'tertiary'} [variant = 'primary'] - color variant.
 * @param {'full' | 'outlined' | 'none'} [fill = 'full'] - color fill prop.
 * @return {object} mixin - returns mixin content.
 */
const buttonColors = (mixin, variant = 'primary', fill = 'full') => {
    const { main, disabled, text, accent } = getButtonColorsSet(variant);
    const isoOutlined = fill === 'outlined';
    const isFillNone = fill === 'none';

    const FULL_FRAC = 0.8;
    const OUTLINE_FRAC = 0.8;
    const FILL_NONE_FRAC = 0.9;

    return {
        color: text,
        'background-color': main,

        ...(isoOutlined && {
            border: `1px solid ${main}`,
            'background-color': 'transparent',
        }),

        ...(isFillNone && {
            border: 'none',
            'background-color': 'transparent',
        }),

        '&:hover, &:focus-visible': {
            'background-color': opacify(main, FULL_FRAC),

            ...(isoOutlined && {
                color: opacify(accent, OUTLINE_FRAC),
                'background-color': 'transparent',
                'border-color': opacify(accent, OUTLINE_FRAC),
            }),

            ...(isFillNone && {
                color: opacify(accent, FILL_NONE_FRAC),
                'background-color': 'transparent',
                'border-color': opacify(accent, FILL_NONE_FRAC),
            }),
        },

        '&:disabled': {
            'background-color': disabled,
            'border-color': disabled,

            ...(isoOutlined && {
                'background-color': 'transparent',
                'border-color': disabled,
            }),

            ...(isFillNone && {
                'background-color': 'transparent',
            }),
        }
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
        'text-overflow': overflow
    };

    if (addWhiteSpace) {
        mixinContent['white-space'] = 'nowrap';
    }

    return mixinContent;
};

/**
 * Aligns element`s children vertically and justifies horizontally (along main axis) using flex.
 * @param {object} mixin - parent node
 * @param {string} [justifyContent = 'center'] justify-content css rule.
 * @param {string} [alignItems = 'center'] align-items css rule.
 * @return {object} mixin - returns mixin content.
 *
 * @example
 *    `@mixin justifyAlignFlex;`
 *    `@mixin justifyAlignFlex unset;`
 *    `@mixin justifyAlignFlex stretch, flex-end;`
 */
const justifyAlignFlex = (mixin, justifyContent = 'center', alignItems = 'center') => {
    return {
        display: 'flex',
        'align-items': alignItems,
        'justify-content': justifyContent
    };
};

module.exports = {
    fontSize,
    media,
    buttonColors,
    textOverflow,
    justifyAlignFlex
};

/* eslint-enable node/no-unsupported-features/es-syntax */
