// @ts-check

import { walkPreOrder } from './queryAllFutureComponent';

/**
 * FUTURE COMPONENT
 */

/**
 * @param {Element} root
 * @param {String} repeatId
 * @returns {Array<HTMLElement>|null}
 */
function selectAll(root, repeatId) {
    for (const node of walkPreOrder(root)) {
        if (node?.getRepeatId?.() === repeatId) {
            return node;
        }
    }
    return null;
}

/**
 * @param {Element} node
 * @param {String} repeatId
 * @returns {Array<Element>|null}
 */
export const querySecificRepeater = (node, repeatId) => {
    const root = node || document.body;

    for (const child of root.children) {
        const result = selectAll(child, repeatId);
        if (result) return result;
    }

    return null;
};
