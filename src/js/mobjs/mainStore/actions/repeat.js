// @ts-check

import { watchList } from '../../updateList/watchList';
import { mainStore } from '../mainStore';

/**
 * @typedef {object} RepeatItemDef
 * @property { function({container:HTMLElement, childrenId:Array.<String>}):void  } afterUpdate
 * @property { function({container:HTMLElement, childrenId:Array.<String>}):void  } beforeUpdate
 * @property { Function } getChildren
 * @property { String } id
 * @property { String } key
 * @property { Object } props
 * @property { String } state
 * @property { String } targetComponent
 * @property { Function } watch
 */

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

    const { repeat } = mainStore.get();
    const currentItem = repeat.find((/** @type{RepeatItemDef} */ item) => {
        return item?.[repeatId];
    }) ?? { id: undefined };

    /**
     * @type { typeof currentItem.id }
     *
     * @description
     * Check if there is a valid item.
     */
    const obj = currentItem?.[repeatId];
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
    watchList({
        ...obj,
        repeatId,
        containerList: containerList?.parent ?? document.createElement('div'),
    });

    /**
     * Remove callback
     */
    mainStore.set('repeat', (/** @type {Array} */ prev) => {
        return prev.filter((item) => {
            return !(repeatId in item);
        });
    });
};
