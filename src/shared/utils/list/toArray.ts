/**
 * Module contains toArray util.
 * @module shared/utils/list/findOr
 */

/**
 * Casts value to array.
 * @func toArray
 * @category List
 * @param {any | Array.<any>} value - target value.
 * @return {Array.<any>} - value inside array or unchanged value if array was received.
 */
export const toArray = <T>(value: T): T extends unknown[] ? T : [T] => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return Array.isArray(value)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ? value as any
        : [value];
};
