/**
 * @type {import('../../type').Route[]}
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
 * Add route list to store.
 *
 * @param {import('../../type').Route[]} list
 * @returns {void}
 */
export const setRouteList = (list) => {
    routeList = [...list];
};

/**
 * Get route list to store.
 *
 * @param {object} obj
 * @param {string} obj.routeName
 * @returns {import('../../type').Route | undefined}
 */
export const getRouteByName = ({ routeName = '' }) => {
    return routeList.find(({ name }) => routeName === name);
};

/**
 * Set index route.
 *
 * @param {object} obj
 * @param {string} obj.routeName
 * @returns {void}
 */
export const setIndex = ({ routeName = '' }) => {
    indexPage = routeName;
};

/**
 * Get index route.
 *
 * @returns String
 */
export const getIndex = () => indexPage;

/**
 * Set pageNotFound route.
 *
 * @param {object} obj
 * @param {string} obj.routeName
 * @returns {void}
 */
export const setPageNotFound = ({ routeName = '' }) => {
    pageNotFound = routeName;
};

/**
 * Get pageNotFound route.
 *
 * @returns String
 */
export const getPageNotFound = () => pageNotFound;
