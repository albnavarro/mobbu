// @ts-check

import { isDescendant } from '../../../mobbu/utils/vanillaFunction';
import { componentStore } from '../store';

/**
 * Update element root from generic to real after conversion.
 */
export const setElementById = ({ id = null, newElement }) => {
    if (!id) return null;

    componentStore.set('instances', (prevInstances) => {
        return prevInstances.map((item) => {
            const { id: currentId } = item;

            return id === currentId
                ? { ...item, ...{ element: newElement } }
                : item;
        });
    });
};

/**
 * Get element by id
 */
export const getElementById = ({ id = '' }) => {
    if (!id || id === '') return null;

    const { instances } = componentStore.get();
    const instance = instances.find(({ id: currentId }) => currentId === id);

    const element = instance?.element;
    if (!element) {
        console.warn(`getElementById failed no id found`);
        return null;
    }

    return element;
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
    if (!key || key === '') return undefined;

    const { instances } = componentStore.get();
    const instance = instances.find(
        ({ key: currentKey, parentId: currentParentId, element }) =>
            currentKey === key &&
            currentParentId === parentId &&
            isDescendant(container, element)
    );

    const element = instance?.element;
    if (!element) {
        console.warn(`getElementByKey failed no element found`);
        return undefined;
    }

    return element;
};
