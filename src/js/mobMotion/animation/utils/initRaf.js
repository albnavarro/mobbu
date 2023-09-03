// @ts-check

import { handleFrame } from '../../events/rafutils/handleFrame.js';
import { handleNextTick } from '../../events/rafutils/handleNextTick.js';

/**
 * @param {Array.<{cb:function,id:number,index:Number,frame:Number}>} callbackPauseArray
 * @param {Function} rafFunction
 * @param {Function} pauseFunction
 * @param {Promise.<undefined>} resolve
 * @returns {void}
 *
 * @description
 * Fire mian requenst animation frame function.
 * In case the is some function add form timeline fire pauseFUnction.
 */
export const initRaf = (
    callbackPauseArray,
    rafFunction,
    pauseFunction,
    resolve
) => {
    handleFrame.add(() => {
        handleNextTick.add(({ time, fps }) => {
            const prevent = callbackPauseArray
                .map(({ cb }) => cb())
                .some((item) => item === true);
            rafFunction(time, fps, resolve);
            if (prevent) pauseFunction();
        });
    });
};
