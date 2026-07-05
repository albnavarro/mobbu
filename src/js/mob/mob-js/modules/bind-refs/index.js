//@ts-check

import { componentMap } from '../../component/component-map';
import { ATTR_BIND_REFS_ID, ATTR_BIND_REFS_NAME } from '../../constant';

/**
 * Get all simple node HTMLElement from track id ( trackRefsCollection ). All ref has parent id so is possible to get it
 * at the end of current parse
 *
 * @param {object} params
 * @param {HTMLElement | import('../../web-component/type').UserComponent} params.element
 * @returns {{ [key: string]: { element: HTMLElement; scopeId: string }[] }}
 */
export const getBindRefs = ({ element }) => {
    const refs = element.querySelectorAll(`[${ATTR_BIND_REFS_ID}]`);

    /** @type{Record<string, any>} */
    const initialValue = {};

    return [...refs].reduce((previous, current) => {
        const refId = current.getAttribute(ATTR_BIND_REFS_ID);
        const refName = current.getAttribute(ATTR_BIND_REFS_NAME);
        current.removeAttribute(ATTR_BIND_REFS_ID);
        current.removeAttribute(ATTR_BIND_REFS_NAME);

        if (!refName) return previous;

        const newRefsByName = Object.hasOwn(previous, refName)
            ? [...previous[refName], { element: current, scopeId: refId }]
            : [{ element: current, scopeId: refId }];

        return { ...previous, [refName]: newRefsByName };
    }, initialValue);
};

/**
 * @param {HTMLElement[]} refs
 * @returns {HTMLElement[]}
 */
export const getRefsSorter = (refs) => {
    return [
        ...new Set(
            refs.toSorted((a, b) => {
                if (a === b || !a || !b) return 0;
                if (a.compareDocumentPosition(b) & 2) {
                    // b comes before a
                    return 1;
                }
                return -1;
            })
        ),
    ];
};

/**
 * @param {object} params
 * @param {{ [key: string]: HTMLElement[] }} params.refs
 * @param {string} params.refName
 * @param {HTMLElement} params.element
 */
const mergeRefsAndOrder = ({ refs, refName, element }) => {
    return {
        ...refs,
        [refName]: getRefsSorter([...refs[refName], element]),
    };
};

/**
 * @param {{ [key: string]: { element: HTMLElement; scopeId: string }[] }} refs
 */
export const addBindRefsToComponent = (refs) => {
    for (const [refName, entries] of Object.entries(refs)) {
        for (const { element, scopeId } of entries) {
            const item = componentMap.get(scopeId);
            if (!item) continue;

            const { refs: previousRef } = item;
            if (!previousRef) continue;

            const newRefs = Object.hasOwn(previousRef, refName)
                ? mergeRefsAndOrder({ refs: previousRef, refName, element })
                : { ...previousRef, [refName]: [element] };

            componentMap.set(scopeId, {
                ...item,
                refs: newRefs,
            });
        }
    }
};

/**
 * @param {object} params
 * @param {string} params.id
 * @returns {{ [key: string]: HTMLElement[] }}
 */
export const getBindRefsById = ({ id }) => {
    const item = componentMap.get(id);
    if (!item) return {};

    const { refs, element } = item;
    if (!refs) return {};

    /**
     * Remove ref cancelled by invalidate/repeater
     */
    const refsUpdated = Object.entries(refs)
        .map(([name, collection]) => {
            return {
                name,
                collection: collection.filter((ref) => element.contains(ref)),
            };
        })
        .reduce((previous, current) => {
            return { ...previous, [current.name]: current.collection };
        }, {});

    /**
     * Update store
     */
    componentMap.set(id, {
        ...item,
        refs: refsUpdated,
    });

    return refsUpdated;
};

/**
 * @param {object} params
 * @param {string} params.id
 * @returns {{ [key: string]: HTMLElement }}
 */
export const getBindRefById = ({ id }) => {
    const refs = getBindRefsById({ id });

    return Object.entries(refs).reduce((previous, [name, collection]) => {
        return { ...previous, [name]: collection?.[0] };
    }, {});
};
