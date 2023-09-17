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
 * @param {Array<String>|String} selector
 * @param {Element} root
 * @returns {Array<HTMLElement>}
 */
function selectAll(selector, root) {
    const result = [];
    for (const node of walkPreOrder(root)) {
        /**
         * Skip after first result.
         * We are looking the first occurrence.
         */
        if (result.length > 0) break;

        if (node.matches(selector)) {
            result.push(node);
        }
    }
    return result;
}

/**
 * @param {Array<String>|String} path
 * @param {HTMLElement} node
 * @returns {Array<HTMLElement>}
 */
export const customSelctorAll = (path, node) => {
    let result = [];
    if (path.length === 0) return result;

    const root = node || document.body;
    const selector = path[0];

    if (path.length === 1) return selectAll(selector, root);

    const newPath = root.matches(selector) ? path.slice(1) : path;
    for (const child of root.children) {
        /**
         * Skip after first result.
         * We are looking the first occurrence.
         */
        if (result.length > 0) break;

        result = [...result, ...selectAll(newPath, child)];
    }

    return result;
};
