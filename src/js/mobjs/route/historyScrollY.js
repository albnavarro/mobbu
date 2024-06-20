/**
 * @type {number[]}
 */
const historyBack = [];

/**
 * @type {number[]}
 */
const historyNext = [];

const deleteLastHistoryBack = () => {
    const arrayLenght = historyBack.length;
    if (arrayLenght >= 1) historyBack.length = historyBack.length - 1;
};

const deleteLastHistoryNext = () => {
    const arrayLenght = historyNext.length;
    console.log(arrayLenght);
    if (arrayLenght >= 1) historyNext.length = historyNext.length - 1;
};

/**
 * @param {number} value
 * @returns {void}
 */
export const setHistoryBack = (value) => {
    historyBack.push(value);
};

/**
 * @param {number} value
 * @returns {void}
 */
export const setHistoryNext = (value) => {
    historyNext.push(value);
};

/**
 * @returns {number|undefined}
 */
const getLastHistoryBack = () => {
    const value = historyBack.at(-1);
    deleteLastHistoryBack();
    return value;
};

/**
 * @returns {number|undefined}
 */
const getLastHistoryNext = () => {
    const value = historyNext.at(-2);
    deleteLastHistoryNext();
    return value;
};

export const getLastHistoryNext2 = () => {
    const value = historyNext.at(-1);
    return value;
};

/**
 * @returns {number|undefined}
 */
export const getLastHistory = (direction) => {
    if (direction === 'back') {
        return getLastHistoryBack();
    }

    return getLastHistoryNext();
};

export const pippodebug = () => {
    console.log('back', historyBack);
    console.log('next', historyNext);
};
