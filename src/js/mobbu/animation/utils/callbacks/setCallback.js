// @ts-check

import { callBackStore } from './callBackStore';
import { handleCache } from '../../../events/rafutils/handleCache.js';

/**
 * @callback subscribeCallbackType
 * @param {Object.<string, number>} props
 */

/**
 * @param {Function} currentCallback - callback to execute.
 * @param {Array.<{cb:function,id:number,index:Number,frame:Number}>} arrayOfCallback
 * @returns {function(Array.<{cb:function,id:number,index:Number,frame:Number}>):Array.<{cb:function,id:number,index:Number,frame:Number}>}
 *
 * @description
 * Add callback to Stack.
 *
 */
export const setCallBack = (currentCallback, arrayOfCallback) => {
    // Get new unbubscribeId.
    const { id } = callBackStore.get();

    // Update main callback array.
    // index and frame is settled on first run of tween
    arrayOfCallback.push({ cb: currentCallback, id, index: -1, frame: -1 });

    // Save current id for unsubscribe.
    const prevId = id;

    // Update Incremental id.
    callBackStore.quickSetProp('id', id + 1);

    // Delete item from arrayOfCallback, it is possibile unsubscribe a single stagger.
    return (arrayOfCallback) =>
        arrayOfCallback.map(({ id, cb, index, frame }) => {
            // Set NOOP.
            if (id === prevId) cb = () => {};
            return { id, cb, index, frame };
        });
};

/**
 * @param {('Object'|'HTMLElement')} item
 * @param {function(Object.<string, number>):void} currentCallback
 * @param {Array.<{cb:number,id:number,index:Number,frame:Number}>} arrayOfCallback
 * @param {Array.<function>} unsubscribeCacheArray - unsubscribe function of handleCache.
 *
 * @returns {{ unsubscribeCache:Array.<function>, unsubscribeCb:function(Array.<{cb:number,id:number,index:Number,frame:Number}>):Array.<{cb:number,id:number,index:Number,frame:Number}> }}
 */
export const setCallBackCache = (
    item,
    currentCallback,
    arrayOfCallback,
    unsubscribeCacheArray
) => {
    // Get new unbubscribeId.
    const { id } = callBackStore.get();

    // add item and function related to handleCache.
    const { id: cacheId, unsubscribe } = handleCache.add(item, currentCallback);

    // Update main callback array.
    // index and frame is settled on first run of tween
    arrayOfCallback.push({ cb: cacheId, id, index: -1, frame: -1 });

    // Update unsubscribeCache store.
    unsubscribeCacheArray.push(unsubscribe);

    const prevId = id;

    // Update Incremental id.
    callBackStore.quickSetProp('id', id + 1);

    return {
        unsubscribeCache: unsubscribeCacheArray,
        unsubscribeCb: (arrayOfCallback) => {
            // runsubscribe item from handleCache.
            unsubscribe();

            // Disable single stagger without modify staggers order
            return arrayOfCallback.map(({ id, cb, index, frame }) => {
                if (id === prevId) cb = -1;
                return { id, cb, index, frame };
            });
        },
    };
};
