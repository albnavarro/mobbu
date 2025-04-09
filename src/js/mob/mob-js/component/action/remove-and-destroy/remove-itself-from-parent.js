// @ts-check

import { componentMap } from '../../store';
import { removeChildFromChildrenArray } from '../../utils';

/**
 * @param {Object} param
 * @param {string | undefined} param.id
 * @param {string | undefined} param.parentId
 * @param {string} param.componentName
 */

export const removeItselfFromParent = ({ id, parentId, componentName }) => {
    if (!id) return;

    const value = componentMap.get(parentId ?? '');
    if (!value) return;

    const { child } = value;
    if (!parentId || !child) return;

    componentMap.set(parentId, {
        ...value,

        child: {
            ...child,
            ...removeChildFromChildrenArray({
                currentChild: child,
                id,
                componentName,
            }),
        },
    });
};
