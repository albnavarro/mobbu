// @ts-check

import { componentMap } from '../store';

/**
 *
 * @param {object} obj
 * @param {string} obj.id
 * @param {HTMLElement|import("../../webComponent/type").userComponent} obj.newElement
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
 * @param {object} obj
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
 * @param {object} obj
 * @param {HTMLElement|undefined} obj.element
 * @return {string|undefined}
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
 * @param {object} obj
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

    const value = componentMap.get(parentId ?? '');
    if (!value) return;

    const { child } = value;
    if (!child) return;

    /**
     * Search in parent component a component that:
     * - is inside container
     * - has specific key.
     */
    const targetId =
        Object.values(child ?? {})
            .flat()
            .find((id) => {
                const value = componentMap.get(id);
                if (!value) return;

                const { element, key: currentKey } = value;
                return (
                    container.contains(element) && `${currentKey}` === `${key}`
                );
            }) ?? '';

    /**
     * Get HTMLElement
     */
    const targetValue = componentMap.get(targetId);
    if (!targetValue) return;

    const { element } = targetValue;

    if (!element) {
        console.warn(`getElementByKey failed no element found`);
        return;
    }

    return element;
};
