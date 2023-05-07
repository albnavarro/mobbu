import { watchList } from '../../updateList/watchList';
import { mainStore } from '../mainStore';

/**
 * Add new repeater id and props.
 * Tehe repeater will execute after component render.
 */
export const addRepeat = ({ repeatId, obj }) => {
    mainStore.set('repeat', (prev) => {
        return [...prev, { [repeatId]: obj }];
    });
};

/**
 * Launch repeater from id. And find parent from placeholder.
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

/**
 * Set active repeat
 */
export const addActiveRepeat = ({ id, state, container }) => {
    mainStore.set('activeRepeat', (prev) => {
        return [...prev, { id, state, container }];
    });
};

/**
 * Remove active repeat
 */
export const removeActiveRepeat = ({ id, state, container }) => {
    mainStore.set('activeRepeat', (prev) => {
        return prev.filter(
            ({
                id: currentId,
                state: currentState,
                container: currentContainer,
            }) =>
                id !== currentId &&
                state !== currentState &&
                container !== currentContainer
        );
    });
};

/**
 * Get active repeat
 */
export const getActiveRepeater = ({ id, state, container }) => {
    const { activeRepeat } = mainStore.get();
    return activeRepeat.find((item) => {
        return (
            item.id === id &&
            item.state === state &&
            item.container === container
        );
    });
};
