// @ts-check

/**
 * @type {boolean}
 */
let restoreScroll = true;

/**
 * @param {boolean} value
 * @returns {void}
 */
export const setRestoreScroll = (value) => {
    restoreScroll = value;
};

/**
 * @returns {boolean}
 */
export const getRestoreScroll = () => restoreScroll;
