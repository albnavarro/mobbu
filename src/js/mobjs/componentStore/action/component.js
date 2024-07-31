// @ts-check

import { componentMap } from '../store';

/**
 * @param {string} id
 *
 * @description
 * get component name By id
 */
export const getComponentNameById = (id = '') => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    const component = item?.componentName;

    if (!component) {
        console.warn(`getComponentNameById failed no id found`);
        return null;
    }

    return component;
};

/**
 * @param {string} name
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

/**
 * @param {string} repeatId
 * @returns {string|undefined}
 *
 * @description
 * Get id by repeatId.
 * Return parent of id.
 */
export const getIdByRepeatId = (repeatId = '') => {
    if (!repeatId) return;

    const instance = [...componentMap.values()].find(
        ({ componentRepeatId }) => {
            return componentRepeatId === repeatId;
        }
    );

    const parentId = instance?.parentId;
    if (!parentId) return;
    return parentId;
};

/**
 * @param {string} id
 *
 * @description
 * get component name By id
 */
export const componentHasKey = (id = '') => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    const key = item?.key;

    if (!key) {
        return false;
    }

    return key !== '';
};
