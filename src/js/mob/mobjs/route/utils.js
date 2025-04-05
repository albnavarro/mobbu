// @ts-check

import { getIndex, getPageNotFound, getRouteByName } from './routeList';

/**
 * @param {object} obj
 * @param {string} obj.url
 * @returns {string}
 *
 * @description
 * Validate url, in not exist return pageNotFound.
 */
export const getRouteModule = ({ url = '' }) => {
    const index = getIndex();
    const pageNotFound = getPageNotFound();

    if (url === '') return index;

    return getRouteByName({ routeName: url }) ? url : pageNotFound;
};

/**
 * @param {object} obj
 * @param {string} obj.url
 * @returns {string}
 *
 * @description
 * Validate url, in not exist return pageNotFound.
 */
export const getTemplateName = ({ url = '' }) => {
    return getRouteByName({ routeName: url })?.templateName ?? '';
};

/**
 * @param {object} obj
 * @param {string} obj.url
 * @returns {boolean}
 *
 * @description
 * Validate url, in not exist return pageNotFound.
 */
export const getRestoreScrollVale = ({ url = '' }) => {
    return getRouteByName({ routeName: url })?.restoreScroll ?? true;
};
