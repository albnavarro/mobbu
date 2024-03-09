// @ts-check

import { getUnivoqueId } from '../../utils';
import { storeSetAction } from './storeSet';
import {
    getFormMainMap,
    updateMainMap,
    storeMap,
    removeFromMainMap,
} from './storeMap';
import {
    inizializeSpecificProp,
    inizializeStoreData,
    maxDepth,
} from './storeUtils';
import { UNTYPED } from './storeType';
import { inizializeValidation } from './initialValidation';
import { getLogStyle } from './logStyle';
import { storeWatchAction } from './watch';
import { runCallbackQueqe, runCallbackQueqeAsync } from './fireQueque';
import { storeEmitWarning, storeGetPropWarning } from './storeWarining';
import { storeComputedAction } from './computed';

/**
 * @param {import('./type').simpleStoreBaseData} data
 * @returns {import('./type').storePublicMethods}
 */
export const mobStore = (data = {}) => {
    /**
     * Get new uniquie id for new store.
     */
    const instanceId = getUnivoqueId();

    /**
     * @type {number}
     */
    const dataDepth = maxDepth(data);

    /**
     * Initialize
     */
    const instanceParams = {
        callBackWatcher: new Map(),
        callBackComputed: new Set(),
        computedPropFired: new Set(),
        computedWaitList: new Set(),
        validationStatusObject: {},
        dataDepth,
        computedRunning: false,
        store: inizializeStoreData({
            data,
            depth: dataDepth,
            logStyle: getLogStyle(),
        }),
        type: inizializeSpecificProp({
            data,
            prop: 'type',
            depth: dataDepth,
            logStyle: getLogStyle(),
            fallback: UNTYPED,
        }),
        fnValidate: inizializeSpecificProp({
            data,
            prop: 'validate',
            depth: dataDepth,
            logStyle: getLogStyle(),
            fallback: () => true,
        }),
        strict: inizializeSpecificProp({
            data,
            prop: 'strict',
            depth: dataDepth,
            logStyle: getLogStyle(),
            fallback: false,
        }),
        skipEqual: inizializeSpecificProp({
            data,
            prop: 'skipEqual',
            depth: dataDepth,
            logStyle: getLogStyle(),
            fallback: true,
        }),
    };

    /**
     * Add new store to main Map.
     */
    storeMap.set(instanceId, instanceParams);
    inizializeValidation(instanceId, instanceParams);

    return {
        get: () => {
            const { store } = getFormMainMap(instanceId);
            return store;
        },
        getProp: (prop) => {
            const { store } = getFormMainMap(instanceId);
            if (!store) return;

            if (prop in store) {
                return store[prop];
            } else {
                storeGetPropWarning(prop, getLogStyle());
                return;
            }
        },
        set: (prop, value, fireCallback = true, clone = false) => {
            const state = getFormMainMap(instanceId);
            if (!state) return;

            const newState = storeSetAction({
                state,
                prop,
                value,
                fireCallback,
                clone,
            });

            if (!newState) return;
            updateMainMap(instanceId, newState);
        },
        watch: (prop, callback) => {
            const state = getFormMainMap(instanceId);
            if (!state) return () => {};

            const { state: newState, unsubscribeId } = storeWatchAction({
                state,
                prop,
                callback,
            });

            if (!newState) return () => {};
            updateMainMap(instanceId, newState);

            return () => {
                const state = getFormMainMap(instanceId);
                const { callBackWatcher } = state;
                callBackWatcher.delete(unsubscribeId);
                updateMainMap(instanceId, { ...state, callBackWatcher });
            };
        },
        computed: (prop, keys, callback) => {
            const state = getFormMainMap(instanceId);
            if (!state) return () => {};

            const newState = storeComputedAction({
                state,
                prop,
                keys,
                fn: callback,
            });

            if (!newState) return;
            updateMainMap(instanceId, newState);
        },
        emit: (prop) => {
            const { store, callBackWatcher, validationStatusObject } =
                getFormMainMap(instanceId);

            if (!store) return;

            if (prop in store) {
                runCallbackQueqe({
                    callBackWatcher,
                    prop,
                    newValue: store[prop],
                    oldValue: store[prop],
                    validationValue: validationStatusObject[prop],
                });
            } else {
                storeEmitWarning(prop, getLogStyle());
            }
        },
        emitAsync: async (prop) => {
            const { store, callBackWatcher, validationStatusObject } =
                getFormMainMap(instanceId);

            if (!store) return { success: false };

            if (prop in store) {
                await runCallbackQueqeAsync({
                    callBackWatcher,
                    prop,
                    newValue: store[prop],
                    oldValue: store[prop],
                    validationValue: validationStatusObject[prop],
                });

                return { success: true };
            } else {
                storeEmitWarning(prop, getLogStyle());
                return { success: false };
            }
        },
        getValidation: () => {
            const { validationStatusObject } = getFormMainMap(instanceId);
            return validationStatusObject;
        },
        debugStore: () => {
            const { store } = getFormMainMap(instanceId);
            console.log(store);
        },
        debugValidate: () => {
            const { validationStatusObject } = getFormMainMap(instanceId);
            console.log(validationStatusObject);
        },
        destroy: () => {
            removeFromMainMap(instanceId);
        },
    };
};
