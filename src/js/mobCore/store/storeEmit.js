// @ts-check

import { runCallbackQueqe, runCallbackQueqeAsync } from './fireQueque';
import { getLogStyle } from './logStyle';
import { storeProcessAsync, getStateFromMainMap, storeMap } from './storeMap';
import { addToComputedWaitLsit } from './storeSet';
import { storeEmitWarning } from './storeWarining';

/**
 * @param {Object} param
 * @param {string} param.instanceId
 * @param {string} param.prop
 * @returns {void}
 */
export const storeEmit = ({ instanceId, prop }) => {
    const state = getStateFromMainMap(instanceId);
    if (!state) return;
    const { store, callBackWatcher, validationStatusObject } = state;

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
    if (!state) return;

    const { bindInstance } = state;

    if (!bindInstance || bindInstance.length === 0) {
        storeEmit({ instanceId, prop });
    }

    const currentBindId =
        [instanceId, ...bindInstance].find((id) => {
            const store = storeMap.get(id)?.store;
            return store && prop in store;
        }) ?? '';

    return storeEmit({ instanceId: currentBindId, prop });
};

/**
 * @param {Object} param
 * @param {string} param.instanceId
 * @param {string} param.prop
 * @param {import('./type').storeMapValue} param.state
 * @returns {Promise<any>}
 */
export const storeEmitAsync = async ({ instanceId, prop, state }) => {
    const { store, callBackWatcher, validationStatusObject } = state;

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
 * @param {import('./type').storeMapValue} param.state
 * @returns {Promise<any>}
 */
export const storeEmitAsyncEntryPoint = async ({ instanceId, prop, state }) => {
    const { bindInstance } = state;

    if (!bindInstance || bindInstance.length === 0) {
        return storeProcessAsync((state) =>
            storeEmitAsync({
                instanceId,
                prop,
                state,
            })
        )(instanceId);
    }

    const currentBindId =
        [instanceId, ...bindInstance].find((id) => {
            const store = storeMap.get(id)?.store;
            return store && prop in store;
        }) ?? '';

    return storeProcessAsync((state) =>
        storeEmitAsync({
            instanceId: currentBindId,
            prop,
            state,
        })
    )(instanceId);
};
