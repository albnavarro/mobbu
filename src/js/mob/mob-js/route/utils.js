import { getIndex, getPageNotFound, getRouteByHash } from './route-list';

/**
 * Validate url, in not exist return pageNotFound.
 *
 * @param {object} obj
 * @param {string} obj.hash
 * @returns {string}
 */
export const getRouteModule = ({ hash = '' }) => {
    const index = getIndex();
    const pageNotFound = getPageNotFound();

    if (hash === '') return index;

    return getRouteByHash({ hash }) ? hash : pageNotFound;
};

/**
 * Validate url, in not exist return pageNotFound.
 *
 * @param {object} obj
 * @param {string} obj.hash
 * @returns {string}
 */
export const getTemplateName = ({ hash = '' }) => {
    return getRouteByHash({ hash })?.templateName ?? '';
};

/**
 * Validate url, in not exist return pageNotFound.
 *
 * @param {object} obj
 * @param {string} obj.hash
 * @returns {boolean}
 */
export const getRestoreScrollVale = ({ hash = '' }) => {
    return getRouteByHash({ hash })?.restoreScroll ?? true;
};
