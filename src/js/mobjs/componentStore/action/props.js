// @ts-check

import { componentStore } from '../store';

/**
 * @param {String} id
 * @return Object
 *
 * @description
 * Get element by Dom instance
 */
export const getPropsById = (id = '') => {
    if (!id || id === '') return undefined;

    /**
     * @type {{instances: Array.<import('../store.js').componentStoreType >}}
     */
    const { instances } = componentStore.get();
    const instance = instances.find(({ id: currentId }) => currentId === id);

    const props = instance?.props;
    if (!props) {
        console.warn(`getPropsById failed no id found`);
        return null;
    }

    return props;
};
