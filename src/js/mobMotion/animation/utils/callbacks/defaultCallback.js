// @ts-check

import { handleFrame } from '../../../events/rafutils/handleFrame.js';
import { handleNextFrame } from '../../../events/rafutils/handleNextFrame.js';
import { handleCache } from '../../../events/rafutils/handleCache.js';
import { handleFrameIndex } from '../../../events/rafutils/handleFrameIndex.js';

/**
 * @param {Object} obj
 * @param {import('../stagger/staggerCostant.js').staggerTypesObject} obj.stagger
 * @param {Array.<{cb:function,id:number,index:Number,frame:Number}>} obj.callback
 * @param {Array.<{cb:number,id:number,index:Number,frame:Number}>} obj.callbackCache
 * @param {Object.<string, number>} obj.callBackObject
 * @param {Boolean} obj.useStagger
 *
 * @description
 * Fire callback while Running
 */
export const defaultCallback = ({
    stagger,
    callback,
    callbackCache,
    callBackObject,
    useStagger,
}) => {
    /**
     * Fire callback without stagger.
     */
    if (stagger.each === 0 || !useStagger) {
        handleFrame.add(() => {
            callback.forEach(({ cb }) => {
                cb(callBackObject);
            });
        });

        /**
         * Fire callback cache immediately.
         */
        handleFrame.add(() => {
            callbackCache.forEach(({ cb }) => {
                handleCache.fireObject({ id: cb, obj: callBackObject });
            });
        });

        return;
    }

    /**
     * Fire callback with default stagger.
     */
    callback.forEach(({ cb, frame }) => {
        handleFrameIndex.add(() => {
            cb(callBackObject);
        }, frame);
    });

    /**
     * Fire callback with cache stagger.
     * Update handleCache store.
     */
    callbackCache.forEach(({ cb, frame }) => {
        handleCache.update({ id: cb, callBackObject, frame });
    });
};

/**
 * @param {Object} obj
 * @param {Function} obj.onComplete
 * @param {import('../stagger/staggerCostant.js').staggerTypesObject} obj.stagger
 * @param {Array.<{cb:function,id:number,index:Number,frame:Number}>} obj.callback
 * @param {Array.<{cb:number,id:number,index:Number,frame:Number}>} obj.callbackCache
 * @param {Array.<{cb:function,id:number,index:Number,frame:Number}>} obj.callbackOnComplete
 * @param {Object.<string, number>} obj.callBackObject
 * @param {{index:number, frame:number}} obj.slowlestStagger
 * @param {{index:number, frame:number}} obj.fastestStagger
 * @param {Boolean} obj.useStagger
 *
 * @description
 *Callback on complete
 */
export const defaultCallbackOnComplete = ({
    onComplete,
    callback,
    callbackCache,
    callbackOnComplete,
    callBackObject,
    stagger,
    slowlestStagger,
    fastestStagger,
    useStagger,
}) => {
    /**
     * Fire callback without stagger.
     */
    if (stagger.each === 0 || !useStagger) {
        onComplete();

        handleNextFrame.add(() => {
            // Fire callback with exact end value
            callback.forEach(({ cb }) => {
                cb(callBackObject);
            });

            /**
             * Fire callback cache immediately.
             */
            callbackCache.forEach(({ cb }) => {
                handleCache.fireObject({ id: cb, obj: callBackObject });
            });

            callbackOnComplete.forEach(({ cb }) => {
                cb(callBackObject);
            });
        });

        return;
    }

    /**
     * Fire callback with default stagger.
     */
    callback.forEach(({ cb, frame }, /** @type {number} */ index) => {
        handleFrameIndex.add(() => {
            if (stagger.waitComplete) {
                if (index === slowlestStagger.index) {
                    cb(callBackObject);
                    onComplete();
                }
                return;
            }

            if (index === fastestStagger.index) {
                cb(callBackObject);
                onComplete();
            }
        }, frame);
    });

    /**
     * Fire callback with cache stagger.
     */
    callbackCache.forEach(({ cb, frame }, /** @type {number} */ index) => {
        handleFrameIndex.add(() => {
            if (stagger.waitComplete) {
                if (index === slowlestStagger.index) {
                    handleCache.fireObject({ id: cb, obj: callBackObject });
                    onComplete();
                }
                return;
            }

            /**
             * Fire callback cache immediately.
             */
            if (index === fastestStagger.index) {
                handleCache.fireObject({ id: cb, obj: callBackObject });
                onComplete();
            }
        }, frame);
    });

    /**
     * Fire on complete callbacon complete callback
     */
    callbackOnComplete.forEach(({ cb, frame }) => {
        handleFrameIndex.add(() => {
            cb(callBackObject);
        }, frame + 1);
    });
};
