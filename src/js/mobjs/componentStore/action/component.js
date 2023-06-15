// @ts-check

import { componentStore } from '../store';

/**
 * get component name By id
 */
export const getComponentNameById = (id) => {
    if (!id) return null;

    const { instances } = componentStore.get();
    const instance = instances.find(({ id: currentId }) => {
        return currentId === id;
    });

    const componentName = instance?.component;
    if (!componentName) {
        console.warn(`getComponentNameById failed no id found`);
        return null;
    }

    return componentName;
};

/**
 * Get id by user definition name.
 */
export const getIdByInstanceName = (name = '') => {
    if (!name) return null;

    const { instances } = componentStore.get();
    const instance = instances.find(({ instanceName }) => {
        return instanceName === name;
    });

    const id = instance?.id;
    if (!id) {
        console.warn(`getIdByName failed no name`);
        return null;
    }

    return id;
};
