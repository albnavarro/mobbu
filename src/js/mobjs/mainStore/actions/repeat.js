// @ts-check

import { watchList } from '../../updateList/watchList';
import { mainStore } from '../mainStore';

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

    /**
     *
     * @type {{repeat: Array.<{id: {
          afterUpdate:function({container:HTMLElement, childrenId:Array.<String>}):void ,
          beforeUpdate:function({container:HTMLElement, childrenId:Array.<String>}):void ,
          getChildren :Function,
          id: String,
          key: String,
          props: Object,
          state: String,
          targetComponent: String,
          updateState: Function,
          watch: Function
       }}>}}
     *
     * @description
     * Get all repeat from store
     */
    const { repeat } = mainStore.get();
    const currentItem = repeat.find((item) => {
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
