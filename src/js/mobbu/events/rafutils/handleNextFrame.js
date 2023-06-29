// @ts-check

/**
 * @module handleNextFrame
 *
 * @description
 * Execute a callback to the next available frame allowing the creation of a request animation frame loop
 */
export const handleNextFrame = (() => {
    /**
     * @type {Array}
     */
    const callbacks = [];

    /**
     * @memberof module:handleNextFrame
     *
     * @description
     * Add callback
     *
     * @param {function(import('./handleFrame.js').handleFrameTypes):void } callBack - callback function
     *
     * @example
     * ```js
     * const loop = () => {
     *     handleNextFrame.add(({ fps, shouldRender, time }) => {
     *         // code
     *         loop();
     *     });
     * };
     *
     * handleFrame.add(() => loop());
     *
     * ```
     */
    const add = (callBack) => {
        callbacks.push(callBack);
    };

    /**
     * @memberof module:handleNextFrame
     *
     * @description
     * Reset callback
     *
     * @returns {Array.<function>}
     *
     */
    const get = () => {
        const callBackArray = [...callbacks];
        callbacks.length = 0;
        return callBackArray;
    };

    return { add, get };
})();
