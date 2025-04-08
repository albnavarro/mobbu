// @ts-check

import { getContentElement } from '../../route/dom-ref/content';
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
 * @param {HTMLElement|undefined} element
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
    if (!id) return;

    return id;
};

/**
 * @param {string} name
 * @returns {string[]}
 *
 * @description
 * Get Array of id by user definition name.
 */
export const getIdArrayByInstanceName = (name = '') => {
    if (!name) return [];

    return [...componentMap.values()]
        .filter(({ instanceName }) => instanceName === name)
        .map(({ id }) => id);
};

/**
 * @param {string} id
 * @returns {boolean}
 *
 * @description
 * get component name By id
 */
export const componentHasKey = (id = '') => {
    if (!id || id === '') return false;

    const item = componentMap.get(id);
    const key = item?.key;

    if (!key) {
        return false;
    }

    return key !== '';
};

/**
 * @param {string} id
 * @returns {boolean|undefined}
 *
 * @description
 * Check if component is persistent ( is outside content node element ).
 */
export const componentIsPersistent = (id = '') => {
    if (!id || id === '') return false;

    const item = componentMap.get(id);
    const element = item?.element;
    if (!element) return false;

    const contentElement = getContentElement();
    return !contentElement?.contains(element);
};
