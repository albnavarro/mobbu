// @ts-check

import { walkPreOrder } from './query-all-future-component';

/**
 * FUTURE COMPONENT
 */

/**
 * @param {Element} root
 * @returns {HTMLElement[]}
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
 * @returns {Element[]}
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
