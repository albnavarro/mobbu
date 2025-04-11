// @ts-check

/**
 * @type {Set<{ id: string; state: string; container: HTMLElement }>}
 */
export const activeRepeatMap = new Set();

/**
 * Set active repeat
 *
 * @param {object} obj
 * @param {string} obj.id
 * @param {string} obj.state
 * @param {HTMLElement} obj.container
 * @returns {void}
 */
export const addActiveRepeat = ({ id, state, container }) => {
    activeRepeatMap.add({ id, state, container });
};

/**
 * Remove active repeat
 *
 * @param {object} obj
 * @param {string} obj.id
 * @param {string} obj.state
 * @param {HTMLElement | undefined} obj.container
 * @returns {void}
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
 * Get active repeat
 *
 * @param {object} obj
 * @param {string} obj.id
 * @param {string} obj.state
 * @param {HTMLElement | undefined} obj.container
 * @returns {boolean}
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
