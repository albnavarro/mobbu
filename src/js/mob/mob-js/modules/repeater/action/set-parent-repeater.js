// @ts-check

import { repeatIdHostMap } from '../repeat-id-host-map';
import { repeatIdPlaceHolderMap } from '../repeat-id-placeholder-map';

/**
 * Store parent repeat block from repeat webComponent.
 *
 * @param {object} params
 * @param {string} params.repeatId - Repeat id
 * @param {HTMLElement} params.host - WebComponent root
 */

export const setParentRepeater = ({ repeatId, host }) => {
    const item = repeatIdPlaceHolderMap.get(repeatId);
    if (!item) return;

    const parent = /** @type {HTMLElement} */ (host.parentNode);
    repeatIdPlaceHolderMap.set(repeatId, {
        ...item,
        element: parent,
    });

    repeatIdHostMap.set(repeatId, host);
};
