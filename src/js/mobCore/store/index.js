// @ts-check

import { getUnivoqueId } from '../utils';
import {
    storeComputedEntryPoint,
    storeQuickSetEntrypoint,
    storeSetEntryPoint,
} from './storeSet';
import { updateMainMap } from './storeMap';
import { inizializeAllProps, inizializeValidation } from './initialValidation';
import { watchEntryPoint } from './watch';
import { inizializeInstance } from './inizializeInstance';
import { storeGetEntryPoint, storeGetPropEntryPoint } from './storeGet';
import { storeEmitAsyncEntryPoint, storeEmitEntryPoint } from './storeEmit';
import {
    storeDebugEntryPoint,
    storeDebugStoreEntryPoint,
    storeDebugValidateEntryPoint,
    storeGetValidationEntryPoint,
} from './storeDebug';
import { STORE_SET, STORE_UPDATE } from './constant';
import { getProxiEntryPoint } from './proxi';
import { bindStoreEntryPoint } from './bindStore';
import { destroyStoreEntryPoint } from './destroy';
import { checkIfPropIsComputed } from './utils';

/**
 * @param {import('./type').mobStoreBaseData} data
 * @returns {import('./type').MobStore<any>}
 */
export const mobStore = (data = {}) => {
    /**
     * Get new uniquie id for new store.
     */
    const instanceId = getUnivoqueId();

    /**
     * Initialize
     */
    const initialState = inizializeInstance(data);

    /**
     * Create validation object
     */
    const stateUpdated = inizializeValidation(initialState);
    updateMainMap(instanceId, stateUpdated);

    /**
     * Validate all props
     * Perform a set() on all props, and update state
     * First time strict has no effect
     */
    inizializeAllProps(instanceId, initialState);

    /**
     * Methods
     */
    return {
        getId: () => instanceId,
        bindStore: (value) => {
            bindStoreEntryPoint({ value, instanceId });
        },
        get: () => {
            return storeGetEntryPoint(instanceId);
        },
        getProp: (prop) => {
            return storeGetPropEntryPoint({ instanceId, prop });
        },
        set: (prop, value, { emit = true } = {}) => {
            const isComputed = checkIfPropIsComputed({ instanceId, prop });
            if (isComputed) return;

            storeSetEntryPoint({
                instanceId,
                prop,
                value,
                fireCallback: emit ?? true,
                clone: false,
                action: STORE_SET,
            });
        },
        update: (prop, value, { emit = true, clone = false } = {}) => {
            const isComputed = checkIfPropIsComputed({ instanceId, prop });
            if (isComputed) return;

            storeSetEntryPoint({
                instanceId,
                prop,
                value,
                fireCallback: emit ?? true,
                clone,
                action: STORE_UPDATE,
            });
        },
        getProxi: () => {
            return getProxiEntryPoint({ instanceId });
        },
        quickSetProp: (prop, value) => {
            const isComputed = checkIfPropIsComputed({ instanceId, prop });
            if (isComputed) return;

            storeQuickSetEntrypoint({ instanceId, prop, value });
        },
        watch: (prop, callback, { wait = false } = {}) => {
            return watchEntryPoint({ instanceId, prop, callback, wait });
        },
        computed: (prop, keys, callback) => {
            storeComputedEntryPoint({
                instanceId,
                prop,
                keys,
                callback,
            });
        },
        emit: (prop) => {
            storeEmitEntryPoint({ instanceId, prop });
        },
        emitAsync: async (prop) => {
            return storeEmitAsyncEntryPoint({ instanceId, prop });
        },
        getValidation: () => {
            return storeGetValidationEntryPoint({ instanceId });
        },
        debug: () => {
            storeDebugEntryPoint({ instanceId });
        },
        debugStore: () => {
            storeDebugStoreEntryPoint({ instanceId });
        },
        debugValidate: () => {
            storeDebugValidateEntryPoint({ instanceId });
        },
        destroy: () => {
            destroyStoreEntryPoint(instanceId);
        },
    };
};
