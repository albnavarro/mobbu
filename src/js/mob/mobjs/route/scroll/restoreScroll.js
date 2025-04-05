// @ts-check

/**
 * @type {boolean}
 */
let restoreScroll = true;

/**
 * @param {boolean} value
 * @returns { void }
 *
 * @description
 */
export const setRestoreScroll = (value) => {
    restoreScroll = value;
};

/**
 * @returns {boolean}
 *
 * @description
 */
export const getRestoreScroll = () => restoreScroll;
