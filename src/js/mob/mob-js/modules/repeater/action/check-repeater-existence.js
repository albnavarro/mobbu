import { repeatInstancesMap } from '../repeat-id-intances-map';

/**
 * Check if repeater exist or is deleted.
 *
 * @param {object} params
 * @param {string} params.repeatId
 * @returns {boolean}
 */
export const checkRepeaterExistence = ({ repeatId }) => {
    return repeatInstancesMap.has(repeatId);
};
