// @ts-check

import { walkPreOrder } from './queryAllFutureComponent';

/**
 * FUTURE COMPONENT
 */

/**
 * @param {Element} root
 * @returns {Array<HTMLElement>}
 */
function selectAll(root) {
    const result = [];
    for (const node of walkPreOrder(root)) {
        if (node?.isRepeater && node?.getRepeatId?.()) {
            result.push(node);
        }
    }
    return result;
}

/**
 * @param {Element|import("../webComponent/type").userComponent} node
 * @returns {Array<Element>}
 */
export const queryGenericRepeater = (node) => {
    let result = [];
    const root = node || document.body;

    for (const child of root.children) {
        result = [...result, ...selectAll(child)];
    }

    return result;
};
