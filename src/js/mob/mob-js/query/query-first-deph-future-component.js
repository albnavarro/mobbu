/**
 * FUTURE COMPONENT
 */

/**
 * @param {Element} root
 * @param {[]} result
 * @returns {import('../web-component/type').UserComponent[]}
 */
function selectFirstDepth(root, result) {
    // @ts-ignore
    return [...root.children].reduce((accumulator, node) => {
        // @ts-ignore
        return node?.getIsPlaceholder?.()
            ? [...accumulator, node]
            : selectFirstDepth(node, accumulator);
    }, result);
}

/**
 * @param {Element} node
 * @returns {import('../web-component/type').UserComponent[]}
 */
export const queryFirstDepthFutureComponent = (node) => {
    return selectFirstDepth(node, []);
};
