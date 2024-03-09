// @ts-check

import { getLogStyle } from './logStyle';
import { getFormMainMap, updateMainMap } from './storeMap';
import { storeComputedKeyUsedWarning } from './storeWarining';

/**
 * @param {import("./type").storeComputedAction} params
 * @returns {import("./type").storeMapValue|undefined}
 */
export const storeComputedAction = ({ state, prop, keys, fn }) => {
    const { callBackComputed } = state;

    // Create a temp array with the future computed added to check
    const tempComputedArray = [...callBackComputed, { prop, keys, fn }];

    // Get all prop stored in tempComputedArray
    const propList = tempComputedArray.flatMap((item) => item.prop);

    //  Keys can't be a prop used in some computed
    const keysIsusedInSomeComputed = propList.some((item) =>
        keys.includes(item)
    );

    /**
     * if - Key to watch can't be a prop used in some computed to avoid infinite loop
     *
     * @param  {boolean} keysIsusedInSomeComputed
     * @return {void}
     */
    if (keysIsusedInSomeComputed) {
        storeComputedKeyUsedWarning(keys, getLogStyle());
        return;
    }

    callBackComputed.add({
        prop,
        keys,
        fn,
    });

    return {
        ...state,
        callBackComputed,
    };
};

/**
 * @param {Object} param
 * @param {string} param.instanceId
 * @param {string[]} param.keys
 * @param {string} param.prop
 * @param {() => void} param.callback
 * @returns {void}
 */
export const storeComputedEntryPoint = ({
    instanceId,
    prop,
    keys,
    callback,
}) => {
    const state = getFormMainMap(instanceId);
    if (!state) return;

    const newState = storeComputedAction({
        state,
        prop,
        keys,
        fn: callback,
    });

    if (!newState) return;
    updateMainMap(instanceId, newState);
};
