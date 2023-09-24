// @ts-check

import { componentMap } from '../store';

/**
 *
 * @param {Object} obj
 * @param {string} obj.id
 * @param {HTMLElement} obj.newElement
 * @return { void }
 *
 * @description
 * Update element root from generic to real after conversion.
 */
export const setElementById = ({
    id = '',
    newElement = document.createElement('div'),
}) => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    if (!item) return;

    componentMap.set(id, { ...item, element: newElement });
};

/**
 *
 * @param {Object} obj
 * @param {string} obj.id
 * @return {HTMLElement|undefined}
 *
 * @description
 * Get element by id
 */
export const getElementById = ({ id = '' }) => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    const element = item?.element;
    return element;
};

/**
 *
 * @param {Object} obj
 * @param {HTMLElement|undefined} obj.element
 * @return {String|undefined}
 *
 * @description
 * Get element by id
 */
export const getIdByElement = ({ element }) => {
    const item = [...componentMap.values()].find((item) => {
        const currentElement = item?.element;
        return currentElement === element;
    });

    return item?.id ?? '';
};

/**
 *
 * @param {Object} obj
 * @param {string} obj.key
 * @param {string} obj.parentId
 * @param {HTMLElement} obj.container
 * @return {HTMLElement|undefined}
 *
 *
 * @description
 * Get element by key and parentId and child if specific HTMLElement
 */
export const getElementByKeyInContainer = ({
    key = '',
    parentId = '',
    container = document.createElement('div'),
}) => {
    if (!key || key === '') return;

    const instance = [...componentMap.values()].find(
        ({ key: currentKey, parentId: currentParentId, element }) =>
            currentKey === key &&
            currentParentId === parentId &&
            container.contains(element)
    );

    const element = instance?.element;
    if (!element) {
        console.warn(`getElementByKey failed no element found`);
        return;
    }

    return element;
};
