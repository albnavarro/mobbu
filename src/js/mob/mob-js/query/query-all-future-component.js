// @ts-check
// https://stackfull.dev/applying-tree-traversal-algorithms-to-dom

/**
 * @function walkPreOrder
 * @param {Element} node
 * @yields {HTMLElement}
 * @generator
 */
// @ts-ignore
export function* walkPreOrder(node) {
    if (!node) return;

    yield node;
    for (const child of node.children) {
        yield* walkPreOrder(child);
    }
}

/**
 * FUTURE COMPONENT
 */

/**
 * @param {Element} root
 * @param {boolean} firstOccurrence
 * @returns {import('../web-component/type').UserComponent[]}
 */
function selectAll(root, firstOccurrence) {
    const result = [];
    for (const node of walkPreOrder(root)) {
        /**
         * Skip after first result. We are looking the first occurrence.
         */
        if (result.length > 0 && firstOccurrence) break;

        if (node?.getIsPlaceholder?.()) {
            result.push(node);
        }
    }
    return result;
}

/**
 * @param {Element | DocumentFragment} node
 * @param {boolean} firstOccurence
 * @returns {import('../web-component/type').UserComponent[]}
 */
export const queryAllFutureComponent = (node, firstOccurence = true) => {
    /** @type {any[]} */
    let result = [];
    const root = node || document.body;

    for (const child of root.children) {
        result = [...result, ...selectAll(child, firstOccurence)];
    }

    return result;
};
