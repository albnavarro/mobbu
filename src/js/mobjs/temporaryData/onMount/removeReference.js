import { mainStore } from '../../mainStore/mainStore';

/**
 * @param {Object} obj
 * @param {String} obj.id - random Id
 * @reurn void
 *
 * @description
 * Remove OnMount reference from main store.
 */
export const removeOnMountCallbackReference = ({ id }) => {
    mainStore.set('onMountCallback', (/** @type {Array} */ prev) => {
        return prev.filter((item) => {
            return !(id in item);
        });
    });
};
