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
    relativeIsValid,
    springConfigIsValid,
    springConfigIsValidAndGetNew,
    springConfigPropIsValid,
    valueIsBooleanAndTrue,
} from '../utils/tweenAction/tweenValidation.js';
import { handleSetUp } from '../../setup.js';
import { mobCore } from '../../../mobCore/index.js';
import { shouldInizializzeStagger } from '../utils/stagger/shouldInizialize.js';
import { resume } from '../utils/resumeTween.js';
import {
    getValueObj,
    getValueObjFromNative,
    getValueObjToNative,
} from '../utils/tweenAction/getValues.js';
import { mergeArray } from '../utils/tweenAction/mergeArray.js';
import { springGetValuesOndraw } from './getValuesOndraw.js';

export default class HandleSpring {
    /**
     * @param {import('./type.js').springTweenProps} [ data = {} ]
     *
     * @example
     * ```javascript
     * const mySpring = new HandleSpring({
     *   data: Object.<string, number>,
     *   config: String,
     *   configProp: {
     *      tension: Number,
     *      mass: Number,
     *      friction: Number,
     *      velocity: Number,
     *      precision: Number,
     *   },
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
     * mySpring.set()
     * mySpring.goTo()
     * mySpring.goFrom()
     * mySpring.goFromTo()
     * mySpring.subscribe()
     * mySpring.subscribeCache()
     * mySpring.onComplete()
     * mySpring.updateConfigProp()
     * mySpring.updateConfig()
     * mySpring.getId()
     * mySpring.get()
     * mySpring.getTo()
     * mySpring.getFrom()
     * mySpring.getToNativeType()
     * mySpring.getFromNativeType()
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
        this.relative = relativeIsValid(data?.relative, 'spring');

        /**
         * @private
         * @type {import('./type.js').springProps}
         *
         * This value lives from user call ( goTo etc..) until next call
         **/
        this.configProps = springConfigIsValidAndGetNew(data?.config);

        /**
         * Update config with single props
         */
        this.updateConfigProp(data?.configProp);

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
         * @type {import('./type.js').springValues[]|[]}
         */
        this.values = [];

        /**
         * @private
         * @type {import('./type.js').springInitialData[]}
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
         * This value is the base value merged with new value in custom prop
         * passed form user in goTo etc..
         *
         * @type {import('./type.js').springDefault}
         **/
        this.defaultProps = {
            reverse: false,
            configProps: this.configProps,
            relative: this.relative,
            immediate: false,
            immediateNoPromise: false,
        };

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
         * @private
         * Set initial store data if defined in constructor props
         * If not use setData methods
         */
        const props = data?.data || null;
        if (props) this.setData(props);
    }

    /**
     * @param {number} _time
     * @param {number} fps
     * @param {Function} res
     * @param {number} tension
     * @param {number} friction
     * @param {number} mass
     * @param {number} precision
     *
     * @returns {void}
     */
    draw(_time, fps, res = () => {}, tension, friction, mass, precision) {
        this.isActive = true;

        this.values = springGetValuesOndraw({
            values: this.values,
            tension,
            friction,
            mass,
            precision,
            fps,
        });

        /**
         * Prepare an obj to pass to the callback
         */
        const callBackObject = getValueObj(this.values, 'currentValue');

        defaultCallback({
            stagger: this.stagger,
            callback: this.callback,
            callbackCache: this.callbackCache,
            callBackObject: callBackObject,
            useStagger: this.useStagger,
        });

        /**
         * Check if all values is completed
         */
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
                    return {
                        ...item,
                        fromValue: item.toValue,
                    };
                });

                /**
                 * On complete
                 */
                if (!this.pauseStatus) {
                    res();

                    /**
                     * Set promise reference to null once resolved
                     */
                    this.promise = undefined;
                    this.currentReject = undefined;
                    this.currentResolve = undefined;
                }
            };

            /**
             * Prepare an obj to pass to the callback with rounded value ( end user value)
             */
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
                if (this.isActive)
                    this.draw(
                        time,
                        fps,
                        res,
                        tension,
                        friction,
                        mass,
                        precision
                    );
            });
        });
    }

    /**
     * @private
     *
     * @param {number} time current global time
     * @param {number} fps current FPS
     * @param {Function} res current promise resolve
     **/
    onReuqestAnim(time, fps, res) {
        this.values = [...this.values].map((item) => {
            return {
                ...item,
                velocity: Math.trunc(this.configProps.velocity),
            };
        });

        /**
         * Normalize spring config props
         */
        const tension = this.configProps.tension;
        const friction = this.configProps.friction;
        const mass = Math.max(1, this.configProps.mass);
        const precision = this.configProps.precision;

        this.draw(time, fps, res, tension, friction, mass, precision);
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

            fpsLoadedLog('spring', averageFPS);
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
     * @type {import('./type.js').springStop}
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
        if (this.isActive) {
            this.isActive = false;
        }
    }

    /**
     * @type {import('./type.js').springPause}
     */
    pause() {
        if (this.pauseStatus) return;
        this.pauseStatus = true;
        if (this.isActive) this.isActive = false;
        this.values = setFromByCurrent(this.values);
    }

    /**
     * @type {import('./type.js').springResume}
     */
    resume() {
        if (!this.pauseStatus) return;
        this.pauseStatus = false;

        if (!this.isActive && this.currentResolve) {
            resume(this.onReuqestAnim.bind(this), this.currentResolve);
        }
    }

    /**
     * @param {Record<string, number>} obj Initial data structure
     * @returns {void}
     *
     * @description
     * Set initial data structure, the method is call by data prop in constructor. In case of need it can be called after creating the instance
     *
     *
     * @example
     * ```javascript
     *
     *
     * mySpring.setData({ val: 100 });
     * ```
     */
    setData(obj) {
        this.values = Object.entries(obj).map((item) => {
            const [prop, value] = item;
            return {
                prop: prop,
                toValue: value,
                fromValue: value,
                velocity: this.configProps.velocity,
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
     * @type {import('./type.js').springResetData}
     */
    resetData() {
        this.values = mergeDeep(this.values, this.initialData);
    }

    /**
     * @private
     * @type  {import('./type.js').springMergeProps}
     *
     * @description
     * Merge special props with default props
     */
    mergeProps(props) {
        const springParams = handleSetUp.get('spring');

        /**
         * @description
         * Get new config preset single values.
         *
         * @type {import('./type.js').springPresentConfigType}
         */
        const allPresetConfig = springParams.config;
        const newConfigPreset = springConfigIsValid(props?.config)
            ? // @ts-ignore
              allPresetConfig[props.config]
            : this.defaultProps.configProps;

        /*
         * Modify single propierties of newConfigPreset
         */
        const configPropsToMerge = springConfigPropIsValid(props?.configProp);
        const newConfigProps = { ...newConfigPreset, ...configPropsToMerge };

        /*
         * Merge all
         */
        const newProps = {
            ...this.defaultProps,
            ...props,
            configProps: newConfigProps,
        };

        const { configProps, relative } = newProps;
        this.configProps = configProps;
        this.relative = relative;

        return newProps;
    }

    /**
     * @type {import('./type.js').springGoTo}
     */
    goTo(obj, props = {}) {
        if (this.pauseStatus) return;
        this.useStagger = true;
        const data = goToUtils(obj);
        return this.doAction(data, props, obj);
    }

    /**
     * @type {import('./type.js').springGoFrom}
     */
    goFrom(obj, props = {}) {
        if (this.pauseStatus) return;
        this.useStagger = true;
        const data = goFromUtils(obj);
        return this.doAction(data, props, obj);
    }

    /**
     * @type {import('./type.js').springGoFromTo}
     */
    goFromTo(fromObj, toObj, props = {}) {
        if (this.pauseStatus) return;
        this.useStagger = true;
        if (!compareKeys(fromObj, toObj)) {
            compareKeysWarning('spring goFromTo:', fromObj, toObj);
            return this.promise;
        }

        const data = goFromToUtils(fromObj, toObj);
        return this.doAction(data, props, fromObj);
    }

    /**
     * @type {import('./type.js').springSet}
     */
    set(obj, props = {}) {
        if (this.pauseStatus) return;
        this.useStagger = false;
        const data = setUtils(obj);
        return this.doAction(data, props, obj);
    }

    /**
     * @private
     * @type {import('./type.js').springDoAction} data Updated data
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
     * @type {import('./type.js').springGetValue}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = mySpring.get();
     * ```
     */
    get() {
        return getValueObj(this.values, 'currentValue');
    }

    /**
     * @description
     * Get initial values, If the single value is a function it returns the result of the function.
     *
     * @type {import('./type.js').springGetValue}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = mySpring.getIntialData();
     * ```
     */
    getInitialData() {
        return getValueObj(this.initialData, 'currentValue');
    }

    /**
     * @description
     * Get from values, If the single value is a function it returns the result of the function.
     *
     * @type {import('./type.js').springGetValue}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = mySpring.getFrom();
     * ```
     */
    getFrom() {
        return getValueObj(this.values, 'fromValue');
    }

    /**
     * @description
     * Get to values, If the single value is a function it returns the result of the function.
     *
     * @type {import('./type.js').springGetValue}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = mySpring.getTo();
     * ```
     */
    getTo() {
        return getValueObj(this.values, 'toValue');
    }

    /**
     * @description
     * Get From values, if the single value is a function it returns the same function.
     *
     * @type {import('./type.js').springGetValueNative}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = mySpring.getFromNativeType();
     * ```
     */
    getFromNativeType() {
        return getValueObjFromNative(this.values);
    }

    /**
     * @description
     * Get To values, if the single value is a function it returns the same function.
     *
     * @type {import('./type.js').springGetValueNative}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = mySpring.getToNativeType();
     * ```
     */
    getToNativeType() {
        return getValueObjToNative(this.values);
    }

    /**
     * @description
     * Get tween type
     *
     * @type {import('./type.js').springGetType} tween type
     *
     * @example
     * ```javascript
     *
     *
     * const type = mySpring.getType();
     * ```
     */
    getType() {
        return 'SPRING';
    }

    /**
     * @description
     * Get univoque Id
     *
     * @type {import('./type.js').springGetId}
     *
     * @example
     * ```javascript
     *
     *
     * const type = mySpring.getId();
     * ```
     */
    getId() {
        return this.uniqueId;
    }

    /**
     * @type {import('./type.js').springUdateConfigProp}
     *
     *  @example
     *  ```javascript
     *  mySpring.updateConfigProp({
     *      mass: 2,
     *      friction: 5
     *  })
     *
     *
     *  ```
     *
     * @description
     * Update config object, every || some properties
     * The change will be persistent
     */
    updateConfigProp(configProp = {}) {
        const configToMerge = springConfigPropIsValid(configProp);
        this.configProps = { ...this.configProps, ...configToMerge };

        this.defaultProps = mergeDeep(this.defaultProps, {
            configProps: configToMerge,
        });
    }

    /**
     *
     * @description
     * updateConfig - Update config object with new preset
     *
     * @type {import('./type.js').springUdateConfig}
     *
     */
    updateConfig(config) {
        this.configProps = springConfigIsValidAndGetNew(config);
        this.defaultProps = mergeDeep(this.defaultProps, {
            configProps: this.configProps,
        });
    }

    /**
     * @type {import('./type.js').springSubscribe}
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
     * @type {import('./type.js').springOnComplete}
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
     * @type {import('./type.js').springSubscribeCache}
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
