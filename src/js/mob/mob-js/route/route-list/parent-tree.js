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

    console.log(parentList);
};

/** @returns {ParentList[]} */
export const getParentList = () => parentList;

/**
 * @param {string} hash
 */
// export const getPageParents = (hash) => {
//     //
// };
