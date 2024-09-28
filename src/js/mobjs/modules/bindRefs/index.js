import { mobCore } from '../../../mobCore';
import { componentMap } from '../../component/store';
import {
    ATTR_BIND_REFS_ID,
    ATTR_BIND_REFS_NAME,
    ATTR_BIND_REFS_TRACK,
} from '../../constant';

/**
 * @description
 * Find all bindRefs in component and track with uniqueID
 * Return array of uniqueId
 * Than in onMount function will get the final html element after slot etc... operation
 *
 * @param {HTMLElement|import("../../webComponent/type").userComponent} element
 * @returns {string[]}
 */
export const trackRefsCollection = (element) => {
    const refs = element.querySelectorAll(`[${ATTR_BIND_REFS_ID}]`);

    return [...refs].map((ref) => {
        const id = mobCore.getUnivoqueId();
        ref.setAttribute(ATTR_BIND_REFS_TRACK, id);
        return id;
    });
};

/**
 * @description
 * Get all simple node HTMLElement from track id ( trackRefsCollection ).
 *
 * @param {object} params
 * @param {HTMLElement|import("../../webComponent/type").userComponent} params.element
 * @param {string[]} params.refKey
 * @returns {{ [key: string ]: {element:HTMLElement, scopeId:string}[] }}
 */
export const getBindRefs = ({ element, refKey }) => {
    const refs = refKey
        .map((refId) =>
            element.querySelector(`[${ATTR_BIND_REFS_TRACK}="${refId}"]`)
        )
        .filter(Boolean);

    return [...refs].reduce((previous, current) => {
        const refId = current.getAttribute(ATTR_BIND_REFS_ID);
        const refName = current.getAttribute(ATTR_BIND_REFS_NAME);
        current.removeAttribute(ATTR_BIND_REFS_ID);
        current.removeAttribute(ATTR_BIND_REFS_NAME);
        current.removeAttribute(ATTR_BIND_REFS_TRACK);

        const newRefsByName =
            refName in previous
                ? [...previous[refName], { element: current, scopeId: refId }]
                : [{ element: current, scopeId: refId }];

        return { ...previous, [refName]: newRefsByName };
    }, {});
};

/**
 * @param {HTMLElement[]} refs
 * @returns {HTMLElement[]}
 */
const getRefsSorter = (refs) => {
    return refs.sort(function (a, b) {
        if (a === b || !a || !b) return 0;
        if (a.compareDocumentPosition(b) & 2) {
            // b comes before a
            return 1;
        }
        return -1;
    });
};

/**
 * @param {object} params
 * @param {{ [key: string ]: HTMLElement[] }} params.refs
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
 * @param {{ [key: string ]: {element:HTMLElement, scopeId:string}[] }} refs
 */
export const addBindRefsToComponent = (refs) => {
    Object.entries(refs).forEach(([refName, entries]) => {
        entries.forEach(({ element, scopeId }) => {
            const item = componentMap.get(scopeId);
            if (!item) return;

            const { refs: previousRef } = item;
            if (!previousRef) return;

            const newRefs =
                refName in previousRef
                    ? mergeRefsAndOrder({ refs: previousRef, refName, element })
                    : { ...previousRef, [refName]: [element] };

            componentMap.set(scopeId, {
                ...item,
                refs: newRefs,
            });
        });
    });
};
