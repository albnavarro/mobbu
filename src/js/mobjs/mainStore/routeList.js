// @ts-check

/**
 * @type {{[key:string]: () => Promise.<string>}}
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
 * @param {{[key:string]: () => Promise.<string>}} list
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

    routeList = listParsed;
};

/**
 * @returns {{[key:string]: (arg0: {[key:string]: any}) => Promise.<string>}} list
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
