// @ts-check

import { repeatIdHostMap } from '../repeat-id-host-map';
import { repeatInstancesMap } from '../repeat-id-intances-map';

/**
 * - Get repeat parent by repeat id.
 * - Delete reepater webComponent
 *
 * @param {object} params
 * @param {string} params.id - Repeat Id
 * @returns {HTMLElement | undefined}
 */
export const getRepeatParent = ({ id }) => {
    if (!repeatInstancesMap.has(id)) {
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

    const parent = repeatInstancesMap.get(id);
    return parent?.element;
};
