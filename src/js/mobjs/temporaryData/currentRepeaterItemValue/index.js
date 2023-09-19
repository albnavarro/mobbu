import { mobCore } from '../../../mobCore';
import { DEFAULT_CURRENT_REPEATER_STATE } from '../../constant';
import { mainStore } from '../../mainStore/mainStore';

/**
 * @params {{ current:Object, index:Number}}
 * @returns String
 */
export const setCurrentValueList = (current = {}) => {
    /**
     * @type {String}
     */
    const id = mobCore.getUnivoqueId();
    mainStore.set('currentListValue', (/** @type {Array} */ prev) => {
        return [...prev, { [id]: current }];
    });

    return id;
};

/**
 * @param string
 * @return {{ current:Object, index:Number}}
 */
export const getCurrentValueList = (id = '') => {
    const { currentListValue } = mainStore.get();

    /**
     * @type {Object|undefined}
     * Get props.
     */
    const value = currentListValue.find((/** @type {Object} */ item) => {
        return item?.[id];
    });

    /**
     * Remove value
     */
    mainStore.set('currentListValue', (/** @type {Array} */ prev) => {
        return prev.filter((/** @type {Object} */ item) => {
            return !(id in item);
        });
    });

    return value ? value[id] : DEFAULT_CURRENT_REPEATER_STATE;
};
