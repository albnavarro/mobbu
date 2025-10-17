import { repeatInstancesMap } from '../repeat-id-intances-map';

/**
 * Add new repeat initialized in map. key is component id associated to these function.
 *
 * @param {object} params
 * @param {string} params.repeatId - Repeat id
 * @param {() => void} params.initializeModule
 * @returns {void}
 */

export const setRepeatFunction = ({ repeatId, initializeModule }) => {
    const item = repeatInstancesMap.get(repeatId);
    if (!item) return;

    repeatInstancesMap.set(repeatId, {
        ...item,
        initializeModule,
        unsubscribe: () => {},
    });
};
