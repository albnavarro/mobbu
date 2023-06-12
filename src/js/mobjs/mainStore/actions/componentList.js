// @ts-check

import { mainStore } from '../mainStore';

export const setComponentList = (list = {}) =>
    mainStore.set('componentList', [list]);

/**
 * @description
 *
 * @reurn {Object} Object with all component definition.
 */
export const getComponentList = () => {
    const { componentList } = mainStore.get();
    return componentList?.[0] ?? {};
};
