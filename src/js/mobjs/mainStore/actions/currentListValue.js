import { getUnivoqueId } from '../../../mobbu/animation/utils/animationUtils';
import { mainStore } from '../mainStore';

export const setCurrentValueList = (current = {}) => {
    /**
     * @type {String}
     */
    const id = getUnivoqueId();
    mainStore.set('currentListValue', (/** @type {Array} */ prev) => {
        return [...prev, { [id]: current }];
    });

    return id;
};

export const getCurrentValueList = (id = '') => {
    const { currentListValue } = mainStore.get();

    /**
     * @type {Object|undefined}
     * Get props.
     */
    const props = currentListValue.find((/** @type {Object} */ item) => {
        return item?.[id];
    });

    /**
     * Remove props
     */
    mainStore.set('currentListValue', (/** @type {Array} */ prev) => {
        return prev.filter((/** @type {Object} */ item) => {
            return !(id in item);
        });
    });

    return props ? props[id] : {};
};
