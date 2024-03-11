// @ts-check

import { getStateFromMainMap, updateMainMap } from './storeMap';
import { storeSetAction } from './storeSet';
import { storeType } from './storeType';

/**
 * @param {import('./type').storeMapValue} initialState
 * @returns {import('./type').storeMapValue}
 */
export const inizializeValidation = (initialState) => {
    const { store, validationStatusObject } = initialState;

    /**
     * Initialize empty Object if prop is an object.
     * No collision with any, any is used with complete declaration ( type etc.. )
     */
    for (const key in store) {
        if (storeType.isObject(store[key])) {
            validationStatusObject[key] = {};
        }
    }

    return { ...initialState, validationStatusObject };
};

/**
 * @param {string} instanceId
 * @param {import('./type').storeMapValue} initialState
 * @returns {void}
 */
export const inizializeAllProps = (instanceId, initialState) => {
    const { store } = initialState;

    /**
     * First run execute each propierites to check validation without fire event
     */
    Object.entries(store).forEach((item) => {
        const [prop, value] = item;

        /**
         * Get last updated state.
         */
        const state = getStateFromMainMap(instanceId);
        const newState = storeSetAction({
            instanceId,
            state,
            prop,
            value,
            fireCallback: false,
            useStrict: false,
        });

        if (!newState) return;

        /**
         * Update main store state
         */
        updateMainMap(instanceId, newState);
    });
};
