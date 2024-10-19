import { repeatIdHostMap } from '../repeatIdHostMap';
import { repeatIdPlaceHolderMap } from '../repeatIdPlaceHolderMap';

/**
 * @description
 * Store parent repeat block from repeat webComponent.
 *
 * @param {object} params
 * @param {string} params.repeatId - repeat id
 * @param {object} params.host  - webComponent root
 */

export const setParentRepeater = ({ repeatId, host }) => {
    const item = repeatIdPlaceHolderMap.get(repeatId);
    if (!item) return;

    const parent = /** @type{HTMLElement} */ (host.parentNode);
    repeatIdPlaceHolderMap.set(repeatId, {
        ...item,
        element: parent,
    });

    repeatIdHostMap.set(repeatId, host);
};
