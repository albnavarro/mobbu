import { bindPropsMap } from './bind-props-map';

/**
 * @param {object} obj
 * @param {string} obj.componentId
 * @return void
 *
 * @description
 * Remove dynamic prop reference by componentId.
 *
 */

export const removeCurrentIdToBindProps = ({ componentId }) => {
    if (!componentId) return;

    for (const [key, value] of bindPropsMap) {
        const { componentId: currentComponentId } = value;
        if (currentComponentId === componentId) {
            bindPropsMap.delete(key);
        }
    }
};
