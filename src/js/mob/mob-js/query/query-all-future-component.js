// https://stackfull.dev/applying-tree-traversal-algorithms-to-dom

/**
 * @import {UserComponent} from '../web-component/type';
 */

/**
 * Return a iterator that walk through current node and children in preorder ( depth-first ).
 *
 * @param {Element} node
 * @returns {Generator<Element | undefined>}
 */
export function* walkPreOrder(node) {
    if (!node) return;

    /**
     * First return is current node.
     */
    yield node;

    /**
     * Walk horizontally children
     */
    for (const child of node.children) {
        /**
         * The next return is first child of current node children.
         *
         * Yield* : Delegate next occurrence to another generator.
         */
        yield* walkPreOrder(child);
    }
}

/**
 * @param {Element} root
 * @param {boolean} firstOccurrence
 * @returns {UserComponent[]}
 */
function selectAll(root, firstOccurrence) {
    const result = [];

    for (const node of walkPreOrder(root)) {
        /**
         * Skip after first result. We are looking the first occurrence.
         */
        if (result.length > 0 && firstOccurrence) break;

        // @ts-expect-error Generator return a generic Element.
        if (node?.getIsPlaceholder?.()) {
            result.push(/** @type {UserComponent} */ (node));
        }
    }

    return result;
}

/**
 * @param {Element | DocumentFragment} node
 * @param {boolean} firstOccurence
 * @returns {UserComponent[]}
 */
export const queryAllFutureComponent = (node, firstOccurence = true) => {
    /** @type {UserComponent[]} */
    let result = [];
    const root = node || document.body;

    for (const child of root.children) {
        result = [...result, ...selectAll(child, firstOccurence)];
    }

    return result;
};
