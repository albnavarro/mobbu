// @ts-check

import { getUnivoqueId } from '../../utils';
import { storeSetAction } from './storeSet';
import { getState, setState, storeMap } from './storeMap';

/**
 * @param {any} test
 * @returns {import('./type').storePublicMethods}
 */
export const mobStore = (test) => {
    const instanceId = getUnivoqueId();
    storeMap.set(instanceId, { test });

    return {
        get: () => getState(instanceId),
        set: (propsId) => {
            const state = getState(instanceId);
            const newState = storeSetAction({ state, propsId });
            setState(instanceId, newState);
        },
    };
};
