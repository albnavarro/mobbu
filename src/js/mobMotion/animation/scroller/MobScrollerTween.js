// @ts-check

import { getRoundedValue } from '../utils/animationUtils.js';
import { setStagger } from '../utils/stagger/setStagger.js';
import {
    getStaggerFromProps,
    getStaggerArray,
} from '../utils/stagger/staggerUtils.js';
import {
    updateSubScribers,
    updateSubscribersCache,
} from '../utils/callbacks/setCallback.js';
import { syncCallback } from '../utils/callbacks/syncCallback.js';
import { goToUtils } from '../utils/tweenAction/actions.js';
import { staggerIsOutOfRangeWarning } from '../utils/warning.js';
import {
    durationIsValid,
    easeScrollerTweenIsValid,
} from '../utils/tweenAction/tweenValidation.js';
import { MobCore } from '../../../mobCore/index.js';
import { getValueObj } from '../utils/tweenAction/getValues.js';
import { STAGGER_DEFAULT_INDEX_OBJ } from '../utils/stagger/staggerCostant.js';

export default class MobScrollerTween {
    /**
     * @type {Function}
     */
    #ease;

    /**
     * @type {number}
     */
    #duration;

    /**
     * @type {import('../utils/stagger/type.js').StaggerObject}
     */
    #stagger;

    /**
     * @type {import('./type.js').MobScrollerTweenValue[]}
     */
    #values;

    /**
     * @type {import('../utils/callbacks/type.js').CallbackDefault}
     */
    #callbackOnStop;

    /**
     * @type {import('../utils/callbacks/type.js').CallbackDefault}
     */
    #callback;

    /**
     * @type{import('../utils/callbacks/type.js').CallbackCache}
     */
    #callbackCache;

    /**
     * @type {Array<() => void>}
     */
    #unsubscribeCache;

    /**
     * @type {string}
     */
    #type;

    /**
     * @param {import('./type.js').MobScrollerTween} data
     *
     * @example
     * ```js
     * const myParallaxTween = new MobScrollerTween({
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
    constructor(data) {
        this.#ease = easeScrollerTweenIsValid(data?.ease);
        this.#duration = durationIsValid(data?.duration);
        this.#stagger = getStaggerFromProps(data);
        this.#values = [];
        this.#callbackOnStop = [];
        this.#callback = [];
        this.#callbackCache = [];
        this.#unsubscribeCache = [];
        this.#type = 'parallaxTween';

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
     *
     * @returns {void}
     */
    inzializeStagger() {
        if (
            this.#stagger.each > 0 &&
            (this.#callbackCache.length > 0 || this.#callback.length > 0)
        ) {
            const cb = getStaggerArray(this.#callbackCache, this.#callback);

            if (this.#stagger.grid.col > cb.length) {
                staggerIsOutOfRangeWarning(cb.length);
                return;
            }

            const { staggerArray, staggerArrayOnComplete } = setStagger({
                arrayDefault: cb,
                arrayOnStop: this.#callbackOnStop,
                stagger: this.#stagger,
                slowlestStagger: STAGGER_DEFAULT_INDEX_OBJ, //sequencer doesn't support fastestStagger
                fastestStagger: STAGGER_DEFAULT_INDEX_OBJ, //sequencer doesn't support fastestStagger
            });

            if (this.#callbackCache.length > this.#callback.length) {
                this.#callbackCache =
                    /** @type{import('../utils/callbacks/type.js').CallbackCache} */ (
                        staggerArray
                    );
            } else {
                this.#callback =
                    /** @type {import('../utils/callbacks/type.js').CallbackDefault} */ (
                        staggerArray
                    );
            }

            this.#callbackOnStop = staggerArrayOnComplete;
        }
    }

    /**
     * @param {object} obj
     * @param {number} obj.partial - render at specific partial between 0 and duration
     * @param {boolean} obj.isLastDraw - use the callback defined by the onStop method
     * @param {boolean} obj.isLastDraw - compatibiliey with sequencer for Parallxx
     * @param {boolean} obj.useFrame - compatibiliey with sequencer for Parallxx
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
        this.#values = [...this.#values].map((item) => {
            const { toIsFn, toFn, toValue, fromIsFn, fromFn, fromValue } = item;

            const toValueParsed = toIsFn ? toFn() : toValue;
            const fromValueParsed = fromIsFn ? fromFn() : fromValue;
            const toValFinal = toValueParsed - fromValueParsed;

            const currentValue = this.#ease(
                partial,
                fromValueParsed,
                toValFinal,
                this.#duration
            );

            return {
                ...item,
                currentValue: getRoundedValue(currentValue),
            };
        });

        // Prepare an obj to pass to the callback
        const callBackObject = getValueObj(this.#values, 'currentValue');

        MobCore.useNextTick(() => {
            // Fire callback
            syncCallback({
                each: this.#stagger.each,
                useStagger: true,
                isLastDraw,
                callBackObject,
                callback: this.#callback,
                callbackCache: this.#callbackCache,
                callbackOnStop: this.#callbackOnStop,
            });
        });
    }

    /**
     *
     * @type {import('./type.js').MobScrollerTweenSetData}
     */
    setData(obj) {
        const valToArray = Object.entries(obj);

        this.#values = valToArray.map((item) => {
            const [prop, value] = item;
            return {
                prop: prop,
                toValue: value,
                toValProcessed: value,
                fromValue: value,
                currentValue: value,
                settled: false,

                /**
                 * Only for type check.
                 */
                fromFn: () => 0,
                toFn: () => 0,
            };
        });

        return this;
    }

    /**
     * Return the new array maeged with main array created in setData
     *
     * @param  {import('../utils/tweenAction/type.js').GoToParamsType[]} newData new datato merge
     * @return {void}
     */
    #mergeData(newData) {
        this.#values = this.#values.map((item) => {
            const itemToMerge = newData.find((newItem) => {
                return newItem.prop === item.prop;
            });

            // If exist merge
            return itemToMerge ? { ...item, ...itemToMerge } : { ...item };
        });
    }

    /**
     * @type {import('./type.js').MobScrollerTweenGoTo}
     *
     * ```
     * @description
     * Transform some properties of your choice from the `current value` to the `entered value`.
     * The target value can be a number or a function that returns a number, when using a function the target value will become dynamic and will change in real time as the result of the function changes
     */
    goTo(obj) {
        const data = goToUtils(obj);
        this.#mergeData(data);
        return this;
    }

    /**
     * @type {import('./type.js').MobScrollerTweenSubscribe}
     *
     * @description
     * Callback that returns updated values ready to be usable, it is advisable to use it for single elements, although it works well on a not too large number of elements (approximately 100-200 elements) for large staggers it is advisable to use the subscribeCache method .
     */
    subscribe(cb) {
        const { arrayOfCallbackUpdated, unsubscribeCb } = updateSubScribers(
            cb,
            this.#callback
        );

        this.#callback = arrayOfCallbackUpdated;
        return () => (this.#callback = unsubscribeCb(this.#callback));
    }

    /**
     * @type {import('./type.js').MobScrollerTweenOnStop}
     *
     * @description
     * Similar to subscribe this callBack is launched when the data calculation stops (when the timeline ends or the scroll trigger is inactive).
     * Useful for applying a different style to an inactive element.
     * A typical example is to remove the teansform3D property:
     */
    onStop(cb) {
        const { arrayOfCallbackUpdated, unsubscribeCb } = updateSubScribers(
            cb,
            this.#callbackOnStop
        );
        this.#callbackOnStop = arrayOfCallbackUpdated;

        return () =>
            (this.#callbackOnStop = unsubscribeCb(this.#callbackOnStop));
    }

    /**
     * @type {import('./type.js').MobScrollerTweenSubscribeCache}
     */
    subscribeCache(item, fn) {
        const { arrayOfCallbackUpdated, unsubscribeCb, unsubscribeCache } =
            updateSubscribersCache(
                item,
                fn,
                this.#callbackCache,
                this.#unsubscribeCache
            );

        this.#callbackCache = arrayOfCallbackUpdated;
        this.#unsubscribeCache = unsubscribeCache;
        return () => (this.#callbackCache = unsubscribeCb(this.#callbackCache));
    }

    /**
     * @description
     * Get duration
     * @type {import('./type.js').MobScrollerTweenGetDuration}
     */
    getDuration() {
        return this.#duration;
    }

    /**
     * @description
     * Get tween type - 'parallaxTween'
     * @type {import('./type.js').MobScrollerTweenGet}
     */
    getType() {
        return this.#type;
    }

    /**
     * @description
     * Destroy sequencer
     * @type {() => void}
     */
    destroy() {
        this.#values = [];
        this.#callbackOnStop = [];
        this.#callback = [];
        this.#callbackCache = [];
        this.#unsubscribeCache.forEach((unsubscribe) => unsubscribe());
        this.#unsubscribeCache = [];
    }
}
