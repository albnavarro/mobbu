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

export const setDynamicPropsWatch = ({ id = '', unWatchArray = [] }) => {
    componentStore.set(
        'instances',
        (
            /** @type {Array.<import('../store.js').componentStoreType >} */ prevInstances
        ) => {
            return prevInstances.map((item) => {
                const { parentPropsWatcher, id: currentId } = item;

                // Assign is if existe a parent component and current parentId is null/undefined
                return id === currentId
                    ? {
                          ...item,
                          ...{ parentPropsWatcher: unWatchArray },
                      }
                    : item;
            });
        }
    );
};
