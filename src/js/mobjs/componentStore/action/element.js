// @ts-check

import { isDescendant } from '../../../mobCore/utils';
import { storeAction } from '../../createComponent';
import { componentMap, componentStore } from '../store';

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

    componentStore[storeAction](
        'instances',
        (
            /** @type {Array.<import('../store.js').componentStoreType >} */ prevInstances
        ) => {
            return prevInstances.map((item) => {
                const { id: currentId } = item;

                return id === currentId
                    ? { ...item, element: newElement }
                    : item;
            });
        }
    );

    //
    const item = componentMap.get(id);
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

    // const { instances } = componentStore.get();
    //
    // /**
    //  * @type {import('../store.js').componentStoreType}
    //  */
    // const instance = instances.find(({ id: currentId }) => currentId === id);
    //
    // const element = instance?.element;
    // if (!element) {
    //     console.warn(`getElementById failed no id found`);
    //     return;
    // }

    //
    const { element } = componentMap.get(id);

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
    if (!key || key === '') return;

    const { instances } = componentStore.get();

    /**
     * @type {import('../store.js').componentStoreType}
     */
    const instance = instances.find(
        ({ key: currentKey, parentId: currentParentId, element }) =>
            currentKey === key &&
            currentParentId === parentId &&
            isDescendant(container, element)
    );

    // const instance = [...componentMap.values()].find(
    //     ({ key: currentKey, parentId: currentParentId, element }) =>
    //         currentKey === key &&
    //         currentParentId === parentId &&
    //         isDescendant(container, element)
    // );

    const element = instance?.element;
    if (!element) {
        console.warn(`getElementByKey failed no element found`);
        return;
    }

    return element;
};
