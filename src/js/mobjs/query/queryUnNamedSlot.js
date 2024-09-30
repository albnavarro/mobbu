// @ts-check

import { walkPreOrder } from './queryAllFutureComponent';

/**
 * @param {Element} root
 * @returns {import("../webComponent/type").slotComponent[]}
 */
function selectAll(root) {
    const result = [];
    for (const node of walkPreOrder(root)) {
        if (node?.isSlot && !node?.getSlotName?.()) {
            result.push(node);
        }
    }
    return result;
}

/**
 * @param {Element} node
 * @returns {import("../webComponent/type").slotComponent[]}
 */
export const queryUnNamedSlot = (node) => {
    let result = [];
    const root = node || document.body;

    for (const child of root.children) {
        result = [...result, ...selectAll(child)];
    }

    return result;
};
