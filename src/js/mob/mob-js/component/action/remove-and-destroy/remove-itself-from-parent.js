import { componentMap } from '../../component-map';
import { removeChildFromChildrenArray } from '../../utils';

/**
 * @param {Object} param
 * @param {string | undefined} param.id
 * @param {string | undefined} param.parentId
 * @param {string} param.componentName
 */
export const removeItselfFromParent = ({ id, parentId, componentName }) => {
    if (!id || !parentId) return;

    const value = componentMap.get(parentId);
    if (!value?.child) return;

    componentMap.set(parentId, {
        ...value,
        child: removeChildFromChildrenArray({
            currentChild: value.child,
            id,
            componentName,
        }),
    });
};
