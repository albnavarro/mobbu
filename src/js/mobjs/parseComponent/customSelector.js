// @ts-check
// https://stackfull.dev/applying-tree-traversal-algorithms-to-dom

/**
 * Generate numbers in the Fibonacci sequence.
 *
 * @generator
 * @function walkPreOrder
 * @param {Element} node
 * @yields {HTMLElement}
 */
function* walkPreOrder(node) {
    if (!node) return;

    // do something here
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
 * @returns {Array<HTMLElement>}
 */
function selectAll(root) {
    const result = [];
    for (const node of walkPreOrder(root)) {
        /**
         * Skip after first result.
         * We are looking the first occurrence.
         */
        if (result.length > 0) break;

        if (node?.getIsPlaceholder?.()) {
            result.push(node);
        }
    }
    return result;
}

/**
 * @param {Element} node
 * @returns {Array<Element>}
 */
export const queryAllFutureComponent = (node) => {
    let result = [];
    const root = node || document.body;

    for (const child of root.children) {
        result = [...result, ...selectAll(child)];
    }

    return result;
};
