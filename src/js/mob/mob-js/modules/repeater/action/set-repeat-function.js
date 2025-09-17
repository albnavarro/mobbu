import { repeatInstancesMap } from '../repeat-id-intances-map';

/**
 * Add new repeat initialized in map. key is component id associated to these function.
 *
 * @param {object} params
 * @param {string} params.repeatId - Repeat id
 * @param {() => void} params.fn
 * @returns {void}
 */

export const setRepeatFunction = ({ repeatId, fn }) => {
    const item = repeatInstancesMap.get(repeatId);
    if (!item) return;

    repeatInstancesMap.set(repeatId, {
        ...item,
        fn,
        unsubscribe: () => {},
    });
};
