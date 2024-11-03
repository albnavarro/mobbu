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
 * @param {HTMLElement} element
 *
 * @description
 * get component name By element
 */
export const getComponentNameByElement = (element) => {
    if (!element) return;

    const componentName = [...componentMap.values()].find(
        ({ element: currentElement }) => {
            return currentElement === element;
        }
    );

    if (!componentName) return '';

    return componentName?.componentName;
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
 * @param {string} id
 * @returns {boolean}
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
