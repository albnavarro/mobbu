// @ts-check

import { walkPreOrder } from './queryAllFutureComponent';

/**
 * FUTURE COMPONENT
 */

/**
 * @param {Element} root
 * @param {String|undefined} id
 * @returns {Array<HTMLElement>|null}
 */
function selectAll(root, id) {
    for (const node of walkPreOrder(root)) {
        if (node?.getIsPlaceholder?.() && node?.getId?.() === id) {
            return node;
        }
    }
    return null;
}

/**
 * @param {Element} node
 * @param {String|undefined} id
 * @returns {Array<Element>|null}
 */
export const querySpecificFutureComponent = (node, id) => {
    const root = node || document.body;

    for (const child of root.children) {
        const result = selectAll(child, id);
        if (result) return result;
    }

    return null;
};
