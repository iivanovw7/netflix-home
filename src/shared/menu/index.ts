/**
 * Contains application navigation menu.
 * @module shared/menu
 */
import { routePath } from '../../pages/routes';

const {
    browse,
    genre,
    latest,
    list
} = routePath;

export type MenuItem = {
    disabled?: boolean;
    replace?: boolean;
    text: string;
    to: string;
};

/**
 * Object representing single menu item.
 * @typedef {Object} module:shared/Menu~menuItem
 * @property {string} to - navigation path.
 * @property {string} text - title text.
 * @property {boolean} [disabled] - if item is disabled.
 */

/**
 * Set of application menu items.
 * @type {Object.<string, module:~/shared/Menu~menuItem>}
 */
export const menuItemSet: Record<string, MenuItem> = {
    home: {
        to: browse,
        text: 'Home'
    },
    shows: {
        to: `${genre}/tv-shows`,
        text: 'TV Shows',
        disabled: true,
    },
    latest: {
        to: latest,
        text: 'New & Popular',
        disabled: true
    },
    list: {
        to: list,
        text: 'My List',
        disabled: true
    },
};

/**
 * Creates a list of navigation options.
 * @return {Array.<module:~/shared/menu~menuItem>} menu items list.
 */
export const getMenuItems = (): Array<MenuItem> => Object.values(menuItemSet);
