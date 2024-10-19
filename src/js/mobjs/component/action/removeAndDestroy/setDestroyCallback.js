// @ts-check

import { componentMap } from '../../store';

/**
 * @param {object} obj
 * @param {object} [ obj.cb ] destroy callback function
 * @param {object} [ obj.id ] component id
 *
 * @description
 * Update deestroy call back by id.
 */

export const setDestroyCallback = ({ cb = () => {}, id = null }) => {
    if (!id) return;

    const item = componentMap.get(id);
    if (!item) return;

    componentMap.set(id, { ...item, destroy: cb });
};
