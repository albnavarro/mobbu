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

const logStyle = 'padding: 10px;';

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
            logStyle: logStyle,
        }),
        type: inizializeSpecificProp({
            data,
            prop: 'type',
            depth: dataDepth,
            logStyle: logStyle,
            fallback: UNTYPED,
        }),
        fnValidate: inizializeSpecificProp({
            data,
            prop: 'validate',
            depth: dataDepth,
            logStyle: logStyle,
            fallback: () => true,
        }),
        strict: inizializeSpecificProp({
            data,
            prop: 'strict',
            depth: dataDepth,
            logStyle: logStyle,
            fallback: false,
        }),
        skipEqual: inizializeSpecificProp({
            data,
            prop: 'skipEqual',
            depth: dataDepth,
            logStyle: logStyle,
            fallback: true,
        }),
    };

    /**
     * Add new store to main Map.
     */
    storeMap.set(instanceId, instanceParams);
    inizializeValidation(instanceId, instanceParams);

    return {
        get: () => getFormMainMap(instanceId),
        set: (propsId, value, fireCallback = true, clone = false) => {
            const state = getFormMainMap(instanceId);
            const newState = storeSetAction({
                state,
                propsId,
                value,
                fireCallback,
                clone,
            });

            updateMainMap(instanceId, newState);
        },
    };
};
