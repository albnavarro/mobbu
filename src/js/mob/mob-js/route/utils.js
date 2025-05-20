import { getIndex, getPageNotFound, getRouteByName } from './route-list';

/**
 * Validate url, in not exist return pageNotFound.
 *
 * @param {object} obj
 * @param {string} obj.url
 * @returns {string}
 */
export const getRouteModule = ({ url = '' }) => {
    const index = getIndex();
    const pageNotFound = getPageNotFound();

    if (url === '') return index;

    return getRouteByName({ routeName: url }) ? url : pageNotFound;
};

/**
 * Validate url, in not exist return pageNotFound.
 *
 * @param {object} obj
 * @param {string} obj.url
 * @returns {string}
 */
export const getTemplateName = ({ url = '' }) => {
    return getRouteByName({ routeName: url })?.templateName ?? '';
};

/**
 * Validate url, in not exist return pageNotFound.
 *
 * @param {object} obj
 * @param {string} obj.url
 * @returns {boolean}
 */
export const getRestoreScrollVale = ({ url = '' }) => {
    return getRouteByName({ routeName: url })?.restoreScroll ?? true;
};
