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

    if (!children)
        return [
            {
                page: hash,
                children: [],
            },
        ];

    return children.map(({ hash: currentHash }) => {
        return {
            page: currentHash,
            children: recursiveParentList({ hash: currentHash, routes }),
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

    parentList = firstLevel.map(({ hash }) => {
        return {
            page: hash,
            children: recursiveParentList({ hash, routes }),
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
