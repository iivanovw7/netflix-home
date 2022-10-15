/**
 * Contains application routing config.
 * @module pages/routes
 */

/**
 * @readonly
 * @enum {string}
 */
export const basePath = {
    home: '/',
    browse: '/browse',
    notFound: '/404',
    search: '/search'
};

const { browse } = basePath;

/**
 * @readonly
 * @enum {string}
 */
export const routePath = {
    home: basePath.home,
    browse,
    genre: `${browse}/genre/:genreId`,
    latest: `${browse}/latest`,
    list: `${browse}/list`,
    search: basePath.search,
    notFound: basePath.notFound,
};
