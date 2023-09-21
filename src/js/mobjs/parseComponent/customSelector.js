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
 * @param {Element} root
 * @param {String|null} runtimeId
 * @returns {Array<HTMLElement>}
 */
function selectAll(root, runtimeId) {
    const result = [];
    for (const node of walkPreOrder(root)) {
        /**
         * Skip after first result.
         * We are looking the first occurrence.
         */
        if (result.length > 0) break;

        if (node?.isPlaceholder) {
            if (runtimeId && node?.runtime === runtimeId) {
                result.push(node);
                break;
            }

            result.push(node);
        }
    }
    return result;
}

/**
 * @param {Element} node
 * @param {String|null} runtimeId
 * @returns {Array<Element>}
 */
export const selectAllFirstDepth = (node, runtimeId) => {
    let result = [];
    const root = node || document.body;

    for (const child of root.children) {
        result = [...result, ...selectAll(child, runtimeId)];
    }

    return result;
};
