import { ATTR_REFS } from '../../constant';

/**
 * @param {HTMLElement|import("../../webComponent/type").userComponent} element
 * @returns {{ [key: string ]: HTMLElement[] }}>}
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
 * @return {{ [key: string ]: HTMLElement[] }} refs
 */
export const parseRefsArray = (refs) => {
    return Object.entries(refs)
        .map(([key, value]) => {
            return { [key]: value };
        })
        .reduce((previous, current) => {
            return { ...previous, ...current };
        }, {});
};

/**
 * @param {{ [key: string ]: HTMLElement[] }} refs
 * @return {{ [key: string ]: HTMLElement }} refs
 */
export const parseRef = (refs) => {
    return Object.entries(refs)
        .map(([key, value]) => {
            return { [key]: value[0] };
        })
        .reduce((previous, current) => {
            return { ...previous, ...current };
        }, {});
};
