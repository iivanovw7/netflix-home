/**
 * Module contains DropdownMenu constants.
 * @module shared/components/DropdownMenu/model/constants
 */

export const StaticSidesMap = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right'
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type StaticSidesMap = Readonly<typeof StaticSidesMap[keyof typeof StaticSidesMap]>;

/**
 * Dropdown arrow size in `px`.
 * @readonly
 * @type {number}
 */
export const ARROW_SIZE: Readonly<Pixels> = 8;

export const ItemTypeMap = {
    link: 'link',
    button: 'button',
    divider: 'divider'
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ItemTypeMap = Readonly<typeof ItemTypeMap[keyof typeof ItemTypeMap]>;
