import { compareKeys } from '../utils/animation-utils.js';
import {
    setFromByCurrent,
    setFromCurrentByTo,
    setFromToByCurrent,
    setReverseValues,
    setRelative,
} from '../utils/tween-action/set-values.js';
import { mergeDeep } from '../../utils/merge-deep.js';
import { setStagger } from '../utils/stagger/set-stagger.js';
import { STAGGER_DEFAULT_INDEX_OBJ } from '../utils/stagger/stagger-costant.js';
import {
    getStaggerFromProps,
    getStaggerArray,
} from '../utils/stagger/stagger-utils.js';
import {
    defaultCallbackOnComplete,
    defaultCallback,
} from '../utils/callbacks/default-callback.js';
import {
    updateSubScribers,
    updateSubscribersCache,
} from '../utils/callbacks/set-callback.js';
import {
    parseGoToObject,
    parseGoFromObject,
    parseGoFromToObject,
    parseSetObject,
} from '../utils/tween-action/actions.js';
import { initRaf } from '../utils/init-raf.js';
import {
    compareKeysWarning,
    staggerIsOutOfRangeWarning,
} from '../utils/warning.js';
import { fpsLoadedLog } from '../utils/fps-log-inizialization.js';
import {
    relativeIsValid,
    springConfigIsValid,
    springConfigIsValidAndGetNew,
    springConfigPropIsValid,
    valueIsBooleanAndTrue,
} from '../utils/tween-action/tween-validation.js';
import { handleSetUp } from '../../setup.js';
import { MobCore } from '../../../mob-core/index.js';
import { shouldInizializzeStagger } from '../utils/stagger/should-inizialize.js';
import { resume } from '../utils/resume-tween.js';
import {
    getValueObj,
    getValueObjFromNative,
    getValueObjToNative,
} from '../utils/tween-action/get-values.js';
import { mergeArray } from '../utils/tween-action/merge-array.js';
import { springGetValuesOndraw } from './get-values-on-draw.js';
import { springPresetConfig } from './spring-config.js';

export default class MobSpring {
    /**
     * @type {import('../utils/stagger/type.js').StaggerObject}
     */
    #stagger;

    /**
     * @type {boolean}
     */
    #relative;

    /**
     * @type {import('./type.js').SpringProps}
     *
     *   This value lives from user call ( goTo etc..) until next call
     */
    #configProps;

    /**
     * @type {string}
     */
    #uniqueId;

    /**
     * @type {boolean}
     */
    #isRunning;

    /**
     * @type{((value:any) => void)|undefined }
     */
    #currentResolve;

    /**
     * @type{((value:any) => void)|undefined }
     */
    #currentReject;

    /**
     * @type {Promise<void> | undefined}
     */
    #currentPromise;

    /**
     * @type {import('./type.js').SpringValues[] | []}
     */
    #values;

    /**
     * @type {import('./type.js').SpringInitialData[]}
     */
    #initialData;

    /**
     * @type {import('../utils/callbacks/type.js').CallbackDefault}
     */
    #callback;

    /**
     * @type {import('../utils/callbacks/type.js').CallbackCache}
     */
    #callbackCache;

    /**
     * @type {import('../utils/callbacks/type.js').CallbackDefault}
     */
    #callbackOnComplete;

    /**
     * @type {{ cb: () => boolean }[]}
     */
    #callbackStartInPause;

    /**
     * @type {(() => void)[]}
     */
    #unsubscribeCache;

    /**
     * @type {boolean}
     */
    #pauseStatus;

    /**
     * @type {boolean}
     */
    #firstRun;

    /**
     * @type {boolean}
     */
    #useStagger;

    /**
     * @type {boolean}
     */
    #fpsInLoading;

    /**
     * This value is the base value merged with new value in custom prop passed form user in goTo etc..
     *
     * @type {import('./type.js').SpringDefault}
     */
    #defaultProps;

    /**
     * @type {import('../utils/stagger/type.js').StaggerFrameIndexObject}
     */
    #slowlestStagger;

    /**
     * @type {import('../utils/stagger/type.js').StaggerFrameIndexObject}
     */
    #fastestStagger;

    /**
     * Available methods:
     *
     * ```javascript
     * mySpring.set();
     * mySpring.goTo();
     * mySpring.goFrom();
     * mySpring.goFromTo();
     * mySpring.subscribe();
     * mySpring.subscribeCache();
     * mySpring.onComplete();
     * mySpring.updateConfigProp();
     * mySpring.updateConfig();
     * mySpring.getId();
     * mySpring.get();
     * mySpring.getTo();
     * mySpring.getFrom();
     * mySpring.getToNativeType();
     * mySpring.getFromNativeType();
     * ```
     *
     * @example
     *     ```javascript
     *     const mySpring = new HandleSpring({
     *       data: Object.<string, number>,
     *       config: String,
     *       configProps: {
     *          tension: Number,
     *          mass: Number,
     *          friction: Number,
     *          velocity: Number,
     *          precision: Number,
     *       },
     *       relative: Boolean
     *       stagger:{
     *          each: Number,
     *          from: Number|String|{x:number,y:number},
     *          grid: {
     *              col: Number,
     *              row: Number,
     *              direction: String,
     *          },
     *          waitComplete: Boolean,
     *       },
     *     })
     *
     *
     *     ```;
     *
     * @param {import('./type.js').SpringTweenProps} [data]
     */
    constructor(data) {
        this.#stagger = getStaggerFromProps(data ?? {});
        this.#relative = relativeIsValid(data?.relative, 'spring');
        this.#configProps = springConfigIsValidAndGetNew(data?.config);
        this.updateConfigProp(data?.configProps ?? {});
        this.#uniqueId = MobCore.getUnivoqueId();
        this.#isRunning = false;
        this.#currentResolve = undefined;
        this.#currentReject = undefined;
        this.#currentPromise = undefined;
        this.#values = [];
        this.#initialData = [];
        this.#callback = [];
        this.#callbackCache = [];
        this.#callbackOnComplete = [];
        this.#callbackStartInPause = [];
        this.#unsubscribeCache = [];
        this.#pauseStatus = false;
        this.#firstRun = true;
        this.#useStagger = true;
        this.#fpsInLoading = false;
        this.#defaultProps = {
            reverse: false,
            configProps: this.#configProps,
            relative: this.#relative,
            immediate: false,
        };
        this.#slowlestStagger = STAGGER_DEFAULT_INDEX_OBJ;
        this.#fastestStagger = STAGGER_DEFAULT_INDEX_OBJ;

        /**
         * @private Set Initial store data if defined in constructor props If not use setData methods
         */
        const props = data?.data;
        if (props) this.setData(props);
    }

    /**
     * @param {number} _time
     * @param {number} fps
     * @param {number} tension
     * @param {number} friction
     * @param {number} mass
     * @param {number} precision
     * @returns {void}
     */
    #draw(_time, fps, tension, friction, mass, precision) {
        this.#isRunning = true;

        this.#values = springGetValuesOndraw({
            values: this.#values,
            tension,
            friction,
            mass,
            precision,
            fps,
        });

        /**
         * Prepare an obj to pass to the callback
         */
        const callBackObject = getValueObj(this.#values, 'currentValue');

        defaultCallback({
            stagger: this.#stagger,
            callback: this.#callback,
            callbackCache: this.#callbackCache,
            callBackObject: callBackObject,
            useStagger: this.#useStagger,
        });

        /**
         * Check if all values is completed
         */
        const allSettled = this.#values.every((item) => item.settled === true);

        if (allSettled) {
            const onComplete = () => {
                this.#isRunning = false;

                /**
                 * End of animation Set fromValue with ended value At the next call fromValue become the start value
                 */
                this.#values = [...this.#values].map((item) => {
                    return {
                        ...item,
                        fromValue: item.toValue,
                    };
                });

                /**
                 * On complete
                 */
                if (!this.#pauseStatus && this.#currentResolve) {
                    this.#currentResolve(true);

                    /**
                     * Set promise reference to null once resolved
                     */
                    this.#currentPromise = undefined;
                    this.#currentReject = undefined;
                    this.#currentResolve = undefined;
                }
            };

            /**
             * Prepare an obj to pass to the callback with rounded value ( end user value)
             */
            const cbObjectSettled = getValueObj(this.#values, 'toValue');

            defaultCallbackOnComplete({
                onComplete,
                callback: this.#callback,
                callbackCache: this.#callbackCache,
                callbackOnComplete: this.#callbackOnComplete,
                callBackObject: cbObjectSettled,
                stagger: this.#stagger,
                slowlestStagger: this.#slowlestStagger,
                fastestStagger: this.#fastestStagger,
                useStagger: this.#useStagger,
            });

            return;
        }

        MobCore.useFrame(() => {
            MobCore.useNextTick(({ time, fps }) => {
                if (this.#isRunning)
                    this.#draw(time, fps, tension, friction, mass, precision);
            });
        });
    }

    /**
     * @param {number} time Current global time
     * @param {number} fps Current FPS
     */
    #onReuqestAnim(time, fps) {
        this.#values = [...this.#values].map((item) => {
            return {
                ...item,
                velocity: Math.trunc(this.#configProps.velocity),
            };
        });

        /**
         * Normalize spring config props
         */
        const tension = this.#configProps.tension;
        const friction = this.#configProps.friction;
        const mass = Math.max(1, this.#configProps.mass);
        const precision = this.#configProps.precision;

        this.#draw(time, fps, tension, friction, mass, precision);
    }

    /**
     * Inzialize stagger array
     *
     * @returns {Promise<any>}
     */
    async #inzializeStagger() {
        /**
         * First time il there is a stagger load fps then go next step next time no need to calculate stagger and jump
         * directly next step
         */
        if (
            shouldInizializzeStagger(
                this.#stagger.each,
                this.#firstRun,
                this.#callbackCache,
                this.#callback
            )
        ) {
            const { averageFPS } = await MobCore.useFps();

            fpsLoadedLog('spring', averageFPS);
            const cb = getStaggerArray(this.#callbackCache, this.#callback);

            if (this.#stagger.grid.col > cb.length) {
                staggerIsOutOfRangeWarning(cb.length);
                this.#firstRun = false;
                return;
            }

            const {
                staggerArray,
                staggerArrayOnComplete,
                fastestStagger,
                slowlestStagger,
            } = setStagger({
                arrayDefault: cb,
                arrayOnStop: this.#callbackOnComplete,
                stagger: this.#stagger,
                slowlestStagger: this.#slowlestStagger,
                fastestStagger: this.#fastestStagger,
            });

            if (this.#callbackCache.length > this.#callback.length) {
                this.#callbackCache =
                    /** @type {import('../utils/callbacks/type.js').CallbackCache} */ (
                        staggerArray
                    );
            } else {
                this.#callback =
                    /** @type {import('../utils/callbacks/type.js').CallbackDefault} */ (
                        staggerArray
                    );
            }

            this.#callbackOnComplete = staggerArrayOnComplete;
            this.#slowlestStagger = slowlestStagger;
            this.#fastestStagger = fastestStagger;
            this.#firstRun = false;
        }

        return { ready: true };
    }

    /**
     * @param {(value: any) => void} resolve
     * @param {(value: any) => void} reject
     * @returns {Promise<any>}
     */
    async #startRaf(resolve, reject) {
        if (this.#fpsInLoading) return;
        this.#currentResolve = resolve;
        this.#currentReject = reject;

        if (this.#firstRun) {
            this.#fpsInLoading = true;
            await this.#inzializeStagger();
            this.#fpsInLoading = false;
        }

        initRaf(
            this.#callbackStartInPause,
            (time, fps) => this.#onReuqestAnim(time, fps),
            () => this.pause()
        );
    }

    /**
     * @type {import('./type.js').SpringStop}
     */
    stop({ clearCache = true, updateValues = true } = {}) {
        if (this.#pauseStatus) this.#pauseStatus = false;
        if (updateValues) this.#values = setFromToByCurrent(this.#values);

        /**
         * If isRunning clear all funture stagger. If tween is ended and the lst stagger is running, let it reach end
         * position.
         */
        if (this.#isRunning && clearCache)
            this.#callbackCache.forEach(({ cb }) => MobCore.useCache.clean(cb));

        // Reject promise
        if (this.#currentReject) {
            this.#currentReject(MobCore.ANIMATION_STOP_REJECT);
            this.#currentPromise = undefined;
            this.#currentReject = undefined;
            this.#currentResolve = undefined;
        }

        this.#isRunning = false;
    }

    /**
     * @type {import('./type.js').SpringPause}
     */
    pause() {
        if (this.#pauseStatus) return;
        this.#pauseStatus = true;
        this.#isRunning = false;
        this.#values = setFromByCurrent(this.#values);
    }

    /**
     * @type {import('./type.js').SpringResume}
     */
    resume() {
        if (!this.#pauseStatus) return;
        this.#pauseStatus = false;

        if (!this.#isRunning && this.#currentResolve) {
            resume((time, fps) => this.#onReuqestAnim(time, fps));
        }
    }

    /**
     * Set initial data structure, the method is call by data prop in constructor. In case of need it can be called
     * after creating the instance
     *
     * @example
     *     ```javascript
     *
     *
     *     mySpring.setData({ val: 100 });
     *     ```;
     *
     * @type {import('../../utils/type.js').SetData} obj Initial data structure
     */
    setData(obj) {
        this.#values = Object.entries(obj).map((item) => {
            const [prop, value] = item;
            return {
                prop: prop,
                toValue: value,
                fromValue: value,
                velocity: this.#configProps.velocity,
                currentValue: value,
                fromFn: () => 0,
                fromIsFn: false,
                toFn: () => 0,
                toIsFn: false,
                settled: false,
            };
        });

        this.#initialData = this.#values.map((item) => {
            return {
                prop: item.prop,
                toValue: item.toValue,
                fromValue: item.fromValue,
                currentValue: item.currentValue,
            };
        });
    }

    /**
     * @type {import('./type.js').SpringResetData}
     */
    resetData() {
        this.#values = mergeDeep(this.#values, this.#initialData);
    }

    /**
     * Merge special props with default props
     *
     * @type {import('./type.js').SpringMergeProps}
     */
    #mergeProps(props) {
        const springParams = handleSetUp.get('spring');

        /**
         * Step 1 Get news confic props ( mass, friction etc... ) Get props from new config ( wobble etc.. ) or get each
         * default prop.
         *
         * @type {import('./type.js').SpringPresentConfigType}
         */
        const allPresetConfig = springParams.config;
        const configPreset = springConfigIsValid(props?.config)
            ? (allPresetConfig?.[props?.config ?? 'default'] ??
              springPresetConfig.default)
            : this.#defaultProps.configProps;

        /*
         * Step 2
         * Modify previuos confic ( newConfigPreset ) single value ( mass ... )
         * Merge single prop or {}
         */
        const configPropsToMerge = springConfigPropIsValid(props?.configProps);
        const configProps = {
            ...configPreset,
            ...configPropsToMerge,
        };

        /*
         * Current config for spring for current cycle.
         */
        const newProps = {
            reverse: props?.reverse ?? this.#defaultProps.reverse,
            relative: props?.relative ?? this.#defaultProps.relative,
            immediate: props?.immediate ?? this.#defaultProps.immediate,
            configProps,
        };

        const { relative } = newProps;

        /**
         * Current spring config used in current cycle. Current relative value used in current cycle.
         */
        this.#configProps = configProps;
        this.#relative = relative;

        return newProps;
    }

    /**
     * @type {import('../../utils/type.js').GoTo<import('./type.js').SpringActions>} obj To Values
     */
    goTo(toObject, specialProps = {}) {
        if (this.#pauseStatus) return new Promise((resolve) => resolve);

        this.#useStagger = true;
        const toObjectParsed = parseGoToObject(toObject);
        return this.#doAction(toObjectParsed, toObject, specialProps);
    }

    /**
     * @type {import('../../utils/type.js').GoFrom<import('./type.js').SpringActions>} obj To Values
     */
    goFrom(fromObject, spacialProps = {}) {
        if (this.#pauseStatus) return new Promise((resolve) => resolve);

        this.#useStagger = true;
        const fromObjectParsed = parseGoFromObject(fromObject);
        return this.#doAction(fromObjectParsed, fromObject, spacialProps);
    }

    /**
     * @type {import('../../utils/type.js').GoFromTo<import('./type.js').SpringActions>} obj To Values
     */
    goFromTo(fromObject, toObject, specialProps = {}) {
        if (this.#pauseStatus) return new Promise((resolve) => resolve);
        this.#useStagger = true;

        // Check if fromObj has the same keys of toObj
        if (!compareKeys(fromObject, toObject)) {
            compareKeysWarning('spring goFromTo:', fromObject, toObject);
            return new Promise((resolve) => resolve);
        }

        const objectParsed = parseGoFromToObject(fromObject, toObject);
        return this.#doAction(objectParsed, fromObject, specialProps);
    }

    /**
     * @type {import('../../utils/type.js').Set<import('./type.js').SpringActions>} obj To Values
     */
    set(setObject, specialProps = {}) {
        if (this.#pauseStatus) return new Promise((resolve) => resolve);

        this.#useStagger = false;
        const setObjectParsed = parseSetObject(setObject);
        return this.#doAction(setObjectParsed, setObject, specialProps);
    }

    /**
     * @type {import('../../utils/type.js').SetImmediate<import('./type.js').SpringActions>} obj To Values
     */
    setImmediate(setObject, specialProps = {}) {
        // this.#value is updated below
        if (this.#isRunning) this.stop({ updateValues: false });
        if (this.#pauseStatus) return;

        this.#useStagger = false;
        const setObjectParsed = parseSetObject(setObject);
        this.#values = mergeArray(setObjectParsed, this.#values);

        const { reverse } = this.#mergeProps(specialProps ?? {});
        if (valueIsBooleanAndTrue(reverse, 'reverse'))
            this.#values = setReverseValues(setObject, this.#values);

        this.#values = setRelative(this.#values, this.#relative);
        this.#values = setFromCurrentByTo(this.#values);
        return;
    }

    /**
     * @type {import('../../utils/type.js').DoAction<import('./type.js').SpringActions>} obj To Values
     */
    #doAction(newObjectParsed, newObjectRaw, spacialProps = {}) {
        this.#values = mergeArray(newObjectParsed, this.#values);

        const { reverse, immediate } = this.#mergeProps(spacialProps);
        if (valueIsBooleanAndTrue(reverse, 'reverse'))
            this.#values = setReverseValues(newObjectRaw, this.#values);

        this.#values = setRelative(this.#values, this.#relative);

        if (valueIsBooleanAndTrue(immediate, 'immediate ')) {
            if (this.#isRunning) this.stop({ updateValues: false });
            this.#values = setFromCurrentByTo(this.#values);
            return Promise.resolve();
        }

        /**
         * Condition to create promise. Promise is created first time. If is calling when isRunning reject, so only one
         * promise is resolved. this.#currentPromise is necessary to avoid wrong fps calculation ( async stagger
         * function ).
         */
        const shouldInitializeRAF = !this.#isRunning && !this.#currentPromise;

        /**
         * Avery time is called while is running return the previous promise.
         */
        if (shouldInitializeRAF) {
            this.#currentPromise = new Promise((resolve, reject) => {
                this.#startRaf(resolve, reject);
            });
        }

        return shouldInitializeRAF && this.#currentPromise
            ? this.#currentPromise
            : Promise.reject(MobCore.ANIMATION_STOP_REJECT);
    }

    /**
     * Get current values, If the single value is a function it returns the result of the function.
     *
     * @example
     *     ```javascript
     *
     *
     *     const { prop } = mySpring.get();
     *     ```;
     *
     * @type {import('./type.js').SpringGetValue}
     */
    get() {
        return getValueObj(this.#values, 'currentValue');
    }

    /**
     * Get initial values, If the single value is a function it returns the result of the function.
     *
     * @example
     *     ```javascript
     *
     *
     *     const { prop } = mySpring.getIntialData();
     *     ```;
     *
     * @type {import('./type.js').SpringGetValue}
     */
    getInitialData() {
        return getValueObj(this.#initialData, 'currentValue');
    }

    /**
     * Get from values, If the single value is a function it returns the result of the function.
     *
     * @example
     *     ```javascript
     *
     *
     *     const { prop } = mySpring.getFrom();
     *     ```;
     *
     * @type {import('./type.js').SpringGetValue}
     */
    getFrom() {
        return getValueObj(this.#values, 'fromValue');
    }

    /**
     * Get to values, If the single value is a function it returns the result of the function.
     *
     * @example
     *     ```javascript
     *
     *
     *     const { prop } = mySpring.getTo();
     *     ```;
     *
     * @type {import('./type.js').SpringGetValue}
     */
    getTo() {
        return getValueObj(this.#values, 'toValue');
    }

    /**
     * Get From values, if the single value is a function it returns the same function.
     *
     * @example
     *     ```javascript
     *
     *
     *     const { prop } = mySpring.getFromNativeType();
     *     ```;
     *
     * @type {import('./type.js').SpringGetValueNative}
     */
    getFromNativeType() {
        return getValueObjFromNative(this.#values);
    }

    /**
     * Get To values, if the single value is a function it returns the same function.
     *
     * @example
     *     ```javascript
     *
     *
     *     const { prop } = mySpring.getToNativeType();
     *     ```;
     *
     * @type {import('./type.js').SpringGetValueNative}
     */
    getToNativeType() {
        return getValueObjToNative(this.#values);
    }

    /**
     * Get tween type
     *
     * @example
     *     ```javascript
     *
     *
     *     const type = mySpring.getType();
     *     ```;
     *
     * @type {import('./type.js').SpringGetType} tween Type
     */
    getType() {
        return 'SPRING';
    }

    /**
     * Get univoque Id
     *
     * @example
     *     ```javascript
     *
     *
     *     const type = mySpring.getId();
     *     ```;
     *
     * @type {import('./type.js').SpringGetId}
     */
    getId() {
        return this.#uniqueId;
    }

    /**
     * Update config object, every || some properties The change will be persistent
     *
     * @example
     *     ```javascript
     *      mySpring.updateConfigProp({
     *          mass: 2,
     *          friction: 5
     *      })
     *
     *
     *      ```;
     *
     * @type {import('./type.js').SpringUdateConfigProp}
     */
    updateConfigProp(configProps = {}) {
        const configToMerge = springConfigPropIsValid(configProps);
        this.#configProps = { ...this.#configProps, ...configToMerge };

        this.#defaultProps = mergeDeep(this.#defaultProps, {
            configProps: configToMerge,
        });
    }

    /**
     * UpdateConfig - Update config object with new preset
     *
     * @type {import('./type.js').SpringUdateConfig}
     */
    updateConfig(config) {
        this.#configProps = springConfigIsValidAndGetNew(config);
        this.#defaultProps = mergeDeep(this.#defaultProps, {
            configProps: this.#configProps,
        });
    }

    /**
     * Callback that returns updated values ready to be usable, it is advisable to use it for single elements, although
     * it works well on a not too large number of elements (approximately 100-200 elements) for large staggers it is
     * advisable to use the subscribeCache method .
     *
     * @type {import('./type.js').SpringSubscribe}
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
     * Callback that returns updated values ready to be usable, specific to manage large staggers.
     *
     * @type {import('./type.js').SpringSubscribeCache}
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
     * Support callback to asyncTimeline. Callback to manage the departure of tweens in a timeline. If a delay is
     * applied to the tween and before the delay ends the timeline pauses the tween at the end of the delay will
     * automatically pause. Add callback to start in pause to stack
     *
     * @param {() => boolean} cb Cal function
     * @returns {() => void} Unsubscribe callback
     */
    onStartInPause(cb) {
        const arrayOfCallbackUpdated = [...this.#callbackStartInPause, { cb }];
        this.#callbackStartInPause = arrayOfCallbackUpdated;

        return () => (this.#callbackStartInPause = []);
    }

    /**
     * Similar to subscribe this callBack is launched when the data calculation stops (when the timeline ends or the
     * scroll trigger is inactive). Useful for applying a different style to an inactive element. A typical example is
     * to remove the teansform3D property:
     *
     * @type {import('./type.js').SpringOnComplete}
     */
    onComplete(cb) {
        const { arrayOfCallbackUpdated, unsubscribeCb } = updateSubScribers(
            cb,
            this.#callbackOnComplete
        );
        this.#callbackOnComplete = arrayOfCallbackUpdated;

        return () =>
            (this.#callbackOnComplete = unsubscribeCb(
                this.#callbackOnComplete
            ));
    }

    /**
     * Destroy tween
     */
    destroy() {
        if (this.#currentPromise) this.stop();
        this.#callbackOnComplete = [];
        this.#callbackStartInPause = [];
        this.#callback = [];
        this.#callbackCache = [];
        this.#values = [];
        this.#currentPromise = undefined;
        this.#unsubscribeCache.forEach((unsubscribe) => unsubscribe());
        this.#unsubscribeCache = [];
    }
}
