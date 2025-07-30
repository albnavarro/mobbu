import { componentMap } from '../store';

/**
 * Update element root from generic to real after conversion.
 *
 * @param {object} obj
 * @param {string} obj.id
 * @param {HTMLElement | import('../../web-component/type').UserComponent} obj.newElement
 * @returns {void}
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
 * Get element by id
 *
 * @param {object} obj
 * @param {string} obj.id
 * @returns {HTMLElement | undefined}
 */
export const getElementById = ({ id = '' }) => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    return item?.element;
};

/**
 * Get element by id
 *
 * @param {object} obj
 * @param {HTMLElement | undefined} obj.element
 * @returns {string | undefined}
 */
export const getIdByElement = ({ element }) => {
    const item = [...componentMap.values()].find((item) => {
        const currentElement = item?.element;
        return currentElement === element;
    });

    return item?.id ?? '';
};

/**
 * Get element by key and repeatId.
 *
 * @param {object} obj
 * @param {string} obj.keyValue
 * @param {string} obj.repeatId
 * @returns {{ id: string; element: HTMLElement }[]}
 */
export const getElementsByKeyAndRepeatId = ({
    keyValue = '',
    repeatId = '',
}) => {
    if (keyValue?.length === 0) return [];

    const values = [...componentMap.values()];
    return values
        .filter(
            (item) =>
                `${item.key}` === `${keyValue}` &&
                item.componentRepeatId === repeatId
        )
        .map(({ element, id }) => ({
            element,
            id,
        }));
};

/**
 * Get children of component inside a element by a precompiler children list
 *
 * @param {object} obj
 * @param {string} obj.id
 * @param {string} obj.repeatId
 * @param {boolean} [obj.filterById]
 * @returns {string[]}
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
