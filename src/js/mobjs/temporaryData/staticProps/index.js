// @ts-check

import { mobCore } from '../../../mobCore';
import { mainStore } from '../../mainStore/mainStore';

/**
 *
 * @param {Object} [ props ]
 * @return {String} props id in store.
 *
 * @description
 * Store props and return a unique indentifier
 *
 * @example
 * ```javascript
 *   <MyComponent
 *       data-staticprops="${staticProps({
 *           childState1: key,
 *           callBack: () => setState('parentState', key)
 *       })}"
 *   ></MyComponent>
 * ```
 */
export const setStaticProps = (props = {}) => {
    /**
     * @type {String}
     */
    const id = mobCore.getUnivoqueId();
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
 * @param {Object} obj
 * @param {String} obj.propsId
 * @return void
 *
 * @description
 * If slot is not used remove id reference orphans from store.
 *
 */
export const removeCurrentToPropsByPropsId = ({ propsId }) => {
    if (!propsId) return;

    mainStore.set('propsToChildren', (/** @type {Array<Object>} */ prev) => {
        return prev.filter((item) => {
            const [currentPropsId] = Object.keys(item);
            return currentPropsId !== propsId;
        });
    });
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
