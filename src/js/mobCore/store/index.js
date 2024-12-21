// @ts-check

import { getUnivoqueId } from '../utils';
import {
    storeComputedEntryPoint,
    storeQuickSetEntrypoint,
    storeSetEntryPoint,
} from './storeSet';
import { removeStateFromMainMap, storeMap, updateMainMap } from './storeMap';
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
import { checkType } from './storeType';

/**
 * @param {import('./type').mobStoreBaseData} data
 * @returns {import('./type').MobStore}
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
     * Use reference to proxiObject
     * set to null on destroy.
     * Make sure that there is no active reference in store instance
     * on destroy.
     */

    let bindedInstance = [];
    let unsubScribeBindStore = [];

    /**
     * Methods
     */
    return {
        getId: () => instanceId,
        bindStore: (value) => {
            const ids = checkType(Array, value)
                ? value.map((store) => store.getId())
                : [value.getId()];

            bindedInstance = [...bindedInstance, ...ids];
        },
        get: () => {
            if (bindedInstance.length === 0) {
                return storeGetEntryPoint(instanceId);
            }

            return [...bindedInstance, instanceId]
                .map((id) => storeGetEntryPoint(id))
                .reduce(
                    (previous, current) => ({ ...previous, ...current }),
                    {}
                );
        },
        getProp: (prop) => {
            return storeGetPropEntryPoint({ instanceId, prop });
        },
        set: (prop, value, { emit = true } = {}) => {
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
            storeQuickSetEntrypoint({ instanceId, prop, value });
        },
        watch: (prop, callback) => {
            if (bindedInstance.length === 0) {
                return watchEntryPoint({ instanceId, prop, callback });
            }

            const currentId =
                [instanceId, ...bindedInstance].find(
                    (id) => prop in storeMap.get(id).store
                ) ?? '';

            const unsubscribe = watchEntryPoint({
                instanceId: currentId,
                prop,
                callback,
            });

            unsubScribeBindStore = [...unsubScribeBindStore, unsubscribe];
            return unsubscribe;
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
            bindedInstance = [];
            unsubScribeBindStore.forEach((unsubscribe) => {
                unsubscribe?.();
            });

            removeStateFromMainMap(instanceId);
        },
    };
};
