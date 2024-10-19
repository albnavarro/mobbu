import { invalidateIdHostMap } from '../invalidateIdHostMap';
import { invalidateIdPlaceHolderMap } from '../invalidateIdPlaceHolderMap';

/**
 * @description
 * Get invalidate parent by invalidate id.
 *
 * @returns {HTMLElement}
 */

export const getInvalidateParent = ({ id }) => {
    if (!invalidateIdPlaceHolderMap.has(id)) {
        return;
    }

    /**
     * Remove webComponent after first call to invalidateParent
     */
    if (invalidateIdHostMap.has(id)) {
        const host = invalidateIdHostMap.get(id);
        // @ts-ignore
        host?.removeCustomComponent();
        host.remove();
        invalidateIdHostMap.delete(id);
    }

    const parent = invalidateIdPlaceHolderMap.get(id);
    return parent?.element;
};
