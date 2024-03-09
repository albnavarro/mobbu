// @ts-check

import { getUnivoqueId } from '../../utils';
import { storeSetAction } from './storeSet';
import { getFormMainMap, updateMainMap, storeMap } from './storeMap';
import {
    inizializeSpecificProp,
    inizializeStoreData,
    maxDepth,
} from './storeUtils';
import { UNTYPED } from './storeType';
import { inizializeValidation } from './initialValidation';
import { getLogStyle } from './logStyle';

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
            console.log(getFormMainMap(instanceId));
            return store;
        },
        set: (propsId, value, fireCallback = true, clone = false) => {
            const state = getFormMainMap(instanceId);
            const newState = storeSetAction({
                state,
                propsId,
                value,
                fireCallback,
                clone,
            });

            if (!newState) return;
            updateMainMap(instanceId, newState);
        },
    };
};
