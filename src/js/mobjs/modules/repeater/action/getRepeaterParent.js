import { repeatIdHostMap } from '../repeatIdHostMap';
import { repeatIdPlaceHolderMap } from '../repeatIdPlaceHolderMap';

/**
 * @description
 * Get repeat parent by repeat id.
 *
 * @returns {HTMLElement}
 */
export const getRepeatParent = ({ id }) => {
    if (!repeatIdPlaceHolderMap.has(id)) {
        return;
    }

    /**
     * Remove webComponent after first call to repeaterParent
     */
    if (repeatIdHostMap.has(id)) {
        const host = repeatIdHostMap.get(id);
        // @ts-ignore
        host?.removeCustomComponent();
        host.remove();
        repeatIdHostMap.delete(id);
    }

    const parent = repeatIdPlaceHolderMap.get(id);
    return parent?.element;
};
