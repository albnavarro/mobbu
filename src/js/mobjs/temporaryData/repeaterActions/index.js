// @ts-check

import { mainStore } from '../../mainStore/mainStore';

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
    mainStore.set('activeRepeat', (/** @type {Array} */ prev) => {
        return [...prev, { id, state, container }];
    });
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
    mainStore.set('activeRepeat', (/** @type {Array} */ prev) => {
        return prev.filter(
            ({
                id: currentId,
                state: currentState,
                container: currentContainer,
            }) =>
                id !== currentId &&
                state !== currentState &&
                container !== currentContainer
        );
    });
};

/**
 * @param {Object} obj
 * @param {String} obj.id
 * @param {String} obj.state
 * @param {HTMLElement} obj.container
 * @return {{id:String, state:String, container:HTMLElement}}
 *
 * @description
 * Get active repeat
 */
export const getActiveRepeater = ({ id = '', state = '', container }) => {
    const { activeRepeat } = mainStore.get();
    return activeRepeat.find((/** @type {Object} */ item) => {
        return (
            item.id === id &&
            item.state === state &&
            item.container === container
        );
    });
};
