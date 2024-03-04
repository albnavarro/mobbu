// @ts-check

import { mobCore } from '../../../mobCore';

/**
 * @param {Function} rafFunction
 * @param {Function} resolveFunction
 */
export const resume = (rafFunction, resolveFunction) => {
    mobCore.useFrame(() => {
        mobCore.useNextTick(({ time, fps }) => {
            rafFunction(time, fps, resolveFunction);
        });
    });
};
