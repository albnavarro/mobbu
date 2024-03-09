// @ts-check

import { getUnivoqueId } from '../../utils';
import { storeSetAction } from './storeSet';
import { getState, setState, storeMap } from './storeMap';
import {
    inizializeSpecificProp,
    inizializeStoreData,
    maxDepth,
} from './storeUtils';
import { UNTYPED } from './storeType';

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
     * Add new store to main Map.
     */
    storeMap.set(instanceId, {
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
    });

    return {
        get: () => getState(instanceId),
        set: (propsId) => {
            const state = getState(instanceId);
            const newState = storeSetAction({ state, propsId });
            setState(instanceId, newState);
        },
    };
};
