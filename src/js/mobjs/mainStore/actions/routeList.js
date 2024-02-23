// @ts-check

import {
    MAIN_STORE_INDEX_PAGE,
    MAIN_STORE_PAGE_NOT_FOUND,
    MAIN_STORE_ROUTE_LIST,
} from '../constant';
import { mainStore } from '../mainStore';

/**
 * @param {{string:function():string}|{}} list
 * @returns void
 *
 * @description
 * Add route list to store.
 */
export const setRouteList = (list) => {
    const listParsed = Object.entries(list).reduce((previous, current) => {
        const [key, value] = current;
        return { ...previous, [key]: value };
    }, {});

    mainStore.set(MAIN_STORE_ROUTE_LIST, listParsed);
};

/**
 * @returns {{string:function():string}|{}} list
 *
 * @description
 * Get route list to store.
 */
export const getRouteList = () => {
    const { routeList } = mainStore.get();
    return routeList;
};

/**
 * @param {Object} obj
 * @param {String} obj.routeName
 * @returns void
 *
 * @description
 * Set index route.
 */
export const setIndex = ({ routeName = '' }) => {
    mainStore.set(MAIN_STORE_INDEX_PAGE, routeName);
};

/**
 * @returns  String
 *
 * @description
 * Get index route.
 */
export const getIndex = () => {
    const { index } = mainStore.get();
    return index;
};

/**
 * @param {Object} obj
 * @param {String} obj.routeName
 * @returns void
 *
 * @description
 * Set pageNotFound route.
 */
export const setPageNotFound = ({ routeName = '' }) => {
    mainStore.set(MAIN_STORE_PAGE_NOT_FOUND, routeName);
};

/**
 * @returns  String
 *
 * @description
 * Get pageNotFound route.
 */
export const getPageNotFound = () => {
    const { pageNotFound } = mainStore.get();
    return pageNotFound;
};
