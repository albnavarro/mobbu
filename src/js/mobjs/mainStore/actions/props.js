// @ts-check

import { getUnivoqueId } from '../../../mobbu/animation/utils/animationUtils';
import { mainStore } from '../mainStore';

/**
 * @property {Object} [ props ]
 * @return {String} props id in store.
 *
 * @description
 * Store props and return a unique indentifier
 */
export const createProps = (props = {}) => {
    /**
     * @type {String}
     */
    const id = getUnivoqueId();
    mainStore.set('propsToChildren', (/** @type {Array} */ prev) => {
        return [...prev, { [id]: props }];
    });

    return id;
};

/**
 * @property {String} id
 *
 * @return {Object}
 *
 * @description
 * Return props by id
 */
export const getPropsFromParent = (id = '') => {
    const { propsToChildren } = mainStore.get();

    /**
     * @type {Object|undefined}
     * Get props.
     */
    const props = propsToChildren.find((/** @type {Object} */ item) => {
        return item?.[id];
    });

    /**
     * Remove props
     */
    mainStore.set('propsToChildren', (/** @type {Array} */ prev) => {
        return prev.filter((/** @type {Object} */ item) => {
            return !(id in item);
        });
    });

    return props ? props[id] : {};
};

/**
 * @return void
 *
 * @description
 * Delete all refs of props.
 * If slot in unsed and a propsFromStore is unused remain in store
 * So when active parser counter is equal 0 ( no parser is running )
 * remove all reference
 */
export const removeOrphansPropsFromParent = () => {
    mainStore.set('propsToChildren', []);
};
