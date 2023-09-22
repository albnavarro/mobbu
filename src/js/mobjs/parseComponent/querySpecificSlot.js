// @ts-check

import { walkPreOrder } from './queryAllFutureComponent';

/**
 * FUTURE COMPONENT
 */

/**
 * @param {Element} root
 * @param {String} slotName
 * @returns {HTMLElement|null}
 */
function selectAll(root, slotName) {
    for (const node of walkPreOrder(root)) {
        if (node?.getSlotName?.() === slotName) {
            return node;
        }
    }
    return null;
}

/**
 * @param {Element} node
 * @param {String} slotName
 * @returns {HTMLElement|null}
 */
export const querySecificSlot = (node, slotName) => {
    const root = node || document.body;

    for (const child of root.children) {
        const result = selectAll(child, slotName);
        if (result) return result;
    }

    return null;
};
