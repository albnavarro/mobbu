/**
 * @type {boolean}
 */
let shouldRestoreScroll = true;

/**
 * @param {boolean} value
 * @returns {void}
 */
export const setRestoreScroll = (value) => {
    shouldRestoreScroll = value;
};

/**
 * @returns {boolean}
 */
export const getRestoreScroll = () => shouldRestoreScroll;
