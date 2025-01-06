// @ts-check

import { getUnivoqueByKey } from '../../modules/repeater/utils';
import { componentMap } from '../store';
import { getElementById } from './element';
import { getRepeaterStateById } from './repeater';

/**
 * @param {object} obj
 * @param {string} obj.id
 * @returns {string[]|[]}
 *
 * @description
 * Get children id.
 */
export const getChildrenById = ({ id = '' }) => {
    if (!id || id === '') return [];

    const item = componentMap.get(id);
    const child = item?.child;

    if (!child) {
        console.warn(`getChildIdById failed no id found`);
        return [];
    }

    return Object.values(child).reduce(
        (current, previous) => [...previous, ...current],
        []
    );
};

/**
 * @param {object} obj
 * @param {string} obj.id
 * @param {string} obj.componentName
 * @returns {string[]|[]}
 *
 * @description
 * Get children id.
 */
export const getChildrenIdByName = ({ id = '', componentName = '' }) => {
    if (!id || id === '') return [];

    const item = componentMap.get(id);
    const child = item?.child;

    if (!child) {
        console.warn(`getChildIdById failed no id found`);
        return [];
    }

    return child?.[componentName] ?? [];
};

/**
 * @param {object} obj
 * @param {string} obj.id
 * @param {string} obj.componentName
 * @param {Array<HTMLElement|undefined>} [ obj.filterBy ]
 * @return void
 *
 *
 * @description
 * Update children order of a component
 */
export const updateChildrenOrder = ({ id, componentName, filterBy = [] }) => {
    /*
     * Get element
     */
    const element = getElementById({ id });
    if (!element) return;

    const components = getChildrenIdByName({ id, componentName });
    const componentsIdFiltered = components
        .map((id) => {
            return { id, element: getElementById({ id }) };
        })
        .filter(({ element }) => {
            return filterBy.length > 0 ? filterBy.includes(element) : true;
        })
        .toSorted((a, b) => {
            const { element: elementA } = a;
            const { element: elementB } = b;
            if (elementA === elementB || !elementA || !elementB) return 0;
            if (elementA.compareDocumentPosition(elementB) & 2) {
                // b comes before a
                return 1;
            }
            return -1;
        })
        .map(({ id }) => id);

    const item = componentMap.get(id);
    if (!item) return;

    const { child } = item;
    componentMap.set(id, {
        ...item,
        child: {
            ...child,
            [componentName]: componentsIdFiltered,
        },
    });
};

/**
 * @param {object} obj
 * @param {string[][]} obj.children
 * @return {string[][]}
 *
 *
 * @description
 * Get a chunked array of children sorted by DOM position
 * Compare the first element of each chunk
 */
export const gerOrderedChunkByDOMPosition = ({ children }) => {
    return children
        .map((currentChildren) => {
            return {
                childrenId: currentChildren,
                element: getElementById({ id: currentChildren?.[0] }),
            };
        })
        .toSorted((a, b) => {
            if (a.element.compareDocumentPosition(b.element) & 2) {
                // b comes before a
                return 1;
            }
            return -1;
        })
        .map(({ childrenId }) => childrenId);
};

/**
 * @param {object} obj
 * @param {string[][]} obj.children
 * @param {string} obj.key
 * @param {Record<string, any>[]} obj.current
 * @param {boolean} [ obj.useIndex ]
 * @return {string[][]}
 *
 * @description
 * Get a chunked array of children sorted by Key
 */
export const getOrderedChunkByCurrentRepeatValue = ({
    children,
    key,
    current,
    useIndex = false,
}) => {
    const currentUnivoque = useIndex
        ? current
        : getUnivoqueByKey({ data: current, key });

    /**
     * Current children after parse.
     */
    const childrenParsed = children.map((items) => {
        const { index: indexValue, current: currentValue } =
            getRepeaterStateById({
                id: items?.[0],
            });

        return {
            index: indexValue,
            key: currentValue?.[key],
            items,
        };
    });

    const currentParsed = currentUnivoque.map((item, index) => ({
        index,
        key: item?.[key],
    }));

    /**
     * Order children by compare currentUnivoque key.
     */
    const orderdChildren = currentParsed
        .map((currentItem) => {
            const prop = useIndex ? 'index' : 'key';

            return childrenParsed.find(
                (childrenItem) => childrenItem[prop] === currentItem[prop]
            );
        })
        .filter((item) => item !== undefined);

    /**
     * return chunk of ids.
     */
    return orderdChildren.map(({ items }) => items);
};
