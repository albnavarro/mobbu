import { watchList } from '../../updateList/watchList';
import { mainStore } from '../mainStore';

/**
 * Add ouMount callback to store.
 */
export const addRepeat = ({ repeatId, obj }) => {
    mainStore.set('repeat', (prev) => {
        return [...prev, { [repeatId]: obj }];
    });
};

/**
 * fire onMount callback.
 */
export const executeRepeat = ({ repeatId, placeholderListObj }) => {
    if (!repeatId) return;

    const { repeat } = mainStore.get();
    const currentItem = repeat.find((item) => {
        return item?.[repeatId];
    });

    const obj = currentItem?.[repeatId];
    if (!obj) return;

    /**
     * Get parentNode of list.
     */
    const containerList = placeholderListObj.find(({ id }) => {
        return id === repeatId;
    });

    /**
     * Run watch list
     */
    watchList({
        ...obj,
        containerList: containerList?.parent,
    });

    /**
     * Remove callback
     */
    mainStore.set('repeat', (prev) => {
        return prev.filter((item) => {
            return !(repeatId in item);
        });
    });
};
