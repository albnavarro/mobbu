// @ts-check

import { walkPreOrder } from './queryAllFutureComponent';

/**
 * FUTURE COMPONENT
 */

/**
 * @param {Element} root
 * @returns {Array<HTMLElement>}
 */
function selectAll(root) {
    const result = [];
    for (const node of walkPreOrder(root)) {
        if (node?.isUserComponent && node?.getSlotPosition?.()) {
            result.push(node);
        }
    }
    return result;
}

/**
 * @param {Element} node
 * @returns {Array<Element>}
 */
export const queryComponentUseSlot = (node) => {
    /** @type {any[]} */
    let result = [];
    const root = node || document.body;

    for (const child of root.children) {
        result = [...result, ...selectAll(child)];
    }

    return result;
};
