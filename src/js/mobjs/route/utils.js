// @ts-check

import {
    getIndex,
    getPageNotFound,
    getRouteList,
} from '../mainStore/routeList';

/**
 * @param {object} obj
 * @param {string} obj.url
 * @returns {String}
 *
 * @description
 * Validate url, in not exist return pageNotFound.
 */
export const getRouteModule = ({ url = '' }) => {
    const index = getIndex();
    const pageNotFound = getPageNotFound();

    if (url === '') return index;
    return url in getRouteList() ? url : pageNotFound;
};
