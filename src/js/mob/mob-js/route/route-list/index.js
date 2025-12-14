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
 * @param {string} obj.hash
 * @returns {import('../../type').Route | undefined}
 */
export const getRouteByHash = ({ hash = '' }) => {
    return routeList.find(({ hash: currentHash }) => hash === currentHash);
};

/**
 * Set index route.
 *
 * @param {object} obj
 * @param {string} obj.hash
 * @returns {void}
 */
export const setIndex = ({ hash = '' }) => {
    indexPage = hash;
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
 * @param {string} obj.hash
 * @returns {void}
 */
export const setPageNotFound = ({ hash = '' }) => {
    pageNotFound = hash;
};

/**
 * Get pageNotFound route.
 *
 * @returns String
 */
export const getPageNotFound = () => pageNotFound;
