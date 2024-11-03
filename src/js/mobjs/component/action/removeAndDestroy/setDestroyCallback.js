// @ts-check

import { componentMap } from '../../store';

/**
 * @param {object} obj
 * @param {() => void} [ obj.cb ] destroy callback function
 * @param {string} [ obj.id ] component id
 *
 * @description
 * Update deestroy call back by id.
 */

export const setDestroyCallback = ({ cb = () => {}, id }) => {
    if (!id) return;

    const item = componentMap.get(id);
    if (!item) return;

    componentMap.set(id, { ...item, destroy: cb });
};
