// @ts-check

import { runCallbackQueqe, runCallbackQueqeAsync } from './fireQueque';
import { getLogStyle } from './logStyle';
import { getStateFromMainMap, storeMap } from './storeMap';
import { addToComputedWaitLsit } from './storeSet';
import { storeEmitWarning } from './storeWarining';

/**
 * @param {Object} param
 * @param {string} param.instanceId
 * @param {string} param.prop
 * @returns {void}
 */
export const storeEmit = ({ instanceId, prop }) => {
    const { store, callBackWatcher, validationStatusObject } =
        getStateFromMainMap(instanceId);

    if (!store) return;

    if (prop in store) {
        runCallbackQueqe({
            callBackWatcher,
            prop,
            newValue: store[prop],
            oldValue: store[prop],
            validationValue: validationStatusObject[prop],
            instanceId,
        });

        addToComputedWaitLsit({ instanceId, prop });
    } else {
        storeEmitWarning(prop, getLogStyle());
    }
};

/**
 * @param {Object} param
 * @param {string} param.instanceId
 * @param {string} param.prop
 * @returns {void}
 */
export const storeEmitEntryPoint = ({ instanceId, prop }) => {
    const state = getStateFromMainMap(instanceId);
    const { bindInstance } = state;

    if (!bindInstance || bindInstance.length === 0) {
        storeEmit({ instanceId, prop });
    }

    const currentBindId =
        [instanceId, ...bindInstance].find(
            (id) => prop in storeMap.get(id).store
        ) ?? '';

    return storeEmit({ instanceId: currentBindId, prop });
};

/**
 * @param {Object} param
 * @param {string} param.instanceId
 * @param {string} param.prop
 * @returns {Promise<any>}
 */
export const storeEmitAsync = async ({ instanceId, prop }) => {
    const { store, callBackWatcher, validationStatusObject } =
        getStateFromMainMap(instanceId);

    if (!store) return { success: false };

    if (prop in store) {
        await runCallbackQueqeAsync({
            callBackWatcher,
            prop,
            newValue: store[prop],
            oldValue: store[prop],
            validationValue: validationStatusObject[prop],
            instanceId,
        });

        addToComputedWaitLsit({ instanceId, prop });

        return { success: true };
    } else {
        storeEmitWarning(prop, getLogStyle());
        return { success: false };
    }
};

/**
 * @param {Object} param
 * @param {string} param.instanceId
 * @param {string} param.prop
 * @returns {Promise<any>}
 */
export const storeEmitAsyncEntryPoint = async ({ instanceId, prop }) => {
    const state = getStateFromMainMap(instanceId);
    const { bindInstance } = state;

    if (!bindInstance || bindInstance.length === 0) {
        return storeEmitAsync({ instanceId, prop });
    }

    const currentBindId =
        [instanceId, ...bindInstance].find(
            (id) => prop in storeMap.get(id).store
        ) ?? '';

    return storeEmitAsync({
        instanceId: currentBindId,
        prop,
    });
};
