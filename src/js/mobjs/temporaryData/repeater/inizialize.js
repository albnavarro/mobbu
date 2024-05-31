// @ts-check

import { watchList } from '../../repeater/watchList';
import { repeatMap } from './add';

/**
 * @param {object} obj
 * @param {string} obj.repeatId - current unique id for repater.
 * - all repeat placeholder active in current parse.
 * @param {({ parent: HTMLElement; id: any; }|undefined)} obj.repeaterParent
 *
 * @returns {() => void}
 *
 * @description
 * Launch repeater from id. And find parent from placeholder.
 */
export const inizializeRepeat = ({ repeatId, repeaterParent }) => {
    if (!repeatId || !repeaterParent) return;

    const obj = repeatMap.get(repeatId);
    if (!obj) return;

    /**
     * Run watch list
     */
    const fireFirstRepeat = watchList({
        ...obj,
        repeatId,
        repeaterParentElement:
            repeaterParent?.parent ?? document.createElement('div'),
    });

    repeatMap.delete(repeatId);

    return fireFirstRepeat;
};
