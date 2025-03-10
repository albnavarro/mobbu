// @ts-check

import { clamp } from './animation/utils/animationUtils.js';
import { handleSetUp } from './setup.js';
import { mq } from './utils/mediaManager.js';

export const MobMotionCore = {
    /**
     * @description
     * - Here it is possible to modify the default values of the various modules of the library
     *
     * @type {import('./animation/utils/setUp/type.js').SetSetUp} props
     *
     *
     * @example
     * ```javascript
     * Default value schema:
     *
     * MobMotionCore.setDefault.set({
     *     startFps: 60,
     *     deferredNextTick: false,
     *     throttle: 100,
     *     usePassive: true
     *     mq: {
     *         xSmall: 320,
     *         small: 360,
     *         medium: 600,
     *         tablet: 768,
     *         desktop: 992,
     *         large: 1200,
     *         xLarge: 1400,
     *     },
     *     defaultMq: {
     *         value: 'desktop',
     *         type: 'min',
     *     },
     *     sequencer: {
     *         duration: 10,
     *         ease: 'easeLinear',
     *     },
     *     scrollTrigger: {
     *         springConfig: 'default',
     *         lerpConfig: 0.06,
     *         markerColor: {
     *             startEnd: '#ff0000',
     *             item: '#14df3b',
     *         },
     *     },
     *     parallax: {
     *         defaultRange: 8,
     *         springConfig: 'default',
     *         lerpConfig: 0.06,
     *     },
     *     parallaxTween: {
     *         duration: 10,
     *         ease: 'easeLinear',
     *     },
     *     tween: {
     *         duration: 1000,
     *         ease: 'easeLinear',
     *         relative: false,
     *     },
     *     spring: {
     *         relative: false,
     *         config: {
     *             default: {
     *                 tension: 20,
     *                 mass: 1,
     *                 friction: 5,
     *                 velocity: 0,
     *                 precision: 0.01,
     *             },
     *             gentle: {
     *                 tension: 120,
     *                 mass: 1,
     *                 friction: 14,
     *                 velocity: 0,
     *                 precision: 0.01,
     *             },
     *             wobbly: {
     *                 tension: 180,
     *                 mass: 1,
     *                 friction: 12,
     *                 velocity: 0,
     *                 precision: 0.01,
     *             },
     *             bounce: {
     *                 tension: 200,
     *                 mass: 3,
     *                 friction: 5,
     *                 velocity: 0,
     *                 precision: 0.01,
     *             },
     *             scroller: {
     *                 tension: 10,
     *                 mass: 1,
     *                 friction: 5,
     *                 velocity: 0,
     *                 precision: 0.5,
     *             },
     *         },
     *     },
     *     lerp: {
     *         relative: false,
     *         precision: 0.01,
     *         velocity: 0.06,
     *     },
     * });
     *
     *
     * ```
     */
    setDefault(props) {
        handleSetUp.set(props);
    },

    /**
     * @description
     * Returns the value of a specific property
     *
     * @type {import('./animation/utils/setUp/type.js').GetSetUp} prop
     *
     * @example
     * ```javascript
     * MobMotionCore.getDefault('parallax');
     * ```
     */
    getDefault(prop) {
        return handleSetUp.get(prop);
    },

    /**
     * @description
     * Perform a console.log() of the default values
     *
     * @example
     * ```javascript
     * MobMotionCore.printDefault();
     * ```
     */
    printDefault() {
        handleSetUp.print();
    },

    /**
     * @param {import('./utils/type.js').MqActionMethods} action
     * @param {import('./utils/type.js').MqValues} breakpoint
     *
     * @return {(boolean|number)} Returns a boolean value if the action value is equal to 'min' or 'max', returns a numeric value if it is equal to 'get'
     *
     * @description
     *
     * @example
     *
     * ```javascript
     *   Property schema:
     *   MobMotionCore.mq([String], [string])
     *
     *   const isDesktop = MobMotionCore.mq('min', 'desktop'); // true/false
     *   const isMobile = MobMotionCore.mq('max', 'desktop'); // true/false
     *   const desktopBreackPoint = core.mq('get', 'desktop'); // 992
     *
     *
     *
     * ```
     **/
    mq(action, breakpoint) {
        switch (action) {
            case 'min': {
                return mq['min'](breakpoint);
            }

            case 'max': {
                return mq['max'](breakpoint);
            }

            case 'get': {
                return mq['getBreackpoint'](breakpoint);
            }
        }
    },

    /**
     * @param {number} num
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    clamp(num, min, max) {
        return clamp(num, min, max);
    },
};
