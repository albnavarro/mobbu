// @ts-check

import { watchList } from '../../updateList/watchList';
import { repeatMap } from './add';

/**
 * @param {Object} obj
 * @param {String} obj.repeatId - current unique id for repater.
 * @param {( Array.<{ parent:HTMLElement, id:(string|undefined) }>|undefined )} obj.placeholderListObj
  - all repeat placholder active in current parse.
 *
 * @description
 * Launch repeater from id. And find parent from placeholder.
 */
export const inizializeRepeat = ({ repeatId, placeholderListObj }) => {
    if (!repeatId || !placeholderListObj || placeholderListObj.length === 0)
        return;

    //-new
    const obj = repeatMap.get(repeatId);
    if (!obj) return;

    /**
     * @description
     * Get parentNode of list.
     */
    const containerList = placeholderListObj.find(({ id }) => {
        return id === repeatId;
    });

    /**
     * Run watch list
     */
    const fireFirstRepeat = watchList({
        ...obj,
        repeatId,
        containerList: containerList?.parent ?? document.createElement('div'),
    });

    repeatMap.delete(repeatId);

    return fireFirstRepeat;
};
