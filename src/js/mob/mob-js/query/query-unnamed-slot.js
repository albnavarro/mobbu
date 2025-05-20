import { walkPreOrder } from './query-all-future-component';

/**
 * @param {Element} root
 * @returns {import('../web-component/type').SlotComponent | null}
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
 * @returns {import('../web-component/type').SlotComponent | null}
 */
export const queryUnNamedSlot = (node) => {
    const root = node || document.body;

    for (const child of root.children) {
        const result = selectAll(child);
        if (result) return result;
    }

    return null;
};
