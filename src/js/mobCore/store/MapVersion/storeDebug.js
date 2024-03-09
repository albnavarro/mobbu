import { getFormMainMap } from './storeMap';

/**
 * @param {Object} param
 * @param {string} param.instanceId
 */
export const storeGetValidationEntryPoint = ({ instanceId }) => {
    const { validationStatusObject } = getFormMainMap(instanceId);
    return validationStatusObject;
};

/**
 * @param {Object} param
 * @param {string} param.instanceId
 */
export const storeDebugStoreEntryPoint = ({ instanceId }) => {
    const { store } = getFormMainMap(instanceId);
    console.log(store);
};

/**
 * @param {Object} param
 * @param {string} param.instanceId
 */
export const storeDebugValidateEntryPoint = ({ instanceId }) => {
    const { validationStatusObject } = getFormMainMap(instanceId);
    console.log(validationStatusObject);
};
