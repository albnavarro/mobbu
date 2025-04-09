/**
 * @param {Element} node
 * @returns {import('../web-component/type').UserComponent[]}
 */
export const queryUserComponentIterator = (node) => {
    const nodeIterator = document.createNodeIterator(
        node,
        NodeFilter.SHOW_ELEMENT,
        {
            acceptNode(node) {
                // @ts-ignore
                if (node?.getIsPlaceholder?.()) return NodeFilter.FILTER_ACCEPT;
                return NodeFilter.FILTER_SKIP;
            },
        }
    );

    /** @type {import('../web-component/type').UserComponent[]} */
    const result = [];

    while (nodeIterator.nextNode()) {
        result.push(
            /** @type {import('../web-component/type').UserComponent} */ (
                nodeIterator.referenceNode
            )
        );
    }

    return result;
};
