// @ts-check

import { mobCore } from '../../../mobCore';

/**
 * @type {Map<string,object>}
 */
export const staticPropsMap = new Map();

/**
 *
 * @param {object} [ props ]
 * @return {string} props id in store.
 *
 * @description
 * Store props and return a unique identifier
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
     * @type {string}
     */
    const id = mobCore.getUnivoqueId();
    staticPropsMap.set(id, props);

    return id;
};

/**
 * @property {string} id
 *
 * @return {object}
 *
 * @description
 * Return props by id
 */
export const getPropsFromParent = (id = '') => {
    const props = staticPropsMap.get(id);
    staticPropsMap.delete(id);

    return props ?? {};
};

/**
 * @param {object} obj
 * @param {string} obj.propsId
 * @return void
 *
 * @description
 * If slot is not used remove id reference orphans from store.
 *
 */
export const removeCurrentToPropsByPropsId = ({ propsId }) => {
    if (!propsId) return;
    staticPropsMap.delete(propsId);
};

/**
 * @return void
 *
 * @description
 * Delete all refs of props.
 * If slot in unused and a propsFromStore is unused remain in store
 * So when active parser counter is equal 0 ( no parser is running )
 * remove all reference
 */
export const removeOrphansPropsFromParent = () => {
    staticPropsMap.clear();
};
