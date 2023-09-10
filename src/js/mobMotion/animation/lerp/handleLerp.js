import {
    getValueObj,
    getValueObjToNative,
    getValueObjFromNative,
    mergeArray,
    lerp,
    compareKeys,
    getRoundedValue,
} from '../utils/animationUtils.js';
import {
    setFromByCurrent,
    setFromCurrentByTo,
    setFromToByCurrent,
    setReverseValues,
    setRelative,
} from '../utils/setValues.js';
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
} from '../utils/actions.js';
import { initRaf } from '../utils/initRaf.js';
import { resume } from '../utils/resume.js';
import {
    compareKeysWarning,
    staggerIsOutOfRangeWarning,
} from '../utils/warning.js';
import { fpsLoadedLog } from '../utils/log.js';
import { shouldInizializzeStagger } from '../utils/condition.js';
import {
    lerpPrecisionIsValid,
    lerpVelocityIsValid,
    relativeIsValid,
    valueIsBooleanAndTrue,
} from '../utils/tweenValidation.js';
import { mobCore } from '../../../mobCore/index.js';

/**
 * @typedef {Object} lerpTypes
 * @prop {Object.<string, number>} [ data ] Initial data Object.
 * @prop {Boolean} [ relative=false ] It defines the initial value of the relative properties, the value can be momentarily changed whenever the goTo, goFrom, goFromTo methods are invoked, the default value is false. If set to true each value will be calculated starting from the last used value, by default each value is calculated starting from the value defined in the constructor.
 **/

/**
 * @typedef {Object} lerpPropTypes
 * @prop {Number} [ velocity ] It defines the initial value of the velocity properties, the value can be momentarily changed whenever the goTo, goFrom, goFromTo methods are invoked, `default value is 0.06`,the closer the value is to 1, the faster the transition will be.
 * @prop {Number} [ precision ] It defines the initial value of the precision properties, the value can be momentarily changed whenever the goTo, goFrom, goFromTo methods are invoked, when the calculated value is less than this number, the transition will be considered completed, the smaller the value, the greater the precision of the calculation, the `default value is 0.01`.
 **/

export default class HandleLerp {
    /**
     * @param { lerpTypes & lerpPropTypes & import('../utils/stagger/staggerCostant.js').staggerTypes } [ data  = {}]
     *
     * @example
     * ```javascript
     * const myLerp = new HandleLerp({
     *   data: Object.<string, number>,
     *   precision: [ Number ],
     *   velocity: [ Number ],
     *   relative: [ Boolean ]
     *   stagger:{
     *      each: [ Number ],
     *      from: [ Number|String|{x:number,y:number} ],
     *      grid: {
     *          col: [ Number ],
     *          row: [ Number ],
     *          direction: [ String ],
     *      },
     *      waitComplete: [ Boolean ],
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
    constructor(data = {}) {
        /**
         * @private
         * @type {import('../utils/stagger/staggerCostant.js').staggerTypesObject}
         */
        this.stagger = getStaggerFromProps(data);

        /**
         * This value lives from user call ( goTo etc..) until next call
         **/

        /**
         * @private
         */
        this.relative = relativeIsValid(data?.relative, 'lerp');

        /**
         * @private
         */
        this.velocity = lerpVelocityIsValid(data?.velocity);

        /**
         * @private
         */
        this.precision = lerpPrecisionIsValid(data?.precision);

        /**
         * End
         **/

        /**
         * @private
         */
        this.uniqueId = mobCore.getUnivoqueId();

        /**
         * @private
         */
        this.isActive = false;

        /**
         * @private
         */
        this.currentResolve = null;

        /**
         * @private
         */
        this.currentReject = null;

        /**
         * @private
         */
        this.promise = null;

        /**
         * @private
         */
        this.values = [];

        /**
         * @private
         */
        this.initialData = [];

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
        this.callbackOnComplete = [];

        /**
         * @private
         */
        this.callbackStartInPause = [];

        /**
         * @private
         */
        this.unsubscribeCache = [];

        /**
         * @private
         */
        this.pauseStatus = false;

        /**
         * @private
         */
        this.firstRun = true;

        /**
         * @private
         */
        this.useStagger = true;

        /**
         * @private
         */
        this.fpsInLoading = false;

        /**
         * @private
         *
         * This value is the base value merged with new value in custom prop
         * passed form user in goTo etc..
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
         * Stagger value
         **/
        this.slowlestStagger = STAGGER_DEFAULT_INDEX_OBJ;

        /**
         * @private
         **/
        this.fastestStagger = STAGGER_DEFAULT_INDEX_OBJ;

        /**
         * Set initial store data if defined in constructor props
         * If not use setData methods
         */
        const props = data?.data || null;
        if (props) this.setData(props);
    }

    /**
     * @private
     *
     * @param {Number} time current global time
     * @param {Boolean} fps current FPS
     * @param {function} res current promise resolve
     **/
    onReuqestAnim(time, fps, res) {
        this.values.forEach((item) => {
            item.currentValue = Number.parseFloat(item.fromValue);
        });

        /**
         * @type {Object|null}
         */
        let o = {};

        o.velocity = this.velocity;

        const draw = (_time, fps) => {
            this.isActive = true;

            this.values.forEach((item) => {
                if (item.settled) return;

                item.currentValue = lerp(
                    item.currentValue,
                    item.toValue,
                    (o.velocity / fps) * 60
                );

                item.currentValue = getRoundedValue(item.currentValue);

                item.settled =
                    Number(
                        Math.abs(item.toValue - item.currentValue).toFixed(4)
                    ) <= this.precision;

                if (item.settled) {
                    item.currentValue = item.toValue;
                }
            });

            // Prepare an obj to pass to the callback
            o.callBackObject = getValueObj(this.values, 'currentValue');

            defaultCallback({
                stagger: this.stagger,
                callback: this.callback,
                callbackCache: this.callbackCache,
                callBackObject: o.callBackObject,
                useStagger: this.useStagger,
            });

            // Check if all values is completed
            o.allSettled = this.values.every((item) => item.settled === true);

            if (o.allSettled) {
                const onComplete = () => {
                    this.isActive = false;

                    // End of animation
                    // Set fromValue with ended value
                    // At the next call fromValue become the start value
                    this.values.forEach((item) => {
                        item.fromValue = item.toValue;
                    });

                    // On complete
                    if (!this.pauseStatus) {
                        // Remove reference to o Object
                        o = null;

                        //
                        res();

                        // Set promise reference to null once resolved
                        this.promise = null;
                        this.currentReject = null;
                        this.currentResolve = null;
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
            } else {
                mobCore.useFrame(() => {
                    mobCore.useNextTick(({ time, fps }) => {
                        if (this.isActive) draw(time, fps);
                    });
                });
            }
        };

        draw(time, fps);
    }

    /**
     * @description
     * Inzialize stagger array
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
                arr: cb,
                endArr: this.callbackOnComplete,
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
     * @param { import('../tween/handleTween.js').tweenCommonStopProps } Stop props
     * @description
     *
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
            this.promise = null;
            this.currentReject = null;
            this.currentResolve = null;
        }

        // Reset RAF
        if (this.isActive) this.isActive = false;
    }

    /**
     * @description
     *
     * Pause the tween
     */
    pause() {
        if (this.pauseStatus) return;
        this.pauseStatus = true;
        if (this.isActive) this.isActive = false;
        this.values = setFromByCurrent(this.values);
    }

    /**
     * @description
     *
     * Resume tween in pause
     */
    resume() {
        if (!this.pauseStatus) return;
        this.pauseStatus = false;

        if (!this.isActive && this.currentResolve) {
            resume(this.onReuqestAnim.bind(this), this.currentResolve);
        }
    }

    /**
     * @param {Object.<string, number|function>} obj Initial data structure
     *
     * @description
     * Set initial data structure, the method is call by data prop in constructor. In case of need it can be called after creating the instance
     *
     *
     * @example
     * ```javascript
     *
     *
     * myLerp.setData({ val: 100 });
     * ```
     */
    setData(obj) {
        this.values = Object.entries(obj).map((item) => {
            const [prop, value] = item;
            return {
                prop: prop,
                toValue: value,
                fromValue: value,
                currentValue: value,
                fromFn: () => {},
                fromIsFn: false,
                toFn: () => {},
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

    /*
     * @description
     * Reset data value with initial
     */
    resetData() {
        this.values = mergeDeep(this.values, this.initialData);
    }

    /**
     * @private
     *
     * @description
     * Mege special props with default props
     *
     * @param  {Object} props
     * @return {Object} props merged
     *
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
     * @param {Object.<string, number|function>} obj to Values
     * @param { import('../tween/handleTween.js').tweenCommonSpecialProps & lerpPropTypes} props special props
     * @returns {Promise|void} Return a promise which is resolved when tween is over
     *
     * @example
     * ```javascript
     *
     *
     * myLerp.goTo(
     *     { string: ( Number|Function ) },
     *     {
     *         reverse: [ Boolean ],
     *         precision: [ Number ],
     *         velocity: [ Number ],
     *         relative: [ Boolean ],
     *         immediate [ Boolean ],
     *         immediateNoPromise: [ Boolean ]
     *     }
     * ).then(() => { ... }).catch(() => { ... });
     *
     *
     * ```
     * @description
       Transform some properties of your choice from the `current value` to the `entered value`.
       The target value can be a number or a function that returns a number, when using a function the target value will become dynamic and will change every time this transformation is called.
       It is possible to associate the special pros to the current transformation, these properties will be valid only in the current transformation.
        - precision
        - velocity
        - relative
        - reverse
        - immediate (internal use)
        - immediateNoPromise (internal use)
     *
     */
    goTo(obj, props = {}) {
        if (this.pauseStatus) return;
        this.useStagger = true;
        const data = goToUtils(obj);
        return this.doAction(data, props, obj);
    }

    /**
     * @param {Object.<string, number|function>} obj from Values
     * @param { import('../tween/handleTween.js').tweenCommonSpecialProps & lerpPropTypes } props special props
     * @returns {Promise|void} Return a promise which is resolved when tween is over
     *
     * @example
     * ```javascript
     *
     *
     * myLerp.goFrom(
     *     { string: ( Number|Function ) },
     *     {
     *         reverse: [ Boolean ],
     *         precision: [ Number ],
     *         velocity: [ Number ],
     *         relative: [ Boolean ],
     *         immediate [ Boolean ],
     *         immediateNoPromise: [ Boolean ]
     *     }
     * ).then(() => { ... }).catch(() => { ... });
     *
     *
     * ```
     * @description
       Transform some properties of your choice from the `entered value` to the `current value`.
       The target value can be a number or a function that returns a number, when using a function the target value will become dynamic and will change every time this transformation is called.
       It is possible to associate the special pros to the current transformation, these properties will be valid only in the current transformation.
        - precision
        - velocity
        - relative
        - reverse
        - immediate (internal use)
        - immediateNoPromise (internal use)
     */
    goFrom(obj, props = {}) {
        if (this.pauseStatus) return;
        this.useStagger = true;
        const data = goFromUtils(obj);
        return this.doAction(data, props, obj);
    }

    /**
     * @param {Object.<string, number|function>} fromObj from Values
     * @param {Object.<string, number|function>} toObj to Values
     * @param { import('../tween/handleTween.js').tweenCommonSpecialProps & lerpPropTypes } props special props
     * @returns {Promise|null|void} Return a promise which is resolved when tween is over
     *
     * @example
     * ```javascript
     *
     *
     * myLerp.goFromTo(
     *     { string: ( Number|Function ) },
     *     { string: ( Number|Function ) },
     *     {
     *         reverse: [ Boolean ],
     *         precision: [ Number ],
     *         velocity: [ Number ],
     *         relative: [ Boolean ],
     *         immediate [ Boolean ],
     *         immediateNoPromise: [ Boolean ]
     *     }
     * ).then(() => { ... }).catch(() => { ... });
     *
     *
     * ```
       Transform some properties of your choice from the `first entered value` to the `second entered value`.
       The target value can be a number or a function that returns a number, when using a function the target value will become dynamic and will change every time this transformation is called.
       It is possible to associate the special pros to the current transformation, these properties will be valid only in the current transformation.
        - precision
        - velocity
        - relative
        - reverse
        - immediate (internal use)
        - immediateNoPromise (internal use)
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
     * @param {Object.<string, number|function>} obj to Values
     * @param { import('../tween/handleTween.js').tweenCommonSpecialProps } props special props
     * @returns {Promise|void} Return a promise which is resolved when tween is over
     *
     * @example
     * ```javascript
     *
     *
     * myLerp.set(
     *     { string: ( Number|Function ) },
     *     {
     *         immediate [ Boolean ],
     *         immediateNoPromise: [ Boolean ]
     *     }
     * ).then(() => { ... }).catch(() => { ... });
     *
     *
     * ```
       Transform some properties of your choice from the `current value` to the `entered value` immediately.
       The target value can be a number or a function that returns a number, when using a function the target value will become dynamic and will change every time this transformation is called.
       It is possible to associate the special pros to the current transformation, these properties will be valid only in the current transformation.
        - immediate (internal use)
        - immediateNoPromise (internal use)
     */
    set(obj, props = {}) {
        if (this.pauseStatus) return;
        this.useStagger = false;
        const data = setUtils(obj);
        return this.doAction(data, props, obj);
    }

    /**
     * @private
     *
     * @param {Object.<string, number|function>} data Updated data
     * @param { import('../tween/handleTween.js').tweenCommonSpecialProps & lerpPropTypes} props special props
     * @param {Object.<string, number|function>} obj new data obj come from set/goTo/goFrom/goFromTo
     * @returns {Promise|void} Return a promise which is resolved when tween is over
     *
     * @description
     * Common oparation for set/goTo/goFrom/goFromTo methods.
     * It is the method that updates the internal store
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
     * @return {Object} current value obj.
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
     * @return {Object} initial value obj.
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
     * @return {Object} from value obj.
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
     * @return {Object} to value obj.
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
     * @return {Object} from value obj.
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
     * @return {Object} to value obj.
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
     * @param  {Number} velocity - New velocity value
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
     * @param  {Number} precision - New velocity value
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
     * @param {import('../utils/callbacks/setCallback.js').subscribeCallbackType} cb - callback function.
     * @return {Function} unsubscribe callback.
     *
     * @example
     * ```javascript
     * //Single DOM element
     * const unsubscribe = myLerp.subscribe(({ x,y... }) => {
     *      domEl.style.prop = `...`
     * })
     * unsubscribe()
     *
     *
     * //Multiple DOM element ( stagger )
     * const unsubscribeStagger = [...elements].map((item) => {
     *   return myLerp.subscribe(({ x, y... }) => {
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
     * Support callback to asyncTimeline.
     * Callback to manage the departure of tweens in a timeline. If a delay is applied to the tween and before the delay ends the timeline pauses the tween at the end of the delay will automatically pause.
     * Add callback to start in pause to stack
     *
     * @param  {function} cb cal function
     * @return {function} unsubscribe callback
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
     * @param {import('../utils/callbacks/setCallback.js').subscribeCallbackType} cb - callback function.
     * @return {Function} unsubscribe callback.
     *
     * @example
     * ```javascript
     * //Single DOM element
     * const unsubscribe = myLerp.onComplete(({ x,y... }) => {
     *      domEl.style.prop = `...`
     * })
     * unsubscribe()
     *
     *
     * //Multiple DOM element ( stagger )
     * const unsubscribeStagger = [...elements].map((item) => {
     *   return myLerp.onComplete(({ x, y... }) => {
     *       item.style.prop = ...
     *   });
     * });
     * unsubscribeStagger.forEach((item) => item());
     *
     *
     * ```
     * @description
       Similar to subscribe this callBack is launched when the data calculation stops (when the timeline ends or the scroll trigger is inactive).
       Useful for applying a different style to an inactive element.
       A typical example is to remove the teansform3D property:

     * @example
     * ```javascript
     * // Use transform3D while item is active
     * myLerp.subscribe(({x}) => {
     *      domEl.style.transform = ` transform3D(0,0,0) translateX(${x}px)`
     * })
     *
     * // Remove transform3D when item is inactive
     * myLerp.onComplete(({x}) => {
     *      domEl.style.transform = `translateX(${x}px)`
     * })
     * ```
     */
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
     * @param {('Object'|'HTMLElement')} item
     * @param {import('../utils/callbacks/setCallback.js').subscribeCallbackType} fn - callback function.
     * @return {Function} unsubscribe callback
     *
     * @example
     *```javascript
     * //Multiple DOM element ( stagger )
     * const unsubscribeStagger = [...elements].map((item) => {
     *   return myLerp.subscribeCache(item, ({ x, y... }) => {
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
     * Destroy tween
     */
    destroy() {
        if (this.promise) this.stop();
        this.callbackOnComplete = [];
        this.callbackStartInPause = [];
        this.callback = [];
        this.callbackCache = [];
        this.values = [];
        this.promise = null;
        this.unsubscribeCache.forEach((unsubscribe) => unsubscribe());
        this.unsubscribeCache = [];
    }
}
