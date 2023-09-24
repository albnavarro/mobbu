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
export function* walkPreOrder(node) {
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
 * @param {Boolean} oneDepth
 * @returns {Array<HTMLElement>}
 */
function selectAll(root, oneDepth) {
    const result = [];
    for (const node of walkPreOrder(root)) {
        /**
         * Skip after first result.
         * We are looking the first occurrence.
         */
        if (result.length > 0 && oneDepth) break;

        if (node?.getIsPlaceholder?.()) {
            result.push(node);
        }
    }
    return result;
}

/**
 * @param {Element} node
 * @param {Boolean} oneDepth
 * @returns {Array<Element>}
 */
export const queryAllFutureComponent = (node, oneDepth = true) => {
    let result = [];
    const root = node || document.body;

    for (const child of root.children) {
        result = [...result, ...selectAll(child, oneDepth)];
    }

    return result;
};
