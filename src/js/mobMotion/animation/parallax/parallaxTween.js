import {
    getValueObj,
    getRoundedValue,
} from '../../animation/utils/animationUtils.js';
import { setStagger } from '../utils/stagger/setStagger.js';
import {
    getStaggerFromProps,
    getStaggerArray,
} from '../utils/stagger/staggerUtils.js';
import {
    setCallBack,
    setCallBackCache,
} from '../utils/callbacks/setCallback.js';
import { syncCallback } from '../utils/callbacks/syncCallback.js';
import { goToUtils } from '../utils/actions.js';
import { staggerIsOutOfRangeWarning } from '../utils/warning.js';
import {
    durationIsValid,
    easeParallaxTweenIsValid,
} from '../utils/tweenValidation.js';
import { mobCore } from '../../../mobCore/index.js';

/**
 * @typedef {Object} parallaxTweenTypes
 * @prop {Object.<string, number>} from initial values of the animation.
 * @prop {Object.<string, number>} to final values of the animation.
 * @prop {number} [ duration=10] Defines the time range of the animation, ScrollTrigger will take care of processing the value as needed. The default value is 10
 **/

export default class ParallaxTween {
    /**
     * @param { parallaxTweenTypes & import('../utils/stagger/staggerCostant.js').staggerTypes & import('../tween/tweenConfig.js').easeTypes} data
     *
     * @example
     * ```js
     * const myParallaxTween = new ParallaxTween({
     *   from: Object.<string, number>,
     *   to: Object.<string, number>,
     *   ease: [ String ],
     *   stagger:{
     *      each: [ Number ],
     *      from: [ Number|String|{x:number,y:number} ],
     *      grid: {
     *          col: [ Number ],
     *          row: [ Number ],
     *          direction: [ String ]
     *      },
     *   },
     * })
     *
     *
     * ```
     *
     * @description
     * Simplified tween specific to be used with scrollTrigger as an alternative to the more complex sequencer, ParallaxTween requires only one mutation step (from / to).
     *
     * Available methods:
     * ```js
     * myParallaxTween.subscribe()
     * myParallaxTween.subscribeCache()
     * myParallaxTween.onStop()
     *
     * ```
     */
    constructor(data = {}) {
        /**
         * @private
         */
        this.ease = easeParallaxTweenIsValid(data?.ease);

        /**
         * @private
         */
        this.duration = durationIsValid(data?.duration);

        /**
         * @private
         * @type {import('../utils/stagger/staggerCostant.js').staggerTypesObject}
         */
        this.stagger = getStaggerFromProps(data);

        /**
         * @private
         */
        this.values = [];

        /**
         * @private
         */
        this.callbackOnStop = [];

        /**
         * @private
         */
        this.callback = [];

        /**
         * @private
         */
        this.callbackCache = [];

        /**
         * @private
         */
        this.unsubscribeCache = [];

        /**
         * @private
         */
        this.type = 'parallaxTween';

        /**
         * Set initial store data if defined in constructor props
         * If not use setData methods
         */
        const props = data?.from || null;
        if (props) this.setData(props);

        if (data?.to) {
            this.goTo(data.to);
        }
    }

    /**
     * @description
     * Inzialize stagger array
     */
    inzializeStagger() {
        if (
            this.stagger.each > 0 &&
            (this.callbackCache.length > 0 || this.callback.length > 0)
        ) {
            const cb = getStaggerArray(this.callbackCache, this.callback);

            if (this.stagger.grid.col > cb.length) {
                staggerIsOutOfRangeWarning(cb.length);
                return;
            }

            const { staggerArray, staggerArrayOnComplete } = setStagger({
                arr: cb,
                endArr: this.callbackOnStop,
                stagger: this.stagger,
                slowlestStagger: {},
                fastestStagger: {},
            });

            if (this.callbackCache.length > this.callback.length) {
                this.callbackCache = staggerArray;
            } else {
                this.callback = staggerArray;
            }
            this.callbackOnStop = staggerArrayOnComplete;
        }
    }

    /**
     * @typedef {Object} sequencerDrawTypes
     * @prop {Number} [ partial = 0] render at specific partial between 0 and duration
     * @prop {Boolean} [ isLastDraw = false] use the callback defined by the onStop method
     **/

    /**
     * @param {sequencerDrawTypes} props
     *
     * @example
     * ```js
     * myParallaxTween.draw(
     *      partial: 200,
     *      isLastDraw: true,
     * );
     *
     *
     * ```
     * @description
     */
    draw({ partial, isLastDraw }) {
        const mainFn = () => {
            this.values.forEach((item) => {
                const toValue = item.toIsFn ? item.toFn() : item.toValue;
                const fromValue = item.fromIsFn
                    ? item.fromFn()
                    : item.fromValue;
                const toValProcessed = toValue - fromValue;

                item.currentValue = this.ease(
                    partial,
                    fromValue,
                    toValProcessed,
                    this.duration
                );
                item.currentValue = getRoundedValue(item.currentValue);
            });

            // Prepare an obj to pass to the callback
            const callBackObject = getValueObj(this.values, 'currentValue');

            // Fire callback
            syncCallback({
                each: this.stagger.each,
                useStagger: true,
                isLastDraw,
                callBackObject,
                callback: this.callback,
                callbackCache: this.callbackCache,
                callbackOnStop: this.callbackOnStop,
            });
        };

        mobCore.useNextTick(() => mainFn());
    }

    /**
     *
     * @prop {Object.<string, number>} obj Initial data Object
     * @returns {this} The instance on which this method was called.
     */
    setData(obj) {
        const valToArray = Object.entries(obj);

        this.values = valToArray.map((item) => {
            const [prop, value] = item;
            return {
                prop: prop,
                toValue: value,
                toValProcessed: value,
                fromValue: value,
                currentValue: value,
                settled: false,
            };
        });

        return this;
    }

    /**
     * @private
     *
     * Return the new array maeged with main array created in setData
     *
     * @param  {Array} newData new datato merge
     * @return {Array} main store Array merged with new data
     */
    mergeData(newData) {
        this.values = this.values.map((item) => {
            const itemToMerge = newData.find((newItem) => {
                return newItem.prop === item.prop;
            });

            // If exist merge
            return itemToMerge ? { ...item, ...itemToMerge } : { ...item };
        });
    }

    /**
     * @private
     *
     * @param {Object.<string, number|function>} obj to values
     * @returns {this} The instance on which this method was called.
     *
     * @example
     * ```js
     * myParallaxTween.goTo(
     *     { string: number|function, ... }
     * );
     *
     *
     * ```
     * @description
      Transform some properties of your choice from the `current value` to the `entered value`.
      The target value can be a number or a function that returns a number, when using a function the target value will become dynamic and will change in real time as the result of the function changes
     */
    goTo(obj) {
        const data = goToUtils(obj);
        this.mergeData(data);
        return this;
    }

    /**
     * @param {import('../utils/callbacks/setCallback.js').subscribeCallbackType} cb - callback function.
     * @return {Function} unsubscribe callback.
     *
     * @example
     * ```js
     * //Single DOM element
     * const unsubscribe = myParallaxTween.subscribe(({ x,y... }) => {
     *      domEl.style.prop = `...`
     * })
     * unsubscribe()
     *
     *
     * //Multiple DOM element ( stagger )
     * const unsubscribeStagger = [...elements].map((item) => {
     *   return myParallaxTween.subscribe(({ x, y... }) => {
     *       item.style.prop = ...
     *   });
     * });
     * unsubscribeStagger.forEach((item) => item());
     *
     *
     * ```
     * @description
     * Callback that returns updated values ready to be usable, it is advisable to use it for single elements, although it works well on a not too large number of elements (approximately 100-200 elements) for large staggers it is advisable to use the subscribeCache method .
     */
    subscribe(cb) {
        const { arrayOfCallbackUpdated, unsubscribeCb } = setCallBack(
            cb,
            this.callback
        );

        this.callback = arrayOfCallbackUpdated;
        return () => (this.callback = unsubscribeCb(this.callback));
    }

    /**
     * @param {import('../utils/callbacks/setCallback.js').subscribeCallbackType} cb - callback function.
     * @return {Function} unsubscribe callback.
     *
     * @example
     * ```js
     * //Single DOM element
     * const unsubscribe = myParallaxTween.onStop(({ x,y... }) => {
     *      domEl.style.prop = `...`
     * })
     * unsubscribe()
     *
     *
     * //Multiple DOM element ( stagger )
     * const unsubscribeStagger = [...elements].map((item) => {
     *   return myParallaxTween.onStop(({ x, y... }) => {
     *       item.style.prop = ...
     *   });
     * });
     * unsubscribeStagger.forEach((item) => item());
     *
     *
     * ```
     * @description
     * Similar to subscribe this callBack is launched when the data calculation stops (when the timeline ends or the scroll trigger is inactive).
     * Useful for applying a different style to an inactive element.
     * A typical example is to remove the teansform3D property:
     *
     * @example
     * ```js
     * // Use transform3D while item is active
     * mySequencer.subscribe(({x}) => {
     *      domEl.style.transform = ` transform3D(0,0,0) translateX(${x}px)`
     * })
     *
     * // Remove transform3D when item is inactive
     * mySequencer.onStop(({x}) => {
     *      domEl.style.transform = `translateX(${x}px)`
     * })
     * ```
     */
    onStop(cb) {
        const { arrayOfCallbackUpdated, unsubscribeCb } = setCallBack(
            cb,
            this.callbackOnStop
        );
        this.callbackOnStop = arrayOfCallbackUpdated;

        return () => (this.callbackOnStop = unsubscribeCb(this.callbackOnStop));
    }

    /**
     * @param {('Object'|'HTMLElement')} item
     * @param {import('../utils/callbacks/setCallback.js').subscribeCallbackType} fn - callback function.
     * @return {Function} unsubscribe callback
     *
     * @example
     *```js
     * //Multiple DOM element ( stagger )
     * const unsubscribeStagger = [...elements].map((item) => {
     *   return myParallaxTween.subscribeCache(item, ({ x, y... }) => {
     *       item.style.prop = ...
     *   });
     * });
     * unsubscribeStagger.forEach((item) => item());
     *
     *
     * ```
     * @description
     * Callback that returns updated values ready to be usable, specific to manage large staggers.
     */
    subscribeCache(item, fn) {
        const { arrayOfCallbackUpdated, unsubscribeCb, unsubscribeCache } =
            setCallBackCache(
                item,
                fn,
                this.callbackCache,
                this.unsubscribeCache
            );

        this.callbackCache = arrayOfCallbackUpdated;
        this.unsubscribeCache = unsubscribeCache;
        return () => (this.callbackCache = unsubscribeCb(this.callbackCache));
    }

    /**
     * @description
     * Get duration
     * @return {Number}
     */
    getDuration() {
        return this.duration;
    }

    /**
     * @description
     * Get tween type - 'parallaxTween'
     */
    getType() {
        return this.type;
    }

    /**
     * @description
     * Destroy sequencer
     */
    destroy() {
        this.values = [];
        this.callbackOnStop = [];
        this.callback = [];
        this.callbackCache = [];
        this.unsubscribeCache.forEach((unsubscribe) => unsubscribe());
        this.unsubscribeCache = [];
    }
}
