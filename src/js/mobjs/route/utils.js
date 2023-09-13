// @ts-check

import { getRouteList } from '../mainStore/actions/routeList';
import { mainStore } from '../mainStore/mainStore';

/**
 * @param {Object} obj
 * @param {string} obj.url
 * @returns {String}
 *
 * @description
 * Validate url, in not exixst return pageNotFound.
 */
export const getRouteModule = ({ url = '' }) => {
    const { index, pageNotFound } = mainStore.get();

    if (url === '') return index;
    return url in getRouteList() ? url : pageNotFound;
};
