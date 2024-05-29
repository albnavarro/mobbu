import { ATTR_REFS } from '../../constant';

/**
 * @param {HTMLElement} element
 * @returns {{ [key: string ]: ( HTMLElement|import("../webComponent/type").userComponent )[] }}>}
 */
export const getRefs = (element) => {
    const refs = element.querySelectorAll(`[${ATTR_REFS}]`);

    return [...refs].reduce((previous, current) => {
        const refKey = current.getAttribute(ATTR_REFS);
        current.removeAttribute(ATTR_REFS);

        const newRefsByKey =
            refKey in previous ? [...previous[refKey], current] : [current];

        return { ...previous, [refKey]: newRefsByKey };
    }, {});
};

/**
 * @param {{ [key: string ]: HTMLElement[] }} refs
 * @return {{ [key: string ]: HTMLElement|HTMLElement[] }} refs
 */
export const parseRefs = (refs) => {
    return Object.entries(refs)
        .map(([key, value]) => {
            return value.length === 1 ? { [key]: value[0] } : { [key]: value };
        })
        .reduce((previous, current) => {
            return { ...previous, ...current };
        }, {});
};
