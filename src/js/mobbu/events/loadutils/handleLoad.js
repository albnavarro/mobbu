// @ts-check

/**
 * @module handleLoad
 * @description Function to execute a callback on page load
 */
export const handleLoad = (() => {
    /**
     * @type{Boolean}
     */
    let inizialized = false;

    /**
     * @type{Array}
     */
    let callback = [];

    /**
     * @type{Number}
     */
    let id = 0;

    /**
     * @memberof module:handleLoad
     * @return void
     */
    function handler() {
        /**
         * if - if there is no subscritor remove handler
         */
        if (callback.length === 0) {
            window.removeEventListener('DOMContentLoaded', handler);

            inizialized = false;
            return;
        }

        // Fire end of resize
        callback.forEach(({ cb }) => cb());
        callback = [];
    }

    /**
     * @description
     * init - if listener is not inizializad add it
     *
     * @memberof module:handleLoad
     * @return {void}
     */
    function init() {
        if (inizialized) return;
        inizialized = true;

        // Add debunce function to detect scroll end
        window.addEventListener('DOMContentLoaded', handler, {
            passive: false,
        });
    }

    /**
     * @description
     * Add callback on page load
     *
     * @memberof module:handleLoad
     * @param {function} cb - Callback function executed on page load
     * @returns {function():void}
     *
     * @example
     * ```js
     *
     * handleLoad(() => {
     *     ...
     * });
     *
     * ```
     */
    const addCallback = (cb) => {
        callback.push({ cb, id });
        const callbackId = id;
        id++;

        if (typeof window !== 'undefined') init();

        return () =>
            (callback = callback.filter((item) => item.id !== callbackId));
    };

    return addCallback;
})();
