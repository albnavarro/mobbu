// @ts-check

import { watchList } from '../../updateList/watchList';
import { mainStore } from '../mainStore';

/**
 * Add new repeater id and props.
 * Tehe repeater will execute after component render.
 */
export const addRepeat = ({ repeatId, obj }) => {
    mainStore.set('repeat', (/** @type {Array} */ prev) => {
        return [...prev, { [repeatId]: obj }];
    });
};

/**
 * @param {Object} obj
 * @param {String} obj.repeatId - current unique id for repater.
 * @param {Array.<{ parent:HTMLElement, id:string }>} obj.placeholderListObj
  - all repeat placholder active in current parse.
 *
 * @description
 * Launch repeater from id. And find parent from placeholder.
 */
export const executeRepeat = ({ repeatId, placeholderListObj }) => {
    if (!repeatId) return;

    /**
     *
     * @type {{repeat: Array.<{id: {
          afterUpdate:Function,
          beforeUpdate:Function,
          getChildren :Function,
          id: String,
          key: String,
          props: Object,
          state: String,
          targetComponent: String,
          updateState: Function,
          watch: Function
       }}>}}
     *
     * @description
     * Get all repeat from store
     */
    const { repeat } = mainStore.get();
    const currentItem = repeat.find((item) => {
        return item?.[repeatId];
    }) ?? { id: undefined };

    /**
     * @type { typeof currentItem.id }
     *
     * @description
     * Check if there is a valid item.
     */
    const obj = currentItem?.[repeatId];
    if (!obj) return;

    /**
     * @description
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
        containerList: containerList?.parent ?? document.createElement('div'),
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
