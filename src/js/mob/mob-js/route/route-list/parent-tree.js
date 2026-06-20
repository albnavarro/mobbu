/** @type {ParentList[]} */
let parentList = [];

/**
 * @param {object} params
 * @param {string} params.hash
 * @param {import('../../type').Route[]} params.routes
 * @returns {ParentList[]}
 */
export const recursiveParentList = ({ hash, routes }) => {
    const children = routes.filter(({ parent }) => parent === hash);

    if (children.length === 0) return [];

    return children.map(({ hash: currentHash, pageName: currentPageName }) => {
        return {
            hash: currentHash,
            name: currentPageName ?? '',
            children: recursiveParentList({
                hash: currentHash,
                routes,
            }),
        };
    });
};

/**
 * @param {import('../../type').Route[]} routes
 */
export const setParentList = (routes) => {
    const firstLevel = routes.filter(
        ({ parent }) => !parent || parent?.length === 0
    );

    parentList = firstLevel.map(({ hash, pageName }) => {
        return {
            hash: hash,
            name: pageName ?? '',
            children: recursiveParentList({
                hash,
                routes,
            }),
        };
    });
};

/** @returns {ParentList[]} */
export const getPageTree = () => parentList;

/**
 * @param {object} params
 * @param {string} params.hash
 * @param {ParentList[]} [params.children]
 * @returns {ParentList[] | undefined}
 */
export const getPageTreeFromPath = ({ hash, children = parentList }) => {
    for (const node of children) {
        if (node.hash === hash) return node.children;

        /**
         * Return first valid result from nested pages
         */
        if (node.children.length > 0) {
            const result = getPageTreeFromPath({
                hash,
                children: node.children,
            });

            if (result) return result;
        }
    }
};
