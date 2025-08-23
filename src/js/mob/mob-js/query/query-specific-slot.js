import { walkPreOrder } from './query-all-future-component';

/**
 * @import {SlotComponent} from '../web-component/type';
 */

/**
 * @param {Element} root
 * @param {string | undefined} slotName
 * @returns {import('../web-component/type').SlotComponent | null}
 */
function selectAll(root, slotName) {
    for (const node of walkPreOrder(root)) {
        // @ts-expect-error Generator return a generic Element.
        if (node?.isSlot && node?.getSlotName?.() === slotName) {
            return /** @type {SlotComponent} */ (node);
        }
    }
    return null;
}

/**
 * @param {Element} node
 * @param {string | undefined} slotName
 * @returns {SlotComponent | null}
 */
export const querySecificSlot = (node, slotName) => {
    const root = node || document.body;

    for (const child of root.children) {
        const result = selectAll(child, slotName);
        if (result) return result;
    }

    return null;
};
