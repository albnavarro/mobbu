// @ts-check

import { getUnivoqueId } from '../utils';
import {
    storeComputedEntryPoint,
    storeQuickSetEntrypoint,
    storeSetEntryPoint,
} from './storeSet';
import {
    getStateFromMainMap,
    removeStateFromMainMap,
    storeMap,
    updateMainMap,
} from './storeMap';
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
import { checkType } from './storeType';
import { getProxiEntryPoint } from './proxi';

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
     * Methods
     */
    return {
        getId: () => instanceId,
        bindStore: (value) => {
            const state = getStateFromMainMap(instanceId);
            const { bindInstance } = state;
            if (!bindInstance) return;

            const ids = checkType(Array, value)
                ? // @ts-ignore
                  value.map((/** @type {getIdI: () => string} */ store) =>
                      store.getId()
                  )
                : // @ts-ignore
                  [value.getId()];

            const bindInstanceUpdated = [...bindInstance, ...ids];
            updateMainMap(instanceId, {
                ...state,
                bindInstance: bindInstanceUpdated,
            });
        },
        get: () => {
            const state = getStateFromMainMap(instanceId);
            const { bindInstance } = state;

            if (!bindInstance || bindInstance.length === 0) {
                return storeGetEntryPoint(instanceId);
            }

            return [...bindInstance, instanceId]
                .map((id) => storeGetEntryPoint(id))
                .reduce(
                    (previous, current) => ({ ...previous, ...current }),
                    {}
                );
        },
        getProp: (prop) => {
            const state = getStateFromMainMap(instanceId);
            const { bindInstance } = state;

            if (!bindInstance || bindInstance.length === 0) {
                return storeGetPropEntryPoint({ instanceId, prop });
            }

            const currentBindId =
                [instanceId, ...bindInstance].find(
                    (id) => prop in storeMap.get(id).store
                ) ?? '';

            return storeGetPropEntryPoint({ instanceId: currentBindId, prop });
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
        // Use getProxi after add a proxi.
        getProxi: () => {
            return getProxiEntryPoint({ instanceId });
        },
        quickSetProp: (prop, value) => {
            storeQuickSetEntrypoint({ instanceId, prop, value });
        },
        watch: (prop, callback) => {
            const state = getStateFromMainMap(instanceId);
            const { bindInstance, unsubscribeBindInstance } = state;

            if (!bindInstance || bindInstance.length === 0) {
                return watchEntryPoint({ instanceId, prop, callback });
            }

            const currentBindId =
                [instanceId, ...bindInstance].find(
                    (id) => prop in storeMap.get(id).store
                ) ?? '';

            const unsubscribe = watchEntryPoint({
                instanceId: currentBindId,
                prop,
                callback,
            });

            updateMainMap(instanceId, {
                ...state,
                unsubscribeBindInstance: [
                    ...unsubscribeBindInstance,
                    unsubscribe,
                ],
            });

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
            const state = getStateFromMainMap(instanceId);
            const { bindInstance } = state;

            if (!bindInstance || bindInstance.length === 0) {
                storeEmitEntryPoint({ instanceId, prop });
            }

            const currentBindId =
                [instanceId, ...bindInstance].find(
                    (id) => prop in storeMap.get(id).store
                ) ?? '';

            return storeEmitEntryPoint({ instanceId: currentBindId, prop });
        },
        emitAsync: async (prop) => {
            const state = getStateFromMainMap(instanceId);
            const { bindInstance } = state;

            if (!bindInstance || bindInstance.length === 0) {
                return storeEmitAsyncEntryPoint({ instanceId, prop });
            }

            const currentBindId =
                [instanceId, ...bindInstance].find(
                    (id) => prop in storeMap.get(id).store
                ) ?? '';

            return storeEmitAsyncEntryPoint({
                instanceId: currentBindId,
                prop,
            });
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
            const state = getStateFromMainMap(instanceId);
            const { unsubscribeBindInstance } = state;

            unsubscribeBindInstance.forEach((unsubscribe) => {
                unsubscribe?.();
            });

            removeStateFromMainMap(instanceId);
        },
    };
};
