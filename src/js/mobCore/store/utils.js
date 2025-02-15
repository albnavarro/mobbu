import { getStateFromMainMap } from './storeMap';

/**
 * @param {Object} param
 * @param {string} param.instanceId
 * @param {string} param.prop
 * @returns {boolean}
 */
export const checkIfPropIsComputed = ({ instanceId, prop }) => {
    const state = getStateFromMainMap(instanceId);
    if (!state) return false;

    const { callBackComputed } = state;

    const isComputed = [...callBackComputed].some(
        ({ prop: currentProp }) => prop === currentProp
    );

    if (isComputed) {
        console.warn(
            `${prop} is used as computed, explicit set is disallowed.`
        );
    }

    return isComputed;
};
