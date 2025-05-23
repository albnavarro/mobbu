import { walkPreOrder } from './query-all-future-component';

/**
 * FUTURE COMPONENT
 */

/**
 * @param {Element} root
 * @param {string} repeatId
 * @returns {import('../web-component/type').RepeaterComponent | null}
 */
function selectAll(root, repeatId) {
    for (const node of walkPreOrder(root)) {
        if (node?.isRepeaterPlaceholder && node?.getRepeatId?.() === repeatId) {
            return node;
        }
    }
    return null;
}

/**
 * @param {Element} node
 * @param {string} repeatId
 * @returns {import('../web-component/type').RepeaterComponent | null}
 */
export const querySecificRepeater = (node, repeatId) => {
    const root = node || document.body;

    for (const child of root.children) {
        const result = selectAll(child, repeatId);
        if (result) return result;
    }

    return null;
};
