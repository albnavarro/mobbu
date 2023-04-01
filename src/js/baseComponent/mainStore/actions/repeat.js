import { addUnwatchList } from '../../componentStore/action';
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
export const executeRepeat = ({ repeatId, element }) => {
    if (!repeatId) return;

    const { repeat } = mainStore.get();
    const currentItem = repeat.find((item) => {
        return item?.[repeatId];
    });

    /**
     * If callback is not used addOnMoutCallback is not fired.
     * So there is no callback ( undefined )
     */
    const obj = currentItem?.[repeatId];
    if (!obj) return;

    const unWatchList = watchList({
        ...obj,
        containerList: element.querySelector(obj.container),
    });

    addUnwatchList({ id: obj?.id, cb: unWatchList });

    /**
     * Remove callback
     */
    mainStore.set('repeat', (prev) => {
        return prev.filter((item) => {
            return !(repeatId in item);
        });
    });
};
