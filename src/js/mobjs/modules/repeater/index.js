import { repeatFunctionMap } from './repeatFunctionMap';
import { repeatIdPlaceHolderMap } from './repeatIdPlaceHolderMap.js';
import { watchRepeat } from './watch';

/**
 * @returns {number}
 */
export const getNumberOfActiveRepeater = () => {
    return repeatIdPlaceHolderMap.size;
};

/**
 * @description
 * Add new repeat initialized in map.
 * key is component id associated to these function.
 *
 * @param {object} params
 * @param {string} params.id - component id
 * @param {string} params.repeatId - repeat id
 * @param {() => void} params.fn
 * @returns {void}
 */
export const setRepeatFunction = ({ id, repeatId, fn }) => {
    const currentFunctions = repeatFunctionMap.get(id) ?? [];
    repeatFunctionMap.set(id, [
        ...currentFunctions,
        { repeatId, fn, unsubscribe: () => {} },
    ]);
};

/**
 * @description
 * Add new repeat unsubScribe function in map.
 * key is component id associated to these function.
 *
 * @param {object} params
 * @param {string} params.id - component id
 * @param {string} params.repeatId - repeat id
 * @param {() => void} params.unsubscribe
 * @returns {void}
 */
export const addRepeatUnsubcribe = ({ id, repeatId, unsubscribe }) => {
    const currentFunctions = repeatFunctionMap.get(id) ?? [];
    const item = currentFunctions.map((item) => {
        if (item.repeatId === repeatId) {
            return { ...item, unsubscribe };
        }

        return item;
    });

    repeatFunctionMap.set(id, item);
};

/**
 * @description
 * Get repeat starter function to launch at the end of parseDOM
 *
 * @param {object} params
 * @param {string} params.id
 * @returns {Array<{repeatId: string, fn: () => void }>}
 */
export const getRepeatFunctions = ({ id }) => {
    return repeatFunctionMap.get(id) ?? [];
};

/**
 * @param {import('./type').watchListType} param
 * @return {void}
 */
export const inizializeRepeatWatch = ({
    repeatId,
    persistent,
    state,
    setState,
    emit,
    watch,
    clean,
    beforeUpdate,
    afterUpdate,
    key,
    id,
    render,
}) => {
    /**
     * Update component
     */
    const unsubscribe = watchRepeat({
        state,
        setState,
        persistent,
        emit,
        watch,
        clean,
        beforeUpdate,
        afterUpdate,
        key,
        id,
        repeatId,
        render,
    });

    addRepeatUnsubcribe({
        id,
        repeatId,
        unsubscribe,
    });
};
