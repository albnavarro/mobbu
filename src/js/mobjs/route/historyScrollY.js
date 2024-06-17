/**
 * @type {number[]}
 */
const historyScrollY = [];

export const deleteLastHistory = () => {
    const arrayLenght = historyScrollY.length;
    if (arrayLenght > 1) historyScrollY.length = historyScrollY.length - 1;
};

/**
 * @param {number} value
 * @returns {void}
 */
export const setHistoryScrollY = (value) => {
    historyScrollY.push(value);
};

/**
 * @returns {number|undefined}
 */
export const getLastHistoryScrollY = () => {
    const value = historyScrollY.at(-1);
    deleteLastHistory();
    return value;
};
