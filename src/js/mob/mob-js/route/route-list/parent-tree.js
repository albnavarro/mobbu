/** @type {ParentList[]} */
let parentList = [];

/**
 * @param {object} params
 * @param {string} params.hash
 * @param {string} params.name
 * @param {import('../../type').Route[]} params.routes
 * @returns {ParentList[]}
 */
export const recursiveParentList = ({ hash, name, routes }) => {
    const children = routes.filter(({ parent }) => parent === hash);

    if (!children)
        return [
            {
                hash: hash,
                name,
                children: [],
            },
        ];

    return children.map(({ hash: currentHash, pageName: currentPageName }) => {
        return {
            hash: currentHash,
            name: currentPageName ?? '',
            children: recursiveParentList({
                hash: currentHash,
                name: currentPageName ?? '',
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
                name: pageName ?? '',
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
 * @param {ParentList[]} params.children
 * @returns {ParentList[] | undefined}
 */
export const getPageTreeFromPathRecursive = ({ hash, children }) => {
    for (const node of children) {
        if (node.hash === hash) return node.children;

        if (node.children.length > 0) {
            getPageTreeFromPathRecursive({ hash, children: node.children });
        }
    }
};

/**
 * @param {string} hash
 * @returns {ParentList[] | undefined}
 */
export const getPageTreeFromPath = (hash) => {
    for (const node of parentList) {
        if (node.hash === hash) return node.children;

        /**
         * Return first valid result from nested pages
         */
        if (node.children.length > 0) {
            const result = getPageTreeFromPathRecursive({
                hash,
                children: node.children,
            });

            if (result) return result;
        }
    }
};
