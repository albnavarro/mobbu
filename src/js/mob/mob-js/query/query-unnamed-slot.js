import { walkPreOrder } from './query-all-future-component';

/**
 * @import {SlotComponent} from '../web-component/type';
 */

/**
 * @param {Element} root
 * @returns {SlotComponent | null}
 */
function selectAll(root) {
    for (const node of walkPreOrder(root)) {
        // @ts-expect-error Generator return a generic Element.
        if (node?.isSlot && !node?.getSlotName?.()) {
            return /** @type {SlotComponent} */ (node);
        }
    }
    return null;
}

/**
 * @param {Element} node
 * @returns {SlotComponent | null}
 */
export const queryUnNamedSlot = (node) => {
    const root = node || document.body;

    for (const child of root.children) {
        const result = selectAll(child);
        if (result) return result;
    }

    return null;
};
