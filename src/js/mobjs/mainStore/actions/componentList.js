// @ts-check

import { mainStore } from '../mainStore';

export const setComponentList = (list = {}) =>
    mainStore.set('componentList', [list]);

export const getComponentList = () => {
    const { componentList } = mainStore.get();
    return componentList?.[0] ?? {};
};
