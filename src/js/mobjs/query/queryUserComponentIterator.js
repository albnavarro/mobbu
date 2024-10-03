/**
 * @param {Element} node
 * @returns {import("../webComponent/type").UserComponent[]}
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

    /** @type {import("../webComponent/type").UserComponent[]} */
    const result = [];

    while (nodeIterator.nextNode()) {
        const node =
            /** @type{import("../webComponent/type").UserComponent} */ (
                nodeIterator.referenceNode
            );
        result.push(node);
    }

    return result;
};
