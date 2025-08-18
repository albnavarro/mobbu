import { MobCore } from '../../../mob-core';

/**
 * - Execute request animation frame init function.
 * - Check if tween should run or execute other action.
 * - Validate function start from external tool ( eg: asynctimeline ).
 *
 * @param {object} params
 * @param {{ cb: () => boolean }[]} params.validationFunction
 * @param {(time: number, fps: number) => void} params.successAction
 * @param {(time: number, fps: number) => void} params.failAction
 * @returns {void}
 */
export const initRaf = ({ validationFunction, successAction, failAction }) => {
    MobCore.useFrame(() => {
        MobCore.useNextTick(({ time, fps }) => {
            /**
             * Should i run ?
             */
            const fail = validationFunction
                .map(({ cb }) => cb())
                .includes(true);

            /**
             * Default run
             */
            successAction(time, fps);

            if (fail) {
                console.log('inti raf checker, pause is running');
            }

            /**
             * Fail function.
             */
            if (fail) failAction(time, fps);
        });
    });
};
