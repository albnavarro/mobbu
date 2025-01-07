import { getStateFromMainMap, removeStateFromMainMap } from './storeMap';

/**
 * @param {string} instanceId
 * @returns { void }
 */
export const destroyStoreEntryPoint = (instanceId) => {
    const state = getStateFromMainMap(instanceId);
    if (!state) return;

    const { unsubscribeBindInstance } = state;

    unsubscribeBindInstance.forEach((unsubscribe) => {
        unsubscribe?.();
    });

    removeStateFromMainMap(instanceId);
};
