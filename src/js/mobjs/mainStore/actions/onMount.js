import { setDestroyCallback } from '../../updateList/addWithoutKey';
import { mainStore } from '../mainStore';

/**
 * Add ouMount callback to store.
 */
export const addOnMoutCallback = ({ id, cb = () => {} }) => {
    mainStore.set('onMountCallback', (prev) => {
        return [...prev, { [id]: cb }];
    });
};

/**
 * fire onMount callback.
 */
export const fireOnMountCallBack = async ({ id, element }) => {
    const { onMountCallback } = mainStore.get();
    const currentItem = onMountCallback.find((item) => {
        return item?.[id];
    });

    /**
     * If callback is not used addOnMoutCallback is not fired.
     * So there is no callback ( undefined )
     */
    const callback = currentItem?.[id];

    /**
     * OnMount callback can be async.
     */
    const destroyCallback = await callback?.({ element });

    /**
     * Update destroy callback
     */
    setDestroyCallback({ cb: destroyCallback, id });

    /**
     * Remove callback
     */
    mainStore.set('onMountCallback', (prev) => {
        return prev.filter((item) => {
            return !(id in item);
        });
    });
};
