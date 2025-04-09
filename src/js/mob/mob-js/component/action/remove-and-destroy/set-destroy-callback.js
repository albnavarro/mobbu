// @ts-check

import { componentMap } from '../../store';

/**
 * Update deestroy call back by id.
 *
 * @param {object} obj
 * @param {() => void} [obj.cb] Destroy callback function
 * @param {string} [obj.id] Component id
 */

export const setDestroyCallback = ({ cb = () => {}, id }) => {
    if (!id) return;

    const item = componentMap.get(id);
    if (!item) return;

    componentMap.set(id, { ...item, destroy: cb });
};
