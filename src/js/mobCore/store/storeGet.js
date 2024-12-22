// @ts-check

import { getLogStyle } from './logStyle';
import { getStateFromMainMap, storeMap } from './storeMap';
import { storeGetPropWarning } from './storeWarining';

/**
 * @param {string} instanceId
 * @returns {{[key: string]: any|{ [key: string]: any }}}
 */
const storeGet = (instanceId) => {
    const { store } = getStateFromMainMap(instanceId);
    return store;
};

/**
 * @param {string} instanceId
 * @returns {{[key: string]: any|{ [key: string]: any }}}
 */
export const storeGetEntryPoint = (instanceId) => {
    const state = getStateFromMainMap(instanceId);
    const { bindInstance } = state;

    if (!bindInstance || bindInstance.length === 0) {
        return storeGet(instanceId);
    }

    return [...bindInstance, instanceId]
        .map((id) => storeGet(id))
        .reduce((previous, current) => ({ ...previous, ...current }), {});
};

/**
 * @param {Object} param
 * @param {string} param.instanceId
 * @param {string} param.prop
 * @returns {any}
 */
export const storeGetProp = ({ instanceId, prop }) => {
    const { store } = getStateFromMainMap(instanceId);
    if (!store) return;

    if (prop in store) {
        return store[prop];
    } else {
        storeGetPropWarning(prop, getLogStyle());
        return;
    }
};

/**
 * @param {Object} param
 * @param {string} param.instanceId
 * @param {string} param.prop
 * @returns {any}
 */
export const storeGetPropEntryPoint = ({ instanceId, prop }) => {
    const state = getStateFromMainMap(instanceId);
    const { bindInstance } = state;

    if (!bindInstance || bindInstance.length === 0) {
        return storeGetProp({ instanceId, prop });
    }

    const currentBindId =
        [instanceId, ...bindInstance].find(
            (id) => prop in storeMap.get(id).store
        ) ?? '';

    return storeGetProp({ instanceId: currentBindId, prop });
};
