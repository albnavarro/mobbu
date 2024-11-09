// @ts-check

import { componentMap } from '../store';

/**
 *
 * @param {object} obj
 * @param {string} obj.id
 * @param {HTMLElement|import("../../webComponent/type").UserComponent} obj.newElement
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
    return item?.element;
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
 * @param {string} obj.repeatId
 * @return {HTMLElement|undefined}
 *
 *
 * @description
 * Get element by key and repeatId.
 */
export const getElementByKeyAndRepeatId = ({ key = '', repeatId = '' }) => {
    if (key?.length === 0) return;

    const values = [...componentMap.values()];
    const valuesFiltered = values.find(
        (item) =>
            `${item.key}` === `${key}` && item.componentRepeatId === repeatId
    );

    return valuesFiltered?.element;
};

/**
 * @param {object} obj
 * @param {string} obj.id
 * @param {string} obj.repeatId
 * @param {boolean} [ obj.filterById ]
 * @return {string[]}
 *
 * @description
 * Get children of component inside a element by a precompiler children list
 */
export const getIdsByByRepeatId = ({ id, repeatId, filterById = false }) => {
    if (!id || id === '') return [];

    const values = [...componentMap.values()];
    return values
        .filter((item) => {
            return item?.componentRepeatId === repeatId;
        })
        .filter((item) => {
            if (filterById) return item?.parentId === id;
            return item;
        })
        .map((item) => {
            return item.id;
        });
};
