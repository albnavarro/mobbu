// @ts-check

import { walkPreOrder } from './query-all-future-component';

/**
 * FUTURE COMPONENT
 */

/**
 * @param {Element} root
 * @param {string} slotName
 * @returns {import("../webComponent/type").SlotComponent|null}
 */
function selectAll(root, slotName) {
    for (const node of walkPreOrder(root)) {
        if (node?.isSlot && node?.getSlotName?.() === slotName) {
            return node;
        }
    }
    return null;
}

/**
 * @param {Element} node
 * @param {string} slotName
 * @returns {import("../webComponent/type").SlotComponent|null}
 */
export const querySecificSlot = (node, slotName) => {
    const root = node || document.body;

    for (const child of root.children) {
        const result = selectAll(child, slotName);
        if (result) return result;
    }

    return null;
};
