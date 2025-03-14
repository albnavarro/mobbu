// @ts-check

/**
 * @type {{priority: number, cb: (arg0: {time: number, fps: number}) => void}[]}
 */
const callbacks = [];

/**
 * @description
 * Add callback
 *
 * @param {import('./type.js').HandleFrameCallbak} cb - callback function
 * @param {number} [ priority ]
 *
 * @example
 * ```javascript
 * handleFrame.add(() => {
 *     handleNextTick.add(({ fps, time }) => {
 *         // code
 *     });
 * });
 *
 * Loop request animation frame using handleNextTick:
 * const loop = () => {
 *     handleNextTick.add(() => {
 *         // read from DOM
 *
 *         handleFrame.add(() => {
 *             // write to the DOM
 *             loop();
 *         });
 *     });
 * };
 *
 * handleFrame.add(() => loop());
 *
 * To tick exactly after the request animation frame:
 * mobbu.default('set', { deferredNextTick: true });
 * ```
 */
const add = (cb = () => {}, priority = 100) => {
    callbacks.push({ cb, priority });
};

/**
 * @description
 * Fire callback
 *
 * @param {import('./type.js').HandleFrame} cb - callback function
 *
 * @example
 * ```javascript
   handleNextTick.fire({ time, fps });
 *
 * ```
 */
const fire = ({ time, fps }) => {
    if (callbacks.length === 0) return;

    callbacks.sort((a, b) => a.priority - b.priority);
    callbacks.forEach(({ cb }) => cb({ time, fps }));
    callbacks.length = 0;
};

/**
 * @module handleNextTick
 *
 * @description
 * Execute callbacks after scheduling the request animation frame. Use this method to read data from the DOM. To execute callbacks exactly after the request animation frame, set the global property deferredNextTick to true.
 */
export const handleNextTick = (() => {
    return { add, fire };
})();
