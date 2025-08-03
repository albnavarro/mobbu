import { getContentElement } from '../../route/dom-ref/content';
import { componentMap } from '../component-map';
import { getIdsFromInstanceMap } from '../instance-map';
import { getIdFromWeakElementMap } from '../weak-element-map';

/**
 * Get component name By id
 *
 * @param {string} id
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
 * Get component name By element
 *
 * @param {HTMLElement | undefined} element
 */
export const getComponentNameByElement = (element) => {
    if (!element) return 'name-not-found';

    const id = getIdFromWeakElementMap({ element }) ?? '';
    const item = componentMap.get(id);
    if (!item) return 'name-not-found';

    return item.componentName;
};

/**
 * Get id by user definition name.
 *
 * @param {string} name
 * @returns {string | undefined}
 */
export const getIdByInstanceName = (name = '') => {
    if (!name) return;

    const idCollection = getIdsFromInstanceMap({ instanceName: name });
    return idCollection?.[0];
};

/**
 * Get Array of id by user definition name.
 *
 * @param {string} name
 * @returns {string[]}
 */
export const getIdArrayByInstanceName = (name = '') => {
    if (!name) return [];
    return getIdsFromInstanceMap({ instanceName: name }) ?? [];
};

/**
 * Get component name By id
 *
 * @param {string} id
 * @returns {boolean}
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
 * Check if component is persistent ( is outside content node element ).
 *
 * @param {string} id
 * @returns {boolean | undefined}
 */
export const componentIsPersistent = (id = '') => {
    if (!id || id === '') return false;

    const item = componentMap.get(id);
    const element = item?.element;
    if (!element) return false;

    const contentElement = getContentElement();
    return !contentElement?.contains(element);
};
