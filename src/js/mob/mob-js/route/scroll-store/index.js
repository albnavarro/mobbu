/**
 * @type {boolean}
 */
let shouldRestoreScroll = true;

/**
 * @param {boolean} shouldRestore
 * @returns {void}
 */
export const setRestoreScroll = (shouldRestore) => {
    shouldRestoreScroll = shouldRestore;
};

/**
 * @returns {boolean}
 */
export const getRestoreScroll = () => shouldRestoreScroll;
