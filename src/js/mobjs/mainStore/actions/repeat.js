// @ts-check

import { watchList } from '../../updateList/watchList';
import { mainStore } from '../mainStore';

/**
 * @param { Object } mainObject
 * @param { String } mainObject.repeatId
 * @param { Object } mainObject.obj
 * @param { Function } mainObject.obj.afterUpdate
 * @param { Function } mainObject.obj.beforeUpdate
 * @param { Function } mainObject.obj.getChildren
 * @param { String } mainObject.obj.id
 * @param { String } mainObject.obj.key
 * @param { Object } mainObject.obj.props
 * @param { String } mainObject.obj.state
 * @param { String } mainObject.obj.targetComponent
 * @param { Function } mainObject.obj.updateState
 * @param { Function } mainObject.obj.watch
 *
 * @description
 * Add new repeater id and props.
 * Tehe repeater will execute after component render.
 */
export const addRepeat = ({ repeatId, obj }) => {
    mainStore.set('repeat', (/** @type {Array} */ prev) => {
        return [...prev, { [repeatId]: obj }];
    });
};

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

/**
 * @param {Object} obj
 * @param {String} obj.id
 * @param {String} obj.state
 * @param {HTMLElement} obj.container
 * @return void
 *
 * @description
 * Set active repeat
 */
export const addActiveRepeat = ({ id, state, container }) => {
    mainStore.set('activeRepeat', (/** @type {Array} */ prev) => {
        return [...prev, { id, state, container }];
    });
};

/**
 * @param {Object} obj
 * @param {String} obj.id
 * @param {String} obj.state
 * @param {HTMLElement} obj.container
 * @return void
 *
 * @description
 * Remove active repeat
 */
export const removeActiveRepeat = ({ id, state, container }) => {
    mainStore.set('activeRepeat', (/** @type {Array} */ prev) => {
        return prev.filter(
            ({
                id: currentId,
                state: currentState,
                container: currentContainer,
            }) =>
                id !== currentId &&
                state !== currentState &&
                container !== currentContainer
        );
    });
};

/**
 * @param {Object} obj
 * @param {String} obj.id
 * @param {String} obj.state
 * @param {HTMLElement} obj.container
 * @return {{id:String, state:String, container:HTMLElement}}
 *
 * @description
 * Get active repeat
 */
export const getActiveRepeater = ({ id = '', state = '', container }) => {
    const { activeRepeat } = mainStore.get();
    return activeRepeat.find((/** @type {Object} */ item) => {
        return (
            item.id === id &&
            item.state === state &&
            item.container === container
        );
    });
};
