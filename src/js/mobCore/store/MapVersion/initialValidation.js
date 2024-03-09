// @ts-check

import { getFormMainMap, updateMainMap } from './storeMap';
import { storeSetAction } from './storeSet';
import { storeType } from './storeType';

/**
 * @param {string} instanceId
 * @param {import('./type').storeMapValue} initialState
 * @returns {void}
 */
export const inizializeValidation = (instanceId, initialState) => {
    const { store, validationStatusObject } = initialState;

    /**
     * Initialize empty Object if prop is an object.
     */
    for (const key in store) {
        if (storeType.isObject(store[key])) {
            validationStatusObject[key] = {};
        }
    }

    /**
     * Update main store state once.
     */
    updateMainMap(instanceId, { ...initialState, validationStatusObject });

    /**
     * First run execute each propierites to check validation without fire event
     */
    Object.entries(store).forEach((item) => {
        const [key, value] = item;

        /**
         * Get last updated state.
         */
        const state = getFormMainMap(instanceId);
        const newState = storeSetAction({
            state,
            propsId: key,
            value,
            fireCallback: false,
        });

        /**
         * Update main store state
         */
        updateMainMap(instanceId, newState);
    });
};
