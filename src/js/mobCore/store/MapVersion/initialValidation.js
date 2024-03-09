// @ts-check

import { updateMainMap } from './storeMap';
import { storeSetAction } from './storeSet';
import { storeType } from './storeType';

/**
 * @param {string} instanceId
 * @param {import('./type').storeMapValue} state
 * @returns {void}
 */
export const inizializeValidation = (instanceId, state) => {
    const { store, validationStatusObject } = state;

    /**
     * Initialize empty Object if prop is an object.
     */
    for (const key in store) {
        if (storeType.isObject(store[key])) {
            validationStatusObject[key] = {};

            /**
             * Update main store state
             */
            updateMainMap(instanceId, { ...state, validationStatusObject });
        }
    }

    /**
     * First run execute each propierites to check validation without fire event
     */
    Object.entries(store).forEach((item) => {
        const [key, value] = item;
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
