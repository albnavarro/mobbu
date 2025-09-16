// @ts-check

import { repeatIdHostMap } from '../repeat-id-host-map';
import { repeatIdPlaceHolderMap } from '../repeat-id-placeholder-map';

/**
 * - Get repeat parent by repeat id.
 * - Delete reepater webComponent
 *
 * @param {object} params
 * @param {string} params.id - Repeat Id
 * @returns {HTMLElement | undefined}
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
        host?.remove();
        repeatIdHostMap.delete(id);
    }

    const parent = repeatIdPlaceHolderMap.get(id);
    return parent?.element;
};
