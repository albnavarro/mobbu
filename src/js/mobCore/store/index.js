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
import { getLogStyle } from './logStyle';
import { storePropInProxiWarning } from './storeWarining';

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
            if (bindedInstance.length === 0) {
                return storeGetPropEntryPoint({ instanceId, prop });
            }

            const currentBindId =
                [instanceId, ...bindedInstance].find(
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
            const state = getStateFromMainMap(instanceId);
            const { store: selfStore, proxiObject: previousProxiObject } =
                state;

            /**
             * Return previous proxi if exist.
             */
            if (previousProxiObject) {
                return previousProxiObject;
            }

            /**
             * Create self proxi
             */
            const selfProxi = new Proxy(selfStore, {
                set(target, /** @type{string} */ prop, value) {
                    if (prop in target) {
                        storeSetEntryPoint({
                            instanceId,
                            prop,
                            value,
                            fireCallback: true,
                            clone: false,
                            action: STORE_SET,
                        });

                        return true;
                    }

                    return false;
                },
            });

            /**
             * Rerturn self proxi if no bindedInstace is used.
             */
            if (bindedInstance.length === 0) {
                updateMainMap(instanceId, {
                    ...state,
                    proxiObject: selfProxi,
                });

                return selfProxi;
            }

            /**
             * Create proxi for binded store.
             * Binded proxi has only read operation.
             */
            const bindedProxi = bindedInstance.map((id) => {
                const state = getStateFromMainMap(id);
                const { store } = state;

                return new Proxy(store, {
                    set() {
                        return false;
                    },
                });
            });

            /**
             * Create a proxy with all new proxi.
             * Reflect operation to the proxies with prop
             */
            const bindedProxiArray = new Proxy([selfProxi, ...bindedProxi], {
                set(proxies, prop, value) {
                    const currentProxi = proxies.find((proxi) => prop in proxi);
                    if (!currentProxi) return false;

                    Reflect.set(currentProxi, prop, value);
                    return true;
                },
                get(proxies, prop) {
                    const currentProxi = proxies.find((proxi) => prop in proxi);
                    if (!currentProxi) return false;

                    return Reflect.get(currentProxi, prop);
                },
            });

            updateMainMap(instanceId, {
                ...state,
                proxiObject: bindedProxiArray,
            });

            return bindedProxiArray;
        },
        // getProxi: () => {
        //     const state = getStateFromMainMap(instanceId);
        //     const { store, proxiObject: previousProxiObject } = state;
        //
        //     /**
        //      * Create only one proxi.
        //      */
        //     if (previousProxiObject) {
        //         return previousProxiObject;
        //     }
        //
        //     // https://stackoverflow.com/questions/44469447/apparent-pollution-with-multiple-proxy-objects-for-the-same-target
        //     const proxiObject = new Proxy(store, {
        //         set(target, /** @type{string} */ prop, value) {
        //             if (prop in target) {
        //                 // Mutiamo l'oggetto originale con i metodi giá presenti
        //                 storeSetEntryPoint({
        //                     instanceId,
        //                     prop,
        //                     value,
        //                     fireCallback: true,
        //                     clone: false,
        //                     action: STORE_SET,
        //                 });
        //
        //                 return true;
        //             }
        //
        //             const logStyle = getLogStyle();
        //             storePropInProxiWarning(prop, logStyle);
        //             return false;
        //         },
        //         get(target, /** @type{string} */ prop) {
        //             // default.
        //             if (bindedInstance.length === 0) {
        //                 return target[prop];
        //             }
        //
        //             // return binded state that match prop.
        //             const currentBindId =
        //                 [instanceId, ...bindedInstance].find(
        //                     (id) => prop in storeMap.get(id).store
        //                 ) ?? '';
        //
        //             const bindedState = getStateFromMainMap(currentBindId);
        //             const { store: bindedStore } = bindedState;
        //             return bindedStore[prop];
        //         },
        //     });
        //
        //     updateMainMap(instanceId, { ...state, proxiObject });
        //
        //     return proxiObject;
        // },
        quickSetProp: (prop, value) => {
            storeQuickSetEntrypoint({ instanceId, prop, value });
        },
        watch: (prop, callback) => {
            if (bindedInstance.length === 0) {
                return watchEntryPoint({ instanceId, prop, callback });
            }

            const currentBindId =
                [instanceId, ...bindedInstance].find(
                    (id) => prop in storeMap.get(id).store
                ) ?? '';

            const unsubscribe = watchEntryPoint({
                instanceId: currentBindId,
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
