// @ts-check

import { componentMap } from '../store';

/**
 * @param {String} id
 *
 * @description
 * get component name By id
 */
export const getComponentNameById = (id = '') => {
    if (!id || id === '') return;

    const { component } = componentMap.get(id);
    if (!component) {
        console.warn(`getComponentNameById failed no id found`);
        return null;
    }

    return component;
};

/**
 * @param {String} name
 * @returns {string|undefined}
 *
 * @description
 * Get id by user definition name.
 */
export const getIdByInstanceName = (name = '') => {
    if (!name) return;

    const instance = [...componentMap.values()].find(({ instanceName }) => {
        return instanceName === name;
    });

    const id = instance?.id;
    if (!id) {
        console.warn(`getIdByName failed no name`);
        return;
    }

    return id;
};
