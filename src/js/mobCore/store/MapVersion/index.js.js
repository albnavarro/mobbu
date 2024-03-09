// @ts-check

import { getUnivoqueId } from '../../utils';
import { storeSetEntryPoint } from './storeSet';
import { storeMap, removeFromMainMap } from './storeMap';
import { inizializeValidation } from './initialValidation';
import { watchEntryPoint } from './watch';
import { storeComputedEntryPoint } from './computed';
import { inizializeInstance } from './inizializeInstance';
import { storeGetEntryPoint, storeGetPropEntryPoint } from './storeGet';
import { storeEmitAsyncEntryPoint, storeEmitEntryPoint } from './storeEmit';
import {
    storeDebugStoreEntryPoint,
    storeDebugValidateEntryPoint,
    storeGetValidationEntryPoint,
} from './storeDebug';

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
     * Initialize
     */
    const instanceParams = inizializeInstance(data);

    /**
     * Add new store to main Map.
     */
    storeMap.set(instanceId, instanceParams);

    /**
     * First validation
     */
    inizializeValidation(instanceId, instanceParams);

    /**
     * Methods
     */
    return {
        get: () => {
            return storeGetEntryPoint(instanceId);
        },
        getProp: (prop) => {
            return storeGetPropEntryPoint({ instanceId, prop });
        },
        set: (prop, value, fireCallback = true, clone = false) => {
            return storeSetEntryPoint({
                instanceId,
                prop,
                value,
                fireCallback,
                clone,
            });
        },
        watch: (prop, callback) => {
            return watchEntryPoint({ instanceId, prop, callback });
        },
        computed: (prop, keys, callback) => {
            return storeComputedEntryPoint({
                instanceId,
                prop,
                keys,
                callback,
            });
        },
        emit: (prop) => {
            return storeEmitEntryPoint({ instanceId, prop });
        },
        emitAsync: async (prop) => {
            return storeEmitAsyncEntryPoint({ instanceId, prop });
        },
        getValidation: () => {
            return storeGetValidationEntryPoint({ instanceId });
        },
        debugStore: () => {
            storeDebugStoreEntryPoint({ instanceId });
        },
        debugValidate: () => {
            storeDebugValidateEntryPoint({ instanceId });
        },
        destroy: () => {
            removeFromMainMap(instanceId);
        },
    };
};
