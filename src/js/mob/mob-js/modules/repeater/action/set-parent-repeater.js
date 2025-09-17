// @ts-check

import { repeatIdHostMap } from '../repeat-id-host-map';
import { repeatInstancesMap } from '../repeat-id-intances-map';

/**
 * Store parent repeat block from repeat webComponent.
 *
 * @param {object} params
 * @param {string} params.repeatId - Repeat id
 * @param {HTMLElement} params.host - WebComponent root
 */

export const setParentRepeater = ({ repeatId, host }) => {
    const item = repeatInstancesMap.get(repeatId);
    if (!item) return;

    const parent = /** @type {HTMLElement} */ (host.parentNode);

    /**
     * Add all DOM of repeater if no sync() utils is used
     */
    item.initialRenderWithoutSync.forEach((element) => {
        parent.append(element);
    });

    repeatInstancesMap.set(repeatId, {
        ...item,
        element: parent,
        initialRenderWithoutSync: [],
    });

    repeatIdHostMap.set(repeatId, host);
};
