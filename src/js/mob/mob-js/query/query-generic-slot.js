import { walkPreOrder } from './query-all-future-component';

/**
 * @import {SlotComponent} from '../web-component/type';
 */

/**
 * @param {Element} root
 * @returns {SlotComponent[]}
 */
function selectAll(root) {
    const result = [];

    for (const node of walkPreOrder(root)) {
        // @ts-expect-error Generator return a generic Element.
        if (node?.isSlot && node?.getSlotName?.()) {
            result.push(/** @type {SlotComponent} */ (node));
        }
    }

    return result;
}

/**
 * @param {Element} node
 * @returns {SlotComponent[]}
 */
export const queryGenericSlot = (node) => {
    /** @type {SlotComponent[]} */
    let result = [];
    const root = node || document.body;

    for (const child of root.children) {
        result = [...result, ...selectAll(child)];
    }

    return result;
};
