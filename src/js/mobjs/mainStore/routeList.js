// @ts-check

/**
 * @type {import("../type").pagesType}
 */
let routeList = {};

/**
 * @type {string}
 */
let indexPage = '';

/**
 * @type {string}
 */
let pageNotFound = '';

/**
 * @param {import("../type").pagesType} list
 * @returns void
 *
 * @description
 * Add route list to store.
 */
export const setRouteList = (list) => {
    routeList = { ...list };
};

/**
 * @returns {import("../type").pagesType} list
 *
 * @description
 * Get route list to store.
 */
export const getRouteList = () => routeList;

/**
 * @param {object} obj
 * @param {string} obj.routeName
 * @returns void
 *
 * @description
 * Set index route.
 */
export const setIndex = ({ routeName = '' }) => {
    indexPage = routeName;
};

/**
 * @returns  string
 *
 * @description
 * Get index route.
 */
export const getIndex = () => indexPage;

/**
 * @param {object} obj
 * @param {string} obj.routeName
 * @returns void
 *
 * @description
 * Set pageNotFound route.
 */
export const setPageNotFound = ({ routeName = '' }) => {
    pageNotFound = routeName;
};

/**
 * @returns  string
 *
 * @description
 * Get pageNotFound route.
 */
export const getPageNotFound = () => pageNotFound;
