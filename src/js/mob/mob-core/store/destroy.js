import { removeSelfIdToBindInstanceBy } from './bind-store';
import { removeStateFromMainMap, storeMap } from './store-map';

/**
 * @param {string} instanceId
 * @returns {void}
 */
export const destroyStoreEntryPoint = (instanceId) => {
    /**
     * Here use original map not a copies.
     */
    const state = storeMap.get(instanceId);
    if (!state) return;

    state.callBackComputed.clear();
    state.computedPropsQueque.clear();
    state.watcherByProp.clear();
    state.watcherMetadata.clear();
    state.store = {};
    state.proxiObject = null;

    const { unsubscribeBindInstance, bindInstance } = state;

    /**
     * Unsubscribe binded watcher
     */
    unsubscribeBindInstance.forEach((unsubscribe) => {
        unsubscribe?.();
    });

    state.unsubscribeBindInstance.length = 0;

    /**
     * Remove itself from bindInstanceBy of binded store.
     */
    bindInstance.forEach((id) => {
        removeSelfIdToBindInstanceBy({ selfId: instanceId, bindId: id });
    });

    removeStateFromMainMap(instanceId);
};
