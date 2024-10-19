// @ts-check

import { compareKeys } from '../utils/animationUtils.js';
import {
    setFromByCurrent,
    setFromCurrentByTo,
    setFromToByCurrent,
    setReverseValues,
    setRelative,
} from '../utils/tweenAction/setValues.js';
import { mergeDeep } from '../../utils/mergeDeep.js';
import { setStagger } from '../utils/stagger/setStagger.js';
import { STAGGER_DEFAULT_INDEX_OBJ } from '../utils/stagger/staggerCostant.js';
import {
    getStaggerFromProps,
    getStaggerArray,
} from '../utils/stagger/staggerUtils.js';
import {
    defaultCallbackOnComplete,
    defaultCallback,
} from '../utils/callbacks/defaultCallback.js';
import {
    setCallBack,
    setCallBackCache,
} from '../utils/callbacks/setCallback.js';
import {
    goToUtils,
    goFromUtils,
    goFromToUtils,
    setUtils,
} from '../utils/tweenAction/actions.js';
import { initRaf } from '../utils/initRaf.js';
import {
    compareKeysWarning,
    staggerIsOutOfRangeWarning,
} from '../utils/warning.js';
import { fpsLoadedLog } from '../utils/fpsLogInizialization.js';
import {
    lerpPrecisionIsValid,
    lerpVelocityIsValid,
    relativeIsValid,
    valueIsBooleanAndTrue,
} from '../utils/tweenAction/tweenValidation.js';
import { mobCore } from '../../../mobCore/index.js';
import { shouldInizializzeStagger } from '../utils/stagger/shouldInizialize.js';
import { resume } from '../utils/resumeTween.js';
import {
    getValueObj,
    getValueObjFromNative,
    getValueObjToNative,
} from '../utils/tweenAction/getValues.js';
import { mergeArray } from '../utils/tweenAction/mergeArray.js';
import { lerpGetValuesOnDraw } from './getValuesOnDraw.js';

export default class HandleLerp {
    /**
     * @param {import('./type.js').lerpTweenProps} [ data  = {}]
     *
     * @example
     * ```javascript
     * const myLerp = new HandleLerp({
     *   data: Object.<string, number>,
     *   precision: Number,
     *   velocity: Number,
     *   relative: Boolean
     *   stagger:{
     *      each: Number,
     *      from: Number|String|{x:number,y:number},
     *      grid: {
     *          col: Number,
     *          row: Number,
     *          direction: String,
     *      },
     *      waitComplete: Boolean,
     *   },
     * })
     *
     *
     * ```
     *
     * @description
     * Available methods:
     * ```javascript
     * myLerp.set()
     * myLerp.goTo()
     * myLerp.goFrom()
     * myLerp.goFromTo()
     * myLerp.subscribe()
     * myLerp.subscribeCache()
     * myLerp.onComplete()
     * myLerp.updateVelocity()
     * myLerp.updatePrecision()
     * myLerp.getId()
     * myLerp.get()
     * myLerp.getTo()
     * myLerp.getFrom()
     * myLerp.getToNativeType()
     * myLerp.getFromNativeType()
     *
     * ```
     */
    constructor(data) {
        /**
         * @private
         * @type {import('../utils/stagger/type.js').staggerObject}
         */
        this.stagger = getStaggerFromProps(data);

        /**
         * @private
         * @type {boolean}
         */
        this.relative = relativeIsValid(data?.relative, 'lerp');

        /**
         * @private
         * @type {number}
         */
        this.velocity = lerpVelocityIsValid(data?.velocity);

        /**
         * @private
         * @type {number}
         */
        this.precision = lerpPrecisionIsValid(data?.precision);

        /**
         * @private
         * @type {string}
         */
        this.uniqueId = mobCore.getUnivoqueId();

        /**
         * @private
         * @type {boolean}
         */
        this.isActive = false;

        /**
         * @private
         * @type{(value:any) => void|null }
         */
        this.currentResolve = undefined;

        /**
         * @private
         * @type{(value:any) => void|null}
         */
        this.currentReject = undefined;

        /**
         * @private
         * @type{Promise|undefined}
         */
        this.promise = undefined;

        /**
         * @private
         * @type {import('./type.js').lerpValues[]|[]}
         */
        this.values = [];

        /**
         * @private
         * @type {import('./type.js').lerpInitialData[]}
         */
        this.initialData = [];

        /**
         * @private
         * @type {import('../utils/callbacks/type.js').callbackObject<() => void>[]}
         */
        this.callback = [];

        /**
         * @private
         * @type {import('../utils/callbacks/type.js').callbackObject<string>[]}
         */
        this.callbackCache = [];

        /**
         * @private
         * @type {import('../utils/callbacks/type.js').callbackObject<() => void>[]}
         */
        this.callbackOnComplete = [];

        /**
         * @private
         * @type {import('../utils/callbacks/type.js').callbackObject<() => void>[]}
         */
        this.callbackStartInPause = [];

        /**
         * @private
         * @type {Array<() => void>}
         */
        this.unsubscribeCache = [];

        /**
         * @private
         * @type {boolean}
         */
        this.pauseStatus = false;

        /**
         * @private
         * @type {boolean}
         */
        this.firstRun = true;

        /**
         * @private
         * @type {boolean}
         */
        this.useStagger = true;

        /**
         * @private
         * @type {boolean}
         */
        this.fpsInLoading = false;

        /**
         * @private
         *
         * @description
         * This value is the base value merged with new value in custom prop
         * passed form user in goTo etc..
         *
         * @type {import('./type.js').lerpDefault}
         **/
        this.defaultProps = {
            reverse: false,
            velocity: this.velocity,
            precision: this.precision,
            relative: this.relative,
            immediate: false,
            immediateNoPromise: false,
        };

        /**
         * @private
         * @type {import('../utils/stagger/type.js').staggerDefaultIndex}
         **/
        this.slowlestStagger = STAGGER_DEFAULT_INDEX_OBJ;

        /**
         * @private
         * @type {import('../utils/stagger/type.js').staggerDefaultIndex}
         */
        this.fastestStagger = STAGGER_DEFAULT_INDEX_OBJ;

        /**
         * Set initial store data if defined in constructor props
         * If not use setData methods
         */
        const props = data?.data || null;
        if (props) this.setData(props);
    }

    /**
     * @param {number} _time
     * @param {number} fps
     * @param {(value:any) => void} res
     *
     * @returns {void}
     */
    draw(_time, fps, res = () => {}) {
        this.isActive = true;

        // Update values.
        this.values = lerpGetValuesOnDraw({
            values: this.values,
            fps,
            velocity: this.velocity,
            precision: this.precision,
        });

        // Prepare an obj to pass to the callback.
        const callBackObject = getValueObj(this.values, 'currentValue');

        defaultCallback({
            stagger: this.stagger,
            callback: this.callback,
            callbackCache: this.callbackCache,
            callBackObject: callBackObject,
            useStagger: this.useStagger,
        });

        // Check if all values is completed.
        const allSettled = this.values.every((item) => item.settled === true);

        if (allSettled) {
            const onComplete = () => {
                this.isActive = false;

                /**
                 * End of animation
                 * Set fromValue with ended value
                 * At the next call fromValue become the start value
                 */
                this.values = [...this.values].map((item) => {
                    return { ...item, fromValue: item.toValue };
                });

                // On complete
                if (!this.pauseStatus) {
                    res();

                    // Set promise reference to null once resolved
                    this.promise = undefined;
                    this.currentReject = undefined;
                    this.currentResolve = undefined;
                }
            };

            // Prepare an obj to pass to the callback with rounded value ( end user value)
            const cbObjectSettled = getValueObj(this.values, 'toValue');

            defaultCallbackOnComplete({
                onComplete,
                callback: this.callback,
                callbackCache: this.callbackCache,
                callbackOnComplete: this.callbackOnComplete,
                callBackObject: cbObjectSettled,
                stagger: this.stagger,
                slowlestStagger: this.slowlestStagger,
                fastestStagger: this.fastestStagger,
                useStagger: this.useStagger,
            });

            return;
        }

        mobCore.useFrame(() => {
            mobCore.useNextTick(({ time, fps }) => {
                if (this.isActive) this.draw(time, fps, res);
            });
        });
    }

    /**
     * @private
     *
     * @param {number} time current global time
     * @param {number} fps current FPS
     * @param {(value:any) => void} res current promise resolve
     **/
    onReuqestAnim(time, fps, res) {
        this.values = [...this.values].map((item) => {
            return { ...item, currentValue: item.fromValue };
        });

        this.draw(time, fps, res);
    }

    /**
     * @description
     * Inzialize stagger array
     *
     * @returns {Promise<any>}
     */
    async inzializeStagger() {
        /**
         * First time il there is a stagger load fps then go next step
         * next time no need to calcaulte stagger and jump directly next step
         *
         **/
        if (
            shouldInizializzeStagger(
                this.stagger.each,
                this.firstRun,
                this.callbackCache,
                this.callback
            )
        ) {
            const { averageFPS } = await mobCore.useFps();

            fpsLoadedLog('lerp', averageFPS);
            const cb = getStaggerArray(this.callbackCache, this.callback);

            if (this.stagger.grid.col > cb.length) {
                staggerIsOutOfRangeWarning(cb.length);
                this.firstRun = false;
                return;
            }

            const {
                staggerArray,
                staggerArrayOnComplete,
                fastestStagger,
                slowlestStagger,
            } = setStagger({
                arrayDefault: cb,
                arrayOnStop: this.callbackOnComplete,
                stagger: this.stagger,
                slowlestStagger: this.slowlestStagger,
                fastestStagger: this.fastestStagger,
            });

            if (this.callbackCache.length > this.callback.length) {
                this.callbackCache = staggerArray;
            } else {
                this.callback = staggerArray;
            }
            this.callbackOnComplete = staggerArrayOnComplete;
            this.slowlestStagger = slowlestStagger;
            this.fastestStagger = fastestStagger;
            this.firstRun = false;
        }

        return { ready: true };
    }

    /**
     * @private
     * @param {(arg0: any) => void} res
     * @param {(value: any) => void|null} reject
     *
     * @returns {Promise}
     */
    async startRaf(res, reject) {
        if (this.fpsInLoading) return;
        this.currentResolve = res;
        this.currentReject = reject;

        if (this.firstRun) {
            this.fpsInLoading = true;
            await this.inzializeStagger();
            this.fpsInLoading = false;
        }

        initRaf(
            this.callbackStartInPause,
            this.onReuqestAnim.bind(this),
            this.pause.bind(this),
            res
        );
    }

    /**
     * @param {import('../tween/type.js').tweenStopProps} Stop props
     * @returns {void}
     *
     * @description
     * Stop tween and fire reject of current promise.
     */
    stop({ clearCache = true } = {}) {
        if (this.pauseStatus) this.pauseStatus = false;
        this.values = setFromToByCurrent(this.values);

        /**
         * If isRunning clear all funture stagger.
         * If tween is ended and the lst stagger is running, let it reach end position.
         */
        if (this.isActive && clearCache)
            this.callbackCache.forEach(({ cb }) => mobCore.useCache.clean(cb));

        // Reject promise
        if (this.currentReject) {
            this.currentReject(mobCore.ANIMATION_STOP_REJECT);
            this.promise = undefined;
            this.currentReject = undefined;
            this.currentResolve = undefined;
        }

        // Reset RAF
        if (this.isActive) this.isActive = false;
    }

    /**
     * @description
     * Pause the tween
     *
     * @returns {void}
     */
    pause() {
        if (this.pauseStatus) return;
        this.pauseStatus = true;
        if (this.isActive) this.isActive = false;
        this.values = setFromByCurrent(this.values);
    }

    /**
     * @description
     * Resume tween in pause
     *
     * @returns {void}
     */
    resume() {
        if (!this.pauseStatus) return;
        this.pauseStatus = false;

        if (!this.isActive && this.currentResolve) {
            resume(this.onReuqestAnim.bind(this), this.currentResolve);
        }
    }

    /**
     * @type {import('./type.js').lerpSetData}
     *
     * @description
     * Set initial data structure, the method is call by data prop in constructor. In case of need it can be called after creating the instance
     */
    setData(obj) {
        this.values = Object.entries(obj).map((item) => {
            const [prop, value] = item;
            return {
                prop: prop,
                toValue: value,
                fromValue: value,
                currentValue: value,
                fromFn: () => 0,
                fromIsFn: false,
                toFn: () => 0,
                toIsFn: false,
                settled: false,
            };
        });

        this.initialData = this.values.map((item) => {
            return {
                prop: item.prop,
                toValue: item.toValue,
                fromValue: item.fromValue,
                currentValue: item.currentValue,
            };
        });
    }

    /**
     * @description
     * Reset data value with initial
     *
     * @returns {void}
     */
    resetData() {
        this.values = mergeDeep(this.values, this.initialData);
    }

    /**
     * @private
     * @type  {import('./type.js').lerpMergeProps}
     */
    mergeProps(props) {
        const newProps = { ...this.defaultProps, ...props };
        const { velocity, precision, relative } = newProps;
        this.relative = relativeIsValid(relative, 'lerp');
        this.velocity = lerpVelocityIsValid(velocity);
        this.precision = lerpPrecisionIsValid(precision);

        return newProps;
    }

    /**
     * @type {import('./type.js').lerpGoTo} obj to Values
     */
    goTo(obj, props = {}) {
        if (this.pauseStatus) return;
        this.useStagger = true;
        const data = goToUtils(obj);
        return this.doAction(data, props, obj);
    }

    /**
     * @type {import('./type.js').lerpGoFrom} obj from Values
     */
    goFrom(obj, props = {}) {
        if (this.pauseStatus) return;
        this.useStagger = true;
        const data = goFromUtils(obj);
        return this.doAction(data, props, obj);
    }

    /**
     * @type {import('./type.js').lerpGoFromTo} fromObj from Values
     */
    goFromTo(fromObj, toObj, props = {}) {
        if (this.pauseStatus) return;
        this.useStagger = true;

        // Check if fromObj has the same keys of toObj
        if (!compareKeys(fromObj, toObj)) {
            compareKeysWarning('lerp goFromTo:', fromObj, toObj);
            return this.promise;
        }

        const data = goFromToUtils(fromObj, toObj);

        return this.doAction(data, props, fromObj);
    }

    /**
     * @type {import('./type.js').lerpSet} obj to Values
     */
    set(obj, props = {}) {
        if (this.pauseStatus) return;
        this.useStagger = false;
        const data = setUtils(obj);
        return this.doAction(data, props, obj);
    }

    /**
     * @private
     * @type {import('./type.js').lerpDoAction}
     */
    doAction(data, props, obj) {
        this.values = mergeArray(data, this.values);
        const { reverse, immediate, immediateNoPromise } =
            this.mergeProps(props);

        if (valueIsBooleanAndTrue(reverse, 'reverse'))
            this.values = setReverseValues(obj, this.values);

        this.values = setRelative(this.values, this.relative);

        if (valueIsBooleanAndTrue(immediate, 'immediate ')) {
            this.isActive = false;
            this.values = setFromCurrentByTo(this.values);
            return Promise.resolve();
        }

        if (valueIsBooleanAndTrue(immediateNoPromise, 'immediateNoPromise')) {
            this.isActive = false;
            this.values = setFromCurrentByTo(this.values);
            return;
        }

        if (!this.isActive) {
            this.promise = new Promise((res, reject) => {
                this.startRaf(res, reject);
            });
        }

        if (this.promise) return this.promise;
    }

    /**
     * @description
     * Get current values, If the single value is a function it returns the result of the function.
     *
     * @return {Record<string, number>} current value obj.
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = myLerp.get();
     * ```
     */
    get() {
        return getValueObj(this.values, 'currentValue');
    }

    /**
     * @description
     * Get initial values, If the single value is a function it returns the result of the function.
     *
     * @return {Record<string, number>} initial value obj.
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = myLerp.getIntialData();
     * ```
     */
    getInitialData() {
        return getValueObj(this.initialData, 'currentValue');
    }

    /**
     * @description
     * Get from values, If the single value is a function it returns the result of the function.
     *
     * @return {Record<string, number>} from value obj.
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = myLerp.getFrom();
     * ```
     */
    getFrom() {
        return getValueObj(this.values, 'fromValue');
    }

    /**
     * @description
     * Get to values, If the single value is a function it returns the result of the function.
     *
     * @return {Record<string, number>} to value obj.
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = myLerp.getTo();
     * ```
     */
    getTo() {
        return getValueObj(this.values, 'toValue');
    }

    /**
     * @description
     * Get From values, if the single value is a function it returns the same function.
     *
     * @return {Record<string, number|(() => number)>} from value obj.
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = myLerp.getFromNativeType();
     * ```
     */
    getFromNativeType() {
        return getValueObjFromNative(this.values);
    }

    /**
     * @description
     * Get To values, if the single value is a function it returns the same function.
     *
     * @return {Record<string, number|(() => number)>} from value obj.
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = myLerp.getToNativeType();
     * ```
     */
    getToNativeType() {
        return getValueObjToNative(this.values);
    }

    /**
     * @description
     * Get tween type
     *
     * @return {string} tween type
     *
     * @example
     * ```javascript
     *
     *
     * const type = myLerp.getType();
     * ```
     */
    getType() {
        return 'LERP';
    }

    /**
     * @description
     * Get univoque Id
     *
     * @return {string} Univoque Id
     *
     * @example
     * ```javascript
     *
     *
     * const type = myLerp.getId();
     * ```
     */
    getId() {
        return this.uniqueId;
    }

    /**
     * @param  {number} velocity - New velocity value
     *
     * @example
     * ```javascript
     * myLerp.updateVelocity(0.1)
     *
     *
     * ```
     *
     * @description
     * Update velocity value.
       `default value is 0.06`,the closer the value is to 1, the faster the transition will be.
        The change will be persistent
     */
    updateVelocity(velocity) {
        this.velocity = lerpVelocityIsValid(velocity);
        this.defaultProps = mergeDeep(this.defaultProps, {
            velocity: this.velocity,
        });
    }

    /**
     * @param  {number} precision - New velocity value
     *
     * @example
     * ```javascript
     * myLerp.updatePrecision(0.5)
     *
     *
     * ```
     *
     * @description
     * Update precision value.
       When the calculated value is less than this number, the transition will be considered completed, the smaller the value, the greater the precision of the calculation, the `default value is 0.01`.
       The change will be persistent
     */
    updatePrecision(precision) {
        this.velocity = lerpPrecisionIsValid(precision);
        this.defaultProps = mergeDeep(this.defaultProps, {
            precision: this.precision,
        });
    }

    /**
     * @param {() => void} cb - callback function.
     * @return {() => void} unsubscribe callback.
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
     * Support callback to asyncTimeline.
     * Callback to manage the departure of tweens in a timeline. If a delay is applied to the tween and before the delay ends the timeline pauses the tween at the end of the delay will automatically pause.
     * Add callback to start in pause to stack
     *
     * @param  {() => void} cb cal function
     * @return {() => void} unsubscribe callback
     *
     */
    onStartInPause(cb) {
        const { arrayOfCallbackUpdated } = setCallBack(
            cb,
            this.callbackStartInPause
        );
        this.callbackStartInPause = arrayOfCallbackUpdated;
        return () => (this.callbackStartInPause = []);
    }

    /**
     * @param {() => void} cb - callback function.
     * @return {() => void} unsubscribe callback.
     *
     *
     * @description
     *  Similar to subscribe this callBack is launched when the data calculation stops (when the timeline ends or the scroll trigger is inactive).
     *  Useful for applying a different style to an inactive element.
     *  A typical example is to remove the teansform3D property:
     **/
    onComplete(cb) {
        const { arrayOfCallbackUpdated, unsubscribeCb } = setCallBack(
            cb,
            this.callbackOnComplete
        );
        this.callbackOnComplete = arrayOfCallbackUpdated;

        return () =>
            (this.callbackOnComplete = unsubscribeCb(this.callbackOnComplete));
    }

    /**
     * @param {(Object|HTMLElement)} item
     * @param {(arg0:any) => void} fn - callback function.
     * @return {() => void} unsubscribe callback
     *
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
     * Destroy tween
     */
    destroy() {
        if (this.promise) this.stop();
        this.callbackOnComplete = [];
        this.callbackStartInPause = [];
        this.callback = [];
        this.callbackCache = [];
        this.values = [];
        this.promise = undefined;
        this.unsubscribeCache.forEach((unsubscribe) => unsubscribe());
        this.unsubscribeCache = [];
    }
}
