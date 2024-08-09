// @ts-check

/**
 * @type {string}
 */
let domContentID = '';

/**
 * @param {object} obj
 * @param {string} obj.contentId
 * returns void
 *
 *
 * @description
 * Set root app.
 */
export const setContentId = ({ contentId = '' }) => {
    domContentID = contentId;
};

/**
 * @returns {string}
 *
 * @description
 * Set root app.
 */
export const getContentId = () => domContentID;
