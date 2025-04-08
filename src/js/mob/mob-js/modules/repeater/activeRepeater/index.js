// @ts-check

/**
 * @type {Set<{'id':string,'state':string,'container':HTMLElement}>}
 */
export const activeRepeatMap = new Set();

/**
 * @param {object} obj
 * @param {string} obj.id
 * @param {string} obj.state
 * @param {HTMLElement} obj.container
 * @return void
 *
 * @description
 * Set active repeat
 */
export const addActiveRepeat = ({ id, state, container }) => {
    activeRepeatMap.add({ id, state, container });
};

/**
 * @param {object} obj
 * @param {string} obj.id
 * @param {string} obj.state
 * @param {HTMLElement|undefined} obj.container
 * @return void
 *
 * @description
 * Remove active repeat
 */
export const removeActiveRepeat = ({ id, state, container }) => {
    if (!container) return;

    activeRepeatMap.forEach((repeat) => {
        if (
            id === repeat.id &&
            state === repeat.state &&
            container === repeat.container
        ) {
            activeRepeatMap.delete(repeat);
        }
    });
};

/**
 * @param {object} obj
 * @param {string} obj.id
 * @param {string} obj.state
 * @param {HTMLElement|undefined} obj.container
 * @return {boolean}
 *
 * @description
 * Get active repeat
 */
export const getActiveRepeater = ({ id = '', state = '', container }) => {
    const repeatIsActive = [...activeRepeatMap].some((repeat) => {
        return (
            id === repeat.id &&
            state === repeat.state &&
            container === repeat.container
        );
    });

    return repeatIsActive;
};
