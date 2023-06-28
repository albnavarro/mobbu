// @ts-check

import { getTime } from '../utils/time.js';

/**
 * @param {Function} func
 * @param {Number} limit
 * @returns {Function}
 *
 * @description
 */
export const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;

    return function () {
        const context = this;
        const args = arguments;

        if (!lastRan) {
            func.apply(context, args);
            lastRan = getTime();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function () {
                if (getTime() - lastRan >= limit) {
                    func.apply(context, args);
                    lastRan = getTime();
                }
            }, limit - (getTime() - lastRan));
        }
    };
};
