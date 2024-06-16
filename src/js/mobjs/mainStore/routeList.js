// @ts-check

/**
 * @type {import("../type").routeType[]}
 */
let routeList = [];

/**
 * @type {string}
 */
let indexPage = '';

/**
 * @type {string}
 */
let pageNotFound = '';

/**
 * @param {import("../type").routeType[]} list
 * @returns void
 *
 * @description
 * Add route list to store.
 */
export const setRouteList = (list) => {
    routeList = [...list];
};

/**
 * @param {object} obj
 * @param {string} obj.routeName
 * @return {import("../type").routeType}
 *
 * @description
 * Get route list to store.
 */
export const getRouteByName = ({ routeName = '' }) => {
    return routeList.find(({ name }) => routeName === name);
};

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
