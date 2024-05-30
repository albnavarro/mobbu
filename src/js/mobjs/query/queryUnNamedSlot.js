// @ts-check

import { walkPreOrder } from './queryAllFutureComponent';

/**
 * FUTURE COMPONENT
 */

/**
 * @param {Element} root
 * @returns {import("../webComponent/type").slotComponent|null}
 */
function selectAll(root) {
    for (const node of walkPreOrder(root)) {
        if (node?.isSlot && !node?.getSlotName?.()) {
            return node;
        }
    }
    return null;
}

/**
 * @param {Element} node
 * @returns {import("../webComponent/type").slotComponent|null}
 */
export const queryUnNamedSlot = (node) => {
    const root = node || document.body;

    for (const child of root.children) {
        const result = selectAll(child);
        if (result) return result;
    }

    return null;
};
