import { walkPreOrder } from './query-all-future-component';

/**
 * @import {UserComponent} from '../web-component/type';
 */

/**
 * @param {Element} root
 * @returns {UserComponent[]}
 */
function selectAll(root) {
    const result = [];

    for (const node of walkPreOrder(root)) {
        // @ts-expect-error Generator return a generic Element.
        if (node?.isUserComponent && node?.getSlotPosition?.()) {
            result.push(/** @type {UserComponent} */ (node));
        }
    }

    return result;
}

/**
 * @param {Element} node
 * @returns {UserComponent[]}
 */
export const queryComponentUseSlot = (node) => {
    /** @type {UserComponent[]} */
    let result = [];
    const root = node || document.body;

    for (const child of root.children) {
        result = [...result, ...selectAll(child)];
    }

    return result;
};
