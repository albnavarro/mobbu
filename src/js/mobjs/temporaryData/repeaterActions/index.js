// @ts-check

/**
 * @type {Set<{'id':String,'state':String,'container':HTMLElement}>}
 */
export const activeRepeatMap = new Set();

/**
 * @param {Object} obj
 * @param {String} obj.id
 * @param {String} obj.state
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
 * @param {Object} obj
 * @param {String} obj.id
 * @param {String} obj.state
 * @param {HTMLElement} obj.container
 * @return void
 *
 * @description
 * Remove active repeat
 */
export const removeActiveRepeat = ({ id, state, container }) => {
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
 * @param {Object} obj
 * @param {String} obj.id
 * @param {String} obj.state
 * @param {HTMLElement} obj.container
 * @return {Boolean}
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
