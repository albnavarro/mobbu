/**
 * @type {string}
 */
let basePageName = '';

/**
 * Set root app.
 *
 * @param {object} obj
 * @param {string} obj.name
 */
export const setPageName = ({ name }) => {
    basePageName = name;
};

/**
 * Set root app.
 *
 * @returns {string}
 */
export const getPageName = () => basePageName;
