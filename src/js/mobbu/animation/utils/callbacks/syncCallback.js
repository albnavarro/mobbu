// @ts-check

import { handleFrame } from '../../../events/rafutils/handleFrame.js';
import { handleCache } from '../../../events/rafutils/handleCache.js';
import { handleFrameIndex } from '../../../events/rafutils/handleFrameIndex.js';

/**
 * @param {Object} obj
 * @param {Number} obj.each
 * @param {Boolean} obj.useStagger
 * @param {Boolean} obj.isLastDraw
 * @param {Object.<string, number>} obj.callBackObject
 * @param {Array.<{cb:function,id:number,index:Number,frame:Number}>} obj.callback
 * @param {Array.<{cb:number,id:number,index:Number,frame:Number}>} obj.callbackCache
 * @param {Array.<{cb:function,id:number,index:Number,frame:Number}>} obj.callbackOnStop
 * @returns void
 *
 * @description
 * Fire callback while Running
 */
export const syncCallback = ({
    each,
    useStagger,
    isLastDraw,
    callBackObject,
    callback,
    callbackCache,
    callbackOnStop,
}) => {
    if (each === 0 || useStagger === false) {
        handleFrame.add(() => {
            callback.forEach(({ cb }) => cb(callBackObject));
        });

        handleFrame.add(() => {
            callbackCache.forEach(({ cb }) => {
                handleCache.fireObject({ id: cb, obj: callBackObject });
            });
        });
    } else {
        // Stagger
        callback.forEach(({ cb, frame }) => {
            handleFrameIndex.add(() => cb(callBackObject), frame);
        });

        callbackCache.forEach(({ cb, frame }) => {
            handleCache.update({ id: cb, callBackObject, frame });
        });
    }

    if (isLastDraw) {
        if (each === 0 || useStagger === false) {
            // No stagger, run immediatly
            handleFrame.add(() => {
                callbackOnStop.forEach(({ cb }) => cb(callBackObject));
            });
        } else {
            // Stagger
            callbackOnStop.forEach(({ cb, frame }) => {
                handleFrameIndex.add(() => cb(callBackObject), frame + 1);
            });
        }
    }
};
