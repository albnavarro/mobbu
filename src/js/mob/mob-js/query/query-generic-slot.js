// @ts-check

import { walkPreOrder } from './query-all-future-component';

/**
 * @param {Element} root
 * @returns {import('../web-component/type').SlotComponent[]}
 */
function selectAll(root) {
    const result = [];
    for (const node of walkPreOrder(root)) {
        if (node?.isSlot && node?.getSlotName?.()) {
            result.push(node);
        }
    }
    return result;
}

/**
 * @param {Element} node
 * @returns {import('../web-component/type').SlotComponent[]}
 */
export const queryGenericSlot = (node) => {
    /** @type {any[]} */
    let result = [];
    const root = node || document.body;

    for (const child of root.children) {
        result = [...result, ...selectAll(child)];
    }

    return result;
};
