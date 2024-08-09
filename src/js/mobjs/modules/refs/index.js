import { getElementById } from '../../component/action/element';
import { ATTR_REFS } from '../../constant';

/**
 * @description
 * Get all reference per ref ( querySelectorAll )
 *
 * @param {HTMLElement|import("../../webComponent/type").userComponent} element
 * @returns {{ [key: string ]: HTMLElement[] }}>}
 */
export const getRefs = (element) => {
    const refs = element.querySelectorAll(`[${ATTR_REFS}]`);

    return (
        [...refs]
            // @ts-ignore
            .filter((item) => !item.getIsPlaceholder?.())
            .reduce((previous, current) => {
                const refKey = current.getAttribute(ATTR_REFS);
                current.removeAttribute(ATTR_REFS);

                const newRefsByKey =
                    refKey in previous
                        ? [...previous[refKey], current]
                        : [current];

                return { ...previous, [refKey]: newRefsByKey };
            }, {})
    );
};

/**
 * @description
 * Get an array `{ref, id}[]`
 * Get id reference for each placeholder component
 * After parse will be fransformed in real element.
 *
 * @param {HTMLElement|import("../../webComponent/type").userComponent} element
 * @returns {{ ref: string, id:string }[]}
 */
export const getRefsComponent = (element) => {
    const refs = element.querySelectorAll(`[${ATTR_REFS}]`);

    return (
        [...refs]
            // @ts-ignore
            .filter((item) => item.getIsPlaceholder?.())
            .map((item) => {
                const refKey = item.getAttribute(ATTR_REFS);
                item.removeAttribute(ATTR_REFS);

                return {
                    ref: refKey,
                    // @ts-ignore
                    id: item.getId?.(),
                };
            })
    );
};

/**
 * @description
 * Get only first element per ref ( ref )
 *
 * @param {{ [key: string ]: HTMLElement[] }} refs
 * @return {{ [key: string ]: HTMLElement }}
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

/**
 * @description
 * From an array of single pair `{ ref: id }[]`
 * return an array with ref: `{ref: element[]}`
 * Get element from placeholder id and organize in array
 *
 * @param { {ref: string, id:string }[]} refs
 * @return {{ [key: string ]: HTMLElement[] }}
 */
export const refsComponentToNewElement = (refs) => {
    return refs
        .map(({ ref, id }) => {
            return {
                ref,
                element: getElementById({ id }),
            };
        })
        .reduce((previous, current) => {
            const { ref, element } = current;

            const newRefsByKey =
                ref in previous ? [...previous[ref], element] : [element];

            return { ...previous, [ref]: newRefsByKey };
        }, {});
};
