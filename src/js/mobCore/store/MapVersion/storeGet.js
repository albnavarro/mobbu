// @ts-check

import { getLogStyle } from './logStyle';
import { getFormMainMap } from './storeMap';
import { storeGetPropWarning } from './storeWarining';

/**
 * @param {string} instanceId
 * @returns {{[key: string]: any|{ [key: string]: any }}}
 */
export const storeGetEntryPoint = (instanceId) => {
    const { store } = getFormMainMap(instanceId);
    return store;
};

/**
 * @param {Object} param
 * @param {string} param.instanceId
 * @param {string} param.prop
 * @returns {any}
 */
export const storeGetPropEntryPoint = ({ instanceId, prop }) => {
    const { store } = getFormMainMap(instanceId);
    if (!store) return;

    if (prop in store) {
        return store[prop];
    } else {
        storeGetPropWarning(prop, getLogStyle());
        return;
    }
};
