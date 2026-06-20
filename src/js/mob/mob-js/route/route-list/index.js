import { setParentList } from './parent-tree';

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
 * @param {object} params
 * @param {string} params.currentHash
 * @param {string} params.currentName
 * @param {string} params.parentHash
 * @returns {{ hash: string; name: string }[]}
 */
const getPagePathRecursive = ({ currentHash, currentName, parentHash }) => {
    const parentPage = routeList.find(({ hash }) => hash === parentHash);
    if (!parentPage) return [{ name: currentName, hash: currentHash }];

    return [
        { name: currentName, hash: currentHash },
        ...getPagePathRecursive({
            currentHash: parentPage.hash,
            parentHash: parentPage?.parent ?? '',
            currentName: parentPage.pageName ?? '',
        }),
    ];
};

/**
 * Get page path from hash
 *
 * @param {object} params
 * @param {string} params.hash
 * @returns {{ hash: string; name: string }[]}
 */
export const getPagePath = ({ hash }) => {
    const lastDepthNode = routeList.find(
        ({ hash: firstlevelhash }) => firstlevelhash === hash
    );

    if (!lastDepthNode) return [];

    return getPagePathRecursive({
        parentHash: lastDepthNode?.parent ?? '',
        currentName: lastDepthNode?.pageName ?? '',
        currentHash: lastDepthNode.hash,
    }).toReversed();
};

/**
 * Add route list to store.
 *
 * @param {import('../../type').Route[]} list
 * @returns {void}
 */
export const setRouteList = (list) => {
    routeList = [...list];
    setParentList(list);
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
