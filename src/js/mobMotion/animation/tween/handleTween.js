// @ts-check

import { compareKeys } from '../utils/animationUtils.js';
import {
    setFromCurrentByTo,
    setFromToByCurrent,
    setReverseValues,
    setRelativeTween,
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
    durationIsNumberOrFunctionIsValid,
    easeTweenIsValid,
    easeTweenIsValidGetFunction,
    relativeIsValid,
    valueIsBooleanAndTrue,
} from '../utils/tweenAction/tweenValidation.js';
import { mobCore } from '../../../mobCore/index.js';
import { shouldInizializzeStagger } from '../utils/stagger/shouldInizialize.js';
import { mergeArrayTween } from '../utils/tweenAction/mergeArray.js';
import {
    getValueObj,
    getValueObjFromNative,
    getValueObjToNative,
} from '../utils/tweenAction/getValues.js';
import { tweenGetValueOnDraw } from './getValuesOnDraw.js';

export default class HandleTween {
    /**
     * @param {import('./type.js').tweenProps} [ data ]
     *
     * @example
     * ```javascript
     * const myTween = new HandleTween({
     *   data: Object.<string, number>,
     *   duration: Number,
     *   ease: String,
     *   relative: Boolean
     *   stagger:{
     *      each: Number,
     *      from: Number|String|{x:number,y:number},
     *      grid: {
     *          col: Number,
     *          row: Number,
     *          direction: String
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
     * myTween.set()
     * myTween.goTo()
     * myTween.goFrom()
     * myTween.goFromTo()
     * myTween.subscribe()
     * myTween.subscribeCache()
     * myTween.onComplete()
     * myTween.updateEase()
     * myTween.getId()
     * myTween.get()
     * myTween.getTo()
     * myTween.getFrom()
     * myTween.getToNativeType()
     * myTween.getFromNativeType()
     *
     * ```
     */
    constructor(data) {
        /**
         *  This value lives from user call ( goTo etc..) until next call
         **/

        /**
         * @private
         * @type {Function}
         */
        this.ease = easeTweenIsValidGetFunction(data?.ease);

        /**
         * @private
         * @type {number}
         */
        this.duration = durationIsNumberOrFunctionIsValid(data?.duration);

        /**
         * @private
         * @type {boolean}
         */
        this.relative = relativeIsValid(data?.relative, 'tween');

        /**
         * @private
         * @type {import('../utils/stagger/type.js').staggerObject}
         */
        this.stagger = getStaggerFromProps(data);

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
         * @type{(value:any) => void|null}
         */
        this.currentResolve = undefined;

        /**
         * @private
         * @type{(value:any) => void|null}
         */
        this.currentReject = undefined;

        /**
         * @private
         * @type{Promise<void>|undefined}
         */
        this.promise = undefined;

        /**
         * @private
         * @type {import('./type.js').tweenStoreData[]}
         */
        this.values = [];

        /**
         * @private
         * @type {import('./type.js').tweenInitialData[]}
         */
        this.initialData = [];

        /**
         * @private
         * @type {import('../utils/callbacks/type.js').callbackObject<(arg0:Record<string, number>) => void>[]}
         */
        this.callback = [];

        /**
         * @private
         * @type {import('../utils/callbacks/type.js').callbackObject<string>[]}
         */
        this.callbackCache = [];

        /**
         * @private
         * @type {import('../utils/callbacks/type.js').callbackObject<(arg0:Record<string, number>) => void>[]}
         */
        this.callbackOnComplete = [];

        /**
         * @private
         * @type {import('../utils/callbacks/type.js').callbackObject<(arg0:any) => boolean>[]}
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
        this.comeFromResume = false;

        /**
         * @private
         * @type {number}
         */
        this.startTime = 0;

        /**
         * @private
         * @type {boolean}
         */
        this.isRunning = false;

        /**
         * @private
         * @type {number}
         */
        this.timeElapsed = 0;

        /**
         * @private
         * @type {number}
         */
        this.pauseTime = 0;

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
        This value is the base value merged with new value in custom prop
        passed form user in goTo etc..
         **/

        /**
         * @private
         * @type{import('./type.js').tweenDefault}
         */
        this.defaultProps = {
            duration: this.duration,
            ease: easeTweenIsValid(data?.ease),
            relative: this.relative,
            reverse: false,
            immediate: false,
            immediateNoPromise: false,
        };

        /**
        Stagger value
         **/

        /**
         * @private
         * @type {import('../utils/stagger/type.js').staggerDefaultIndex}
         */
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

        /**
         * @private
         */
        const props = data?.data || null;
        if (props) this.setData(props);
    }

    /**
     * @param {number} time
     * @param {Function} res
     *
     * @returns {void}
     */
    draw(time, res = () => {}) {
        this.isActive = true;

        if (this.pauseStatus) {
            this.pauseTime = time - this.startTime - this.timeElapsed;
        }
        this.timeElapsed = time - this.startTime - this.pauseTime;

        if (this.isRunning && Math.round(this.timeElapsed) >= this.duration) {
            this.timeElapsed = this.duration;
        }

        this.values = tweenGetValueOnDraw({
            values: this.values,
            timeElapsed: this.timeElapsed,
            duration: this.duration,
            ease: this.ease,
        });

        const isSettled = Math.round(this.timeElapsed) === this.duration;

        // Prepare an obj to pass to the callback
        const callBackObject = getValueObj(this.values, 'currentValue');

        defaultCallback({
            stagger: this.stagger,
            callback: this.callback,
            callbackCache: this.callbackCache,
            callBackObject: callBackObject,
            useStagger: this.useStagger,
        });

        this.isRunning = true;

        if (isSettled) {
            const onComplete = () => {
                this.isActive = false;
                this.isRunning = false;
                this.pauseTime = 0;

                /**
                 * End of animation
                 * Set fromValue with ended value
                 * At the next call fromValue become the start value
                 */
                this.values = [...this.values].map((item) => {
                    if (!item.shouldUpdate) return item;

                    return {
                        ...item,
                        toValue: item.currentValue,
                        fromValue: item.currentValue,
                    };
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

            defaultCallbackOnComplete({
                onComplete,
                callback: this.callback,
                callbackCache: this.callbackCache,
                callbackOnComplete: this.callbackOnComplete,
                callBackObject: callBackObject,
                stagger: this.stagger,
                slowlestStagger: this.slowlestStagger,
                fastestStagger: this.fastestStagger,
                useStagger: this.useStagger,
            });

            return;
        }

        mobCore.useFrame(() => {
            mobCore.useNextTick(({ time }) => {
                if (this.isActive) this.draw(time, res);
            });
        });
    }

    /**
     * @private
     * @param {number} time current global time
     * @param {boolean} _fps current FPS
     * @param {Function} res current promise resolve
     *
     * @returns {void}
     **/
    onReuqestAnim(time, _fps, res) {
        this.startTime = time;
        this.draw(time, res);
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

            fpsLoadedLog('tween', averageFPS);
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
     * @param {(value:any) => void} res
     * @param {(value:any) => void} reject
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
     * @type {import('./type.js').tweenStop}
     */
    stop({ clearCache = true } = {}) {
        this.pauseTime = 0;
        this.pauseStatus = false;
        this.comeFromResume = false;
        this.values = setFromToByCurrent(this.values);

        /**
         * If isRunning clear all funture stagger.
         * If tween is ended and the lst stagger is running, let it reach end position.
         */
        if (this.isActive && clearCache)
            this.callbackCache.forEach(({ cb }) => mobCore.useCache.clean(cb));

        // Abort promise
        if (this.currentReject) {
            this.currentReject(mobCore.ANIMATION_STOP_REJECT);
            this.promise = undefined;
            this.currentReject = undefined;
            this.currentResolve = undefined;
        }

        this.isActive = false;
    }

    /**
     * @type {import('./type.js').tweenPause}
     */
    pause() {
        if (this.pauseStatus) return;
        this.pauseStatus = true;
    }

    /**
     * @type {import('./type.js').tweenResume}
     */
    resume() {
        if (!this.pauseStatus) return;
        this.pauseStatus = false;
        this.comeFromResume = true;
    }

    /**
     * @type {import('./type.js').tweenSetData}
     */
    setData(obj) {
        this.values = Object.entries(obj).map((item) => {
            const [prop, value] = item;
            return {
                prop: prop,
                toValue: value,
                toValueOnPause: value,
                toValProcessed: value,
                fromValue: value,
                currentValue: value,
                shouldUpdate: false,
                fromFn: () => 0,
                fromIsFn: false,
                toFn: () => 0,
                toIsFn: false,
                settled: false, // not used, only for uniformity with lerp and spring
            };
        });

        this.initialData = this.values.map((item) => {
            return {
                prop: item.prop,
                toValue: item.toValue,
                fromValue: item.fromValue,
                currentValue: item.currentValue,
                shouldUpdate: false,
                fromFn: () => 0,
                fromIsFn: false,
                toFn: () => 0,
                toIsFn: false,
                settled: false, // not used, only for uniformity with lerp and spring
            };
        });
    }

    /**
     * @type {import('./type.js').tweenResetData}
     */
    resetData() {
        this.values = mergeDeep(this.values, this.initialData);
    }

    /**
     * @private
     *
     * @description
     * Reject promise and update form value with current
     *
     * @returns {void}
     */
    updateDataWhileRunning() {
        this.isActive = false;

        // Reject promise
        if (this.currentReject) {
            this.currentReject(mobCore.ANIMATION_STOP_REJECT);
            this.promise = undefined;
        }

        this.values = [...this.values].map((item) => {
            if (!item.shouldUpdate) return item;

            return {
                ...item,
                fromValue: item.currentValue,
            };
        });
    }

    /**
     * @private
     *
     * @type  {import('./type.js').tweenMergeProps}
     *
     * @description
     * Merge special props with default props
     *
     */
    mergeProps(props) {
        const newProps = { ...this.defaultProps, ...props };
        const { ease, duration, relative } = newProps;
        this.ease = easeTweenIsValidGetFunction(ease);
        this.relative = relativeIsValid(relative, 'tween');
        this.duration = durationIsNumberOrFunctionIsValid(duration);
        return newProps;
    }

    /**
     * @type {import('./type.js').tweenGoTo} obj to Values
     */
    goTo(obj, props = {}) {
        if (this.pauseStatus || this.comeFromResume) this.stop();
        this.useStagger = true;
        const data = goToUtils(obj);
        return this.doAction(data, props, obj);
    }

    /**
     * @type {import('./type.js').tweenGoFrom}
     */
    goFrom(obj, props = {}) {
        if (this.pauseStatus || this.comeFromResume) this.stop();
        this.useStagger = true;
        const data = goFromUtils(obj);
        return this.doAction(data, props, obj);
    }

    /**
     * @type {import('./type.js').tweenGoFromTo}
     */
    goFromTo(fromObj, toObj, props = {}) {
        if (this.pauseStatus || this.comeFromResume) this.stop();
        this.useStagger = true;

        if (!compareKeys(fromObj, toObj)) {
            compareKeysWarning('tween goFromTo:', fromObj, toObj);
            return this.promise;
        }

        const data = goFromToUtils(fromObj, toObj);
        return this.doAction(data, props, fromObj);
    }

    /**
     * @type {import('./type.js').tweenSet}
     */
    set(obj, props = {}) {
        if (this.pauseStatus || this.comeFromResume) this.stop();
        this.useStagger = false;
        const data = setUtils(obj);

        // In set mode duration is small as possible
        props.duration = 1;
        return this.doAction(data, props, obj);
    }

    /**
     * @private
     * @type {import('./type.js').tweenDoAction} data Updated data
     */
    doAction(data, props, obj) {
        this.values = mergeArrayTween(data, this.values);
        if (this.isActive) this.updateDataWhileRunning();

        const { reverse, immediate, immediateNoPromise } =
            this.mergeProps(props);

        if (valueIsBooleanAndTrue(reverse, 'reverse'))
            this.value = setReverseValues(obj, this.values);

        this.values = setRelativeTween(this.values, this.relative);

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
     * @type {import('./type.js').tweenGetValue}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = myTween.get();
     * ```
     */
    get() {
        return getValueObj(this.values, 'currentValue');
    }

    /**
     * @description
     * Get initial values, If the single value is a function it returns the result of the function.
     *
     * @type {import('./type.js').tweenGetValue}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = myTween.getIntialData();
     * ```
     */
    getInitialData() {
        return getValueObj(this.initialData, 'currentValue');
    }

    /**
     * @description
     * Get from values, If the single value is a function it returns the result of the function.
     *
     * @type {import('./type.js').tweenGetValue}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = myTween.getFrom();
     * ```
     */
    getFrom() {
        return getValueObj(this.values, 'fromValue');
    }

    /**
     * @description
     * Get to values, If the single value is a function it returns the result of the function.
     *
     * @type {import('./type.js').tweenGetValue}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = myTween.getTo();
     * ```
     */
    getTo() {
        return getValueObj(this.values, 'toValue');
    }

    /**
     * @description
     * Get From values, if the single value is a function it returns the same function.
     *
     * @type {import('./type.js').tweenGetValueNative}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = myTween.getFromNativeType();
     * ```
     */
    getFromNativeType() {
        return getValueObjFromNative(this.values);
    }

    /**
     * @description
     * Get To values, if the single value is a function it returns the same function.
     *
     * @type {import('./type.js').tweenGetValueNative}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = myTween.getToNativeType();
     * ```
     */
    getToNativeType() {
        return getValueObjToNative(this.values);
    }

    /**
     * @description
     * Get tween type
     *
     * @type {import('./type.js').tweenGetType} tween type
     *
     * @example
     * ```javascript
     *
     *
     * const type = myTween.getType();
     * ```
     */
    getType() {
        return 'TWEEN';
    }

    /**
     * @description
     * Get univoque Id
     *
     * @type {import('./type.js').tweenGetId}
     *
     * @example
     * ```javascript
     *
     *
     * const type = myTween.getId();
     * ```
     */
    getId() {
        return this.uniqueId;
    }

    /**
     * Update ease with new preset
     *
     * @type {import('./type.js').tweenUpdateEase}
     *
     */
    updateEase(ease) {
        this.ease = easeTweenIsValidGetFunction(ease);
        this.defaultProps = mergeDeep(this.defaultProps, {
            ease,
        });
    }

    /**
     * @type {import('./type.js').tweenSubscribe}
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
        this.callbackStartInPause =
            /** @type{import('../utils/callbacks/type.js').callbackObject<(arg0:any) => boolean>[]} */ (
                arrayOfCallbackUpdated
            );

        return () => (this.callbackStartInPause = []);
    }

    /**
     * @type {import('./type.js').tweenOnComplete}
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
     * @type {import('./type.js').tweenSubscribeCache}
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
     *
     * @returns {void}
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
