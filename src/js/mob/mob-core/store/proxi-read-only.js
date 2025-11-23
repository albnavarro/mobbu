import { getStateFromMainMap, updateMainMap } from './store-map';

/**
 * @param {Object} param
 * @param {string} param.instanceId
 * @param {string[]} param.values
 * @returns {void}
 */
export const setProxiPropReadOnlyEntryPoint = ({ instanceId, values }) => {
    const state = getStateFromMainMap(instanceId);
    if (!state) return;

    const { proxiReadOnlyProp } = state;

    values.forEach((value) => {
        proxiReadOnlyProp.add(value);
    });

    /**
     * Direct mutation of shared Map reference from shallow copy (useStoreCopy=true).
     *
     * - The updateMainMap call below is technically redundant because callBackWatcher points to the original Map in
     *   storeMap, which is already mutated by .set().
     *
     *   - Kept for consistency and safety, but can be removed for micro-optimization.
     */
    updateMainMap(instanceId, state);
};
