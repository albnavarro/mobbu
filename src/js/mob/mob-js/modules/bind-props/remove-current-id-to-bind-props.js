import { bindPropsMap } from './bind-props-map';

/**
 * Remove dynamic prop reference by componentId.
 *
 * @param {object} obj
 * @param {string} obj.componentId
 * @returns {void}
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
