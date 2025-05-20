import { walkPreOrder } from './query-all-future-component';

/**
 * FUTURE COMPONENT
 */

/**
 * @param {Element} root
 * @returns {import('../web-component/type').RepeaterComponent[]}
 */
function selectAll(root) {
    const result = [];
    for (const node of walkPreOrder(root)) {
        if (node?.isRepeaterPlaceholder && node?.getRepeatId?.()) {
            result.push(node);
        }
    }
    return result;
}

/**
 * @param {Element | import('../web-component/type').UserComponent} node
 * @returns {import('../web-component/type').RepeaterComponent[]}
 */
export const queryGenericRepeater = (node) => {
    /** @type {any[]} */
    let result = [];
    const root = node || document.body;

    for (const child of root.children) {
        result = [...result, ...selectAll(child)];
    }

    return result;
};
