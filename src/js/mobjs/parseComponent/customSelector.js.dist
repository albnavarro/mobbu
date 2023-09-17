// https://stackfull.dev/applying-tree-traversal-algorithms-to-dom

function* walkPreOrder(node) {
    if (!node) return;

    // do something here
    yield node;
    for (const child of node.children) {
        yield* walkPreOrder(child);
    }
}

function selectAll(selector, root) {
    const result = [];
    for (const node of walkPreOrder(root)) {
        if (node.matches(selector)) {
            result.push(node);
        }
    }
    return result;
}

export const customSelctorAll = (path, node) => {
    let result = [];
    if (path.length === 0) return result;

    const root = node || document.body;
    const selector = path[0];

    if (path.length === 1) return selectAll(selector, root);

    const newPath = root.matches(selector) ? path.slice(1) : path;
    for (const child of root.children) {
        result = [...result, ...selectAll(newPath, child)];
    }

    return result;
};
