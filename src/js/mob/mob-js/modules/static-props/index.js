// @ts-check

import { MobCore } from '../../../mob-core';

/**
 * @type {Map<string, object>}
 */
export const staticPropsMap = new Map();

/**
 * Store props and return a unique identifier
 *
 * @example
 *     ```javascript
 *       <MyComponent
 *           data-staticprops="${staticProps({
 *               childState1: key,
 *               callBack: () => setState('parentState', key),
 *           })}"
 *       ></MyComponent>
 *     ```;
 *
 * @param {object} [props]
 * @returns {string} Props id in store.
 */
export const setStaticProps = (props = {}) => {
    /**
     * @type {string}
     */
    const id = MobCore.getUnivoqueId();
    staticPropsMap.set(id, props);

    return id;
};

/**
 * Return props by id
 *
 * @property {string} id
 * @returns {object}
 */
export const getPropsFromParent = (id = '') => {
    const props = staticPropsMap.get(id);
    staticPropsMap.delete(id);

    return props ?? {};
};

/**
 * If slot is not used remove id reference orphans from store.
 *
 * @param {object} obj
 * @param {string} obj.propsId
 * @returns {void}
 */
export const removeCurrentToPropsByPropsId = ({ propsId }) => {
    if (!propsId) return;
    staticPropsMap.delete(propsId);
};

/**
 * Delete all refs of props. If slot in unused and a propsFromStore is unused remain in store So when active parser
 * counter is equal 0 ( no parser is running ) remove all reference
 *
 * @returns {void}
 */
export const removeOrphansPropsFromParent = () => {
    staticPropsMap.clear();
};
