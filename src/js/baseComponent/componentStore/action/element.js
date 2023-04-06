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
export const getElementById = ({ id = null }) => {
    if (!id) return null;

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
 * Get element by key
 */
export const getElementByKeyInContainer = ({
    key = null,
    parentId = null,
    container = document.createElement('div'),
}) => {
    if (!key) return null;

    const { instances } = componentStore.get();
    const instance = instances.find(
        ({ key: currentKey, parentId: currentParentId, element }) =>
            currentKey === key &&
            currentParentId === parentId &&
            isDescendant(container, element)
    );

    const element = instance?.element;
    if (!element) {
        console.warn(`getElementByKey failed no id found`);
        return null;
    }

    return element;
};
