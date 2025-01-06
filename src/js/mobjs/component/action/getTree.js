// @ts-check

import { componentMap } from '../store';

/**
 * @param {Object} param
 * @param {[string, import('../type').componentStoreTypes][]} param.chunk
 * @returns {import('./type').TreeRecursive[]}
 */
const getTreeRecursive = ({ chunk }) => {
    // @ts-ignore
    return chunk.reduce((previous, current) => {
        const [key, value] = current;
        const { child, componentName, instanceName } = value;

        /**
         * Create an array of children
         */
        const childrenId = new Set(Object.values(child ?? {}).flat());
        const childrenChunk = [...componentMap.entries()].filter(([key]) =>
            childrenId.has(key)
        );

        return [
            ...previous,
            {
                id: key,
                componentName,
                instanceName,
                children: getTreeRecursive({
                    chunk: childrenChunk,
                }),
            },
        ];
    }, []);
};

/**
 * @param {Object} param
 * @param {string} param.parentId
 */
export const getTree = () => {
    /**
     * Get first level component with parentId = ''
     */
    const chunk = [...componentMap.entries()].filter(
        ([, value]) => !value?.parentId || value?.parentId === ''
    );

    return getTreeRecursive({ chunk });
};
