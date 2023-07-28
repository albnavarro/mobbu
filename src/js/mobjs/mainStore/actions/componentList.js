// @ts-check

import { mainStore } from '../mainStore';

/**
 * @description
 *
 * @returns void
 */
export const setComponentList = (list = {}) =>
    mainStore.set('componentList', list);

/**
 * @description
 *
 * @returns {Object} Object with all component definition.
 */
export const getComponentList = () => {
    const { componentList } = mainStore.get();
    return componentList;
};
