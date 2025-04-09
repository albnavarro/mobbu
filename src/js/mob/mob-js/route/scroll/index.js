import { HISTORY_BACK } from '../constant';

/**
 * @type {(import('../type').HistoryType | undefined)[]}
 */
const historyBack = [];

/**
 * @type {(import('../type').HistoryType | undefined)[]}
 */
let historyNext = [];

/**
 * @returns {void}
 */
const deleteLastHistoryBack = () => {
    const arrayLenght = historyBack.length;
    if (arrayLenght >= 1) historyBack.length = historyBack.length - 1;
};

/**
 * @returns {void}
 */
const deleteLastHistoryNext = () => {
    const arrayLenght = historyNext.length;
    if (arrayLenght >= 1) historyNext.length = historyNext.length - 1;
};

/**
 * @param {import('../type').HistoryType | undefined} value
 * @returns {void}
 */
export const setHistoryBack = (value) => {
    historyBack.push(value);
};

/**
 * @param {import('../type').HistoryType} value
 * @returns {void}
 */
export const setHistoryNext = (value) => {
    historyNext.push(value);
};

/**
 * @returns {void}
 */
export const resetNext = () => {
    historyNext = [];
};

/**
 * @returns {number}
 */
export const historyBackSize = () => {
    return historyBack.length;
};

/**
 * @returns {import('../type').HistoryType | undefined}
 */
const getLastHistoryBack = () => {
    const value = historyBack.at(-1);
    deleteLastHistoryBack();
    return value;
};

/**
 * @returns {import('../type').HistoryType | undefined}
 */
const getPenultimateHistoryNext = () => {
    const value = historyNext.at(-2);
    deleteLastHistoryNext();
    return value;
};

export const getLastHistoryNext = () => {
    const value = historyNext.at(-1);
    return value;
};

/**
 * @param {string} direction
 * @returns {import('../type').HistoryType | undefined}
 */
export const getLastHistory = (direction) => {
    if (direction === HISTORY_BACK) {
        return getLastHistoryBack();
    }

    return getPenultimateHistoryNext();
};
