(() => {
  // src/js/mobbu/events/loadutils/handleLoad.js
  var handleLoad = (() => {
    let inizialized = false;
    let callback2 = [];
    let id = 0;
    function handler() {
      if (callback2.length === 0) {
        window.removeEventListener("DOMContentLoaded", handler);
        inizialized = false;
        return;
      }
      callback2.forEach(({ cb }) => {
        cb();
      });
      callback2 = [];
    }
    function init() {
      if (inizialized)
        return;
      inizialized = true;
      window.addEventListener("DOMContentLoaded", () => handler(), {
        passive: false
      });
    }
    const addCb = (cb) => {
      callback2.push({ cb, id });
      const cbId = id;
      id++;
      if (typeof window !== "undefined") {
        init();
      }
      return () => {
        callback2 = callback2.filter((item) => item.id !== cbId);
      };
    };
    return addCb;
  })();

  // src/js/mobbu/animation/spring/springConfig.js
  var springPresetConfig = {
    default: {
      tension: 20,
      mass: 1,
      friction: 5,
      velocity: 0,
      precision: 0.01
    },
    gentle: {
      tension: 120,
      mass: 1,
      friction: 14,
      velocity: 0,
      precision: 0.01
    },
    wobbly: {
      tension: 180,
      mass: 1,
      friction: 12,
      velocity: 0,
      precision: 0.01
    },
    bounce: {
      tension: 200,
      mass: 3,
      friction: 5,
      velocity: 0,
      precision: 0.01
    },
    scroller: {
      tension: 10,
      mass: 1,
      friction: 5,
      velocity: 0,
      precision: 0.5
    }
  };

  // src/js/mobbu/store/storeType.js
  var storeType = {
    isString: (value) => Object.prototype.toString.call(value) === "[object String]",
    isNumber: (value) => Object.prototype.toString.call(value) === "[object Number]" && isFinite(value),
    isObject: (value) => Object.prototype.toString.call(value) === "[object Object]",
    isFunction: (value) => Object.prototype.toString.call(value) === "[object Function]",
    isArray: (value) => Object.prototype.toString.call(value) === "[object Array]",
    isBoolean: (value) => Object.prototype.toString.call(value) === "[object Boolean]",
    isElement: (value) => value instanceof Element || value instanceof Document,
    isNodeList: (value) => Object.prototype.isPrototypeOf.call(NodeList.prototype, value)
  };
  var getTypeName = (type) => {
    switch (type) {
      case String:
        return "String";
      case Number:
        return "Number";
      case Object:
        return "Object";
      case Function:
        return "Function";
      case Array:
        return "Array";
      case Boolean:
        return "Boolean";
      case Element:
        return "Element";
      case NodeList:
        return "NodeList";
      default:
        return "Any";
    }
  };
  var checkType = (type, value) => {
    switch (type) {
      case String:
        return storeType.isString(value);
      case Number:
        return storeType.isNumber(value);
      case Object:
        return storeType.isObject(value);
      case Function:
        return storeType.isFunction(value);
      case Array:
        return storeType.isArray(value);
      case Boolean:
        return storeType.isBoolean(value);
      case Element:
        return storeType.isElement(value);
      case NodeList:
        return storeType.isNodeList(value);
      default:
        return true;
    }
  };

  // src/js/mobbu/animation/utils/setUpValidation.js
  var easeReference = {
    easeLinear: "easeLinear",
    easeInQuad: "easeInQuad",
    easeOutQuad: "easeOutQuad",
    easeInOutQuad: "easeInOutQuad",
    easeInCubic: "easeInCubic",
    easeOutCubic: "easeOutCubic",
    easeInOutCubic: "easeInOutCubic",
    easeInQuart: "easeInQuart",
    easeOutQuart: "easeOutQuart",
    easeInOutQuart: "easeInOutQuart",
    easeInQuint: "easeInQuint",
    easeOutQuint: "easeOutQuint",
    easeInOutQuint: "easeInOutQuint",
    easeInSine: "easeInSine",
    easeOutSine: "easeOutSine",
    easeInOutSine: "easeInOutSine",
    easeInExpo: "easeInExpo",
    easeOutExpo: "easeOutExpo",
    easeInOutExpo: "easeInOutExpo",
    easeInCirc: "easeInCirc",
    easeOutCirc: "easeOutCirc",
    easeInOutCirc: "easeInOutCirc",
    easeInElastic: "easeInElastic",
    easeOutElastic: "easeOutElastic",
    easeInOutElastic: "easeInOutElastic",
    easeInBack: "easeInBack",
    easeOutBack: "easeOutBack",
    easeInOutBack: "easeInOutBack",
    easeInBounce: "easeInBounce",
    easeOutBounce: "easeOutBounce",
    easeInOutBounce: "easeInOutBounce"
  };
  var MQ_MIN = "min";
  var defaultMqValueDefault = "desktop";
  var easeDefault = "easeLinear";
  var springConfigDefault = "default";
  var startFpsDefault = 60;
  var fpsScalePercentDefault = { 0: 1, 30: 2, 50: 3 };
  var useScaleFpsDefault = true;
  var deferredNextTickDefault = false;
  var throttleDefault = 60;
  var usePassiveDefault = true;
  var mqDefault = {
    xSmall: 320,
    small: 360,
    medium: 600,
    tablet: 768,
    desktop: 992,
    large: 1200,
    xLarge: 1400
  };
  var sequencerDurationDefault = 10;
  var lerpConfigDefault = 0.06;
  var markerStartDefault = "#ff0000";
  var markerItemDefault = "#14df3b";
  var parallaxRangeDefault = 8;
  var parallaxTweenDurationDefault = 10;
  var tweenDurationDefault = 1e3;
  var tweenRealtiveDefault = false;
  var springRealtiveDefault = false;
  var lerpRelativeDefault = false;
  var lerpPrecisionDefault = 0.01;
  var lerpVelocityDefault = 0.06;
  var setupValidation = (obj) => {
    const startFps = checkSetUpType({
      prop: "startFps",
      value: obj?.startFps,
      defaultValue: startFpsDefault,
      type: Number
    });
    const fpsScalePercent2 = checkSetUpType({
      prop: "fpsScalePercent",
      value: obj?.fpsScalePercent,
      defaultValue: fpsScalePercentDefault,
      type: Object
    });
    const useScaleFps = checkSetUpType({
      prop: "useScaleFps",
      value: obj?.useScaleFps,
      defaultValue: useScaleFpsDefault,
      type: Boolean
    });
    const deferredNextTick = checkSetUpType({
      prop: "deferredNextTick",
      value: obj?.deferredNextTick,
      defaultValue: deferredNextTickDefault,
      type: Boolean
    });
    const usePassive = checkSetUpType({
      prop: "usePassive",
      value: obj?.usePassive,
      defaultValue: usePassiveDefault,
      type: Boolean
    });
    const throttle2 = checkSetUpType({
      prop: "throttle",
      value: obj?.throttle,
      defaultValue: throttleDefault,
      type: Number
    });
    const mq2 = checkSetUpMq(obj?.mq);
    const defaultMqValue = checkSetUpType({
      prop: "defaultMq.value",
      value: obj?.defaultMq?.value,
      defaultValue: defaultMqValueDefault,
      type: String
    });
    const defaultMqType = checkSetUpType({
      prop: "defaultMq.type",
      value: obj?.defaultMq?.type,
      defaultValue: MQ_MIN,
      type: String
    });
    const sequencerDuration = checkSetUpType({
      prop: "sequencer.duration",
      value: obj?.sequencer?.duration,
      defaultValue: sequencerDurationDefault,
      type: Number
    });
    const sequencerEase = checkSetUpEase(obj?.sequencer?.ease, "sequencer");
    const scrollTriggerSpringConfig = checkSetUpType({
      prop: "scrolTrigger.springConfig",
      value: obj?.scrollTrigger?.springConfig,
      defaultValue: springConfigDefault,
      type: String
    });
    const scrollTriggerLerpConfig = checkSetUpType({
      prop: "scrolTrigger.lerpConfig",
      value: obj?.scrollTrigger?.lerpConfig,
      defaultValue: lerpConfigDefault,
      type: Number
    });
    const scrollTriggerMarkerEnd = checkSetUpType({
      prop: "scrolTrigger.markerColor.startEnd",
      value: obj?.scrollTrigger?.markerColor?.startEnd,
      defaultValue: markerStartDefault,
      type: String
    });
    const scrollTriggerMarkerItem = checkSetUpType({
      prop: "scrolTrigger.markerColor.item",
      value: obj?.scrollTrigger?.markerColor?.item,
      defaultValue: markerItemDefault,
      type: String
    });
    const parallaxRange = checkSetUpType({
      prop: "parallax.defaultRange",
      value: obj?.parallax?.defaultRange,
      defaultValue: parallaxRangeDefault,
      type: Number
    });
    const parallaxSpringConfig = checkSetUpType({
      prop: "parallax.springConfig",
      value: obj?.parallax?.springConfig,
      defaultValue: springConfigDefault,
      type: String
    });
    const parallaxLerpConfig = checkSetUpType({
      prop: "parallax.lerpConfig",
      value: obj?.parallax?.lerpConfig,
      defaultValue: lerpConfigDefault,
      type: Number
    });
    const parallaxTweenDuration = checkSetUpType({
      prop: "parallaxTween.duration",
      value: obj?.parallaxTween?.duration,
      defaultValue: parallaxTweenDurationDefault,
      type: Number
    });
    const parallaxTweenEase = checkSetUpEase(
      obj?.parallaxTween?.ease,
      "parallaxTween"
    );
    const tweenDuration = checkSetUpType({
      prop: "tween.duration",
      value: obj?.tween?.duration,
      defaultValue: tweenDurationDefault,
      type: Number
    });
    const tweenEase = checkSetUpEase(obj?.tween?.ease, "tween");
    const tweenRelative = checkSetUpType({
      prop: "tween.relative",
      value: obj?.tween?.relative,
      defaultValue: tweenRealtiveDefault,
      type: Boolean
    });
    const springRelative = checkSetUpType({
      prop: "spring.relative",
      value: obj?.spring?.relative,
      defaultValue: springRealtiveDefault,
      type: Boolean
    });
    const lerpRelative = checkSetUpType({
      prop: "lerp.relative",
      value: obj?.lerp?.relative,
      defaultValue: lerpRelativeDefault,
      type: Boolean
    });
    const lerpPrecision = checkSetUpType({
      prop: "lerp.precision",
      value: obj?.lerp?.precision,
      defaultValue: lerpPrecisionDefault,
      type: Number
    });
    const lerpVelocity = checkSetUpType({
      prop: "lerp.velocity",
      value: obj?.lerp?.velocity,
      defaultValue: lerpVelocityDefault,
      type: Number
    });
    const result = {
      startFps,
      fpsScalePercent: fpsScalePercent2,
      useScaleFps,
      deferredNextTick,
      throttle: throttle2,
      usePassive,
      mq: mq2,
      defaultMq: {
        value: defaultMqValue,
        type: defaultMqType
      },
      sequencer: {
        duration: sequencerDuration,
        ease: sequencerEase
      },
      scrollTrigger: {
        springConfig: scrollTriggerSpringConfig,
        lerpConfig: scrollTriggerLerpConfig,
        markerColor: {
          startEnd: scrollTriggerMarkerEnd,
          item: scrollTriggerMarkerItem
        }
      },
      parallax: {
        defaultRange: parallaxRange,
        springConfig: parallaxSpringConfig,
        lerpConfig: parallaxLerpConfig
      },
      parallaxTween: {
        duration: parallaxTweenDuration,
        ease: parallaxTweenEase
      },
      tween: {
        duration: tweenDuration,
        ease: tweenEase,
        relative: tweenRelative
      },
      spring: {
        relative: springRelative,
        config: obj?.spring?.config ? { ...springPresetConfig, ...obj.spring.config } : springPresetConfig
      },
      lerp: {
        relative: lerpRelative,
        precision: lerpPrecision,
        velocity: lerpVelocity
      }
    };
    return result;
  };
  var checkSetUpType = ({ prop, value, defaultValue, type }) => {
    const isValid = checkType(type, value);
    if (!isValid)
      console.warn(
        `handleSetUp error: ${prop}: ${value}, is not valid must be a ${getTypeName(
          type
        )}`
      );
    return isValid ? value : defaultValue;
  };
  var checkSetUpMq = (obj) => {
    const isValid = checkType(Object, obj) && Object.values(obj).every((value) => {
      return checkType(Number, value);
    });
    if (!isValid)
      console.warn(
        `handleSetUp error: mq must be an object as { ..., String: Number }`
      );
    return isValid ? obj : mqDefault;
  };
  var checkSetUpEase = (value, label) => {
    const isValid = Object.keys(easeReference).includes(value);
    if (!isValid && value !== void 0 && value !== null)
      console.warn(
        `handleSetUp error: ${label}.ease properties is not valid`
      );
    return isValid ? value : easeDefault;
  };

  // src/js/mobbu/store/storeUtils.js
  var maxDepth = (object) => {
    if (!storeType.isObject(object))
      return 0;
    const values = Object.values(object);
    return (values.length && Math.max(...values.map((value) => maxDepth(value)))) + 1;
  };
  var getDataRecursive = (data) => {
    return Object.entries(data).reduce((p, c) => {
      const [key, value] = c;
      const functionResult = storeType.isFunction(value) ? value() : {};
      if (storeType.isObject(value)) {
        return { ...p, ...{ [key]: getDataRecursive(value) } };
      } else if (storeType.isFunction(value) && storeType.isObject(functionResult) && "value" in functionResult && ("validate" in functionResult || "type" in functionResult || "skipEqual" in functionResult)) {
        return { ...p, ...{ [key]: functionResult.value } };
      } else {
        return { ...p, ...{ [key]: value } };
      }
    }, {});
  };
  var getPropRecursive = (data, prop, fallback) => {
    return Object.entries(data).reduce((p, c) => {
      const [key, value] = c;
      const functionResult = storeType.isFunction(value) ? value() : {};
      if (storeType.isObject(value)) {
        return {
          ...p,
          ...{ [key]: getPropRecursive(value, prop, fallback) }
        };
      } else if (storeType.isFunction(value) && storeType.isObject(functionResult) && "value" in functionResult && prop in functionResult) {
        return { ...p, ...{ [key]: functionResult[prop] } };
      } else {
        return { ...p, ...{ [key]: fallback } };
      }
    }, {});
  };

  // src/js/mobbu/store/storeWarining.js
  var storeDepthWarning = (data, style) => {
    console.warn(
      `%c SimpleStore supports an object with a depth of up to 2 levels, the input object has ${data} level`,
      style
    );
  };
  var storeComputedWarning = (keys, prop, style) => {
    console.warn(
      `%c one of this key ${keys} defined in computed method of prop to monitor '${prop}' prop not exist`,
      style
    );
  };
  var storeSetWarning = (prop, style) => {
    console.warn(
      `%c SimpleStore, trying to execute set() method: store.${prop} not exist`,
      style
    );
  };
  var storeSetPropValWarning = (prop, val, style) => {
    console.warn(
      `%c trying to execute setProp method on '${prop}' propierties: setProp methods doasn't allow objects as value, ${JSON.stringify(
        val
      )} is an Object`,
      style
    );
  };
  var storeSetPropPropWarning = (prop, style) => {
    console.warn(
      `%c trying to execute setProp method on '${prop}' propierties: '${JSON.stringify(
        prop
      )}' is an objects`,
      style
    );
  };
  var storeSetPropTypeWarning = (prop, val, type, style) => {
    console.warn(
      `%c trying to execute setProp method on '${prop}' propierties: ${val} is not a ${getTypeName(
        type
      )}`,
      style
    );
  };
  var storeSetObjectValWarning = (prop, val, style) => {
    console.warn(
      `%c trying to execute setObj method on '${prop}' propierties: setObj methods allow only objects as value, ${val} is not an Object`,
      style
    );
  };
  var storeSetObjectPropWarning = (prop, style) => {
    console.warn(
      `%c trying to execute setObj data method on '${prop}' propierties: store propierties '${prop}' is not an object`,
      style
    );
  };
  var storeSetObjKeysWarning = (key, prop, style) => {
    console.warn(
      `%c trying to execute setObj data method: one of these keys '${key}' not exist in store.${prop}`,
      style
    );
  };
  var storeSetObjDepthWarning = (prop, val, style) => {
    console.warn(
      `%c trying to execute setObj data method on '${prop}' propierties: '${JSON.stringify(
        val
      )}' have a depth > 1, nested obj is not allowed`,
      style
    );
  };
  var storeSetObjTypeWarning = (prop, subProp, subVal, type, style) => {
    console.warn(
      `%c trying to execute setObj data method on ${prop}.${subProp} propierties: ${subVal} is not a ${getTypeName(
        type
      )}`,
      style
    );
  };
  var storeGetPropWarning = (prop, style) => {
    console.warn(
      `%c trying to execute get data method: store.${prop} not exist`,
      style
    );
  };
  var storeEmitWarning = (prop, style) => {
    console.warn(
      `%c trying to execute set data method: store.${prop} not exist`,
      style
    );
  };
  var storeComputedKeyUsedWarning = (keys, style) => {
    console.warn(
      `%c one of the keys [${keys}] is already used as a computed target, or one of the keys coincides with the prop to be changed.`,
      style
    );
  };
  var storeWatchWarning = (prop, style) => {
    console.warn(
      `%c SimpleStore error: the property ${prop} to watch doasn't exist in store`,
      style
    );
  };

  // src/js/mobbu/store/simpleStore.js
  var SimpleStore = class {
    /**
         * @description
         * SimpleStore inizialization.
         * The store accepts single properties or objects
           If objects are used, it is not possible to nest more than two levels. 
           Each individual property can be initialized with a simple value or via a more complex setup.
           A complex set-up is created through a function that must return an object with the property `value` and at least one of the following properties:
           `type` || `validation` || `skipEqual`
         *
          `value`:
           Initial value.
    
          `type`:
           Supported types:
          `String | Number | Object | Function | Array | Boolean | Element | NodeList`.
           The property will not be updated if it doesn't match, you will have a waring.
    
           `validation`:
           Validation function to parse value.
           This function will have the current value as input parameter and will return a boolean value.
           The validation status of each property will be displayed in the watchers and will be retrievable using the getValidation() method.
           
           `strict`:
           If set to true, the validation function will become blocking and the property will be updated only if the validation function is successful.
           THe default value is `false`.
    
           `skipEqual`:
           If the value is equal to the previous one, the property will not be updated. The watches will not be executed and the property will have no effect on the computed related to it.
           The default value is `true`.
         *
         *
         * @param {Object} data - local data of the store.
         *
         * @example
         * ```js
         *
         * Simlple propierties setup;
         * const myStore = new SimpleStore({
         *     prop1: 0,
         *     prop2: 0
         * });
         *
         *
         * Complex propierties setup:
         * const myStore = new SimpleStore({
         *     myProp: () => ({
         *         value: 10,
         *         type: Number,
         *         validate: (val) => val < 10,
         *         strict: true,
         *         skipEqual: false,
         *     }),
         *     myObject: {
         *         prop1: () => ({
         *             value: 0,
         *             type: Number,
         *             validate: (val) => val < 10,
         *             strict: true,
         *             skipEqual: true,
         *         }),
         *         prop2: () => ({
         *             value: document.createElement('div'),
         *             type: Element,
         *         }),
         *     }
         * });
         *
         *
         * Available methods:
         * myStore.set();
         * myStore.setProp();
         * myStore.setProp();
         * myStore.setObj();
         * myStore.computed();
         * myStore.get();
         * myStore.getProp();
         * myStore.getValidation();
         * myStore.watch();
         * myStore.emit();
         * myStore.debugStore();
         * myStore.debugValidate();
         * myStore.setStyle();
         * myStore.destroy();
         * ```
         */
    constructor(data = {}) {
      this.logStyle = "padding: 10px;";
      this.counterId = 0;
      this.callBackWatcher = [];
      this.callBackComputed = [];
      this.validationStatusObject = {};
      this.dataDepth = maxDepth(data);
      this.computedPropFired = [];
      this.computedWaitList = [];
      this.computedRunning = false;
      this.store = (() => {
        if (this.dataDepth > 2) {
          storeDepthWarning(this.dataDepth, this.logStyle);
          return {};
        } else {
          return getDataRecursive(data);
        }
      })();
      this.type = (() => {
        if (this.dataDepth > 2) {
          storeDepthWarning(this.dataDepth, this.logStyle);
          return {};
        } else {
          return getPropRecursive(data, "type", "any");
        }
      })();
      this.fnValidate = (() => {
        if (this.dataDepth > 2) {
          storeDepthWarning(this.dataDepth, this.logStyle);
          return {};
        } else {
          return getPropRecursive(data, "validate", () => true);
        }
      })();
      this.strict = (() => {
        if (this.dataDepth > 2) {
          storeDepthWarning(this.dataDepth, this.logStyle);
          return {};
        } else {
          return getPropRecursive(data, "strict", false);
        }
      })();
      this.skipEqual = (() => {
        if (this.dataDepth > 2) {
          storeDepthWarning(this.dataDepth, this.logStyle);
          return {};
        } else {
          return getPropRecursive(data, "skipEqual", true);
        }
      })();
      this.inizializeValidation();
    }
    /**
     * @private
     *
     * @description
     * Inizialize validation status for each prop.
     */
    inizializeValidation() {
      for (const key in this.store) {
        if (storeType.isObject(this.store[key]))
          this.validationStatusObject[key] = {};
      }
      Object.entries(this.store).forEach((item) => {
        const [key, value] = item;
        this.set(key, value, false);
      });
    }
    /**
     * @private
     * @description
     * Update prop target of computed.
     */
    fireComputed() {
      this.computedWaitList.forEach((propChanged) => {
        this.callBackComputed.forEach((item) => {
          const {
            prop: propToUpdate,
            keys: propsShouldChange,
            fn: computedFn
          } = item;
          const storeKeys = Object.keys(this.store);
          const propsShouldChangeIsInStore = propsShouldChange.every(
            (item2) => storeKeys.includes(item2)
          );
          if (!propsShouldChangeIsInStore) {
            storeComputedWarning(
              propsShouldChange,
              propToUpdate,
              this.logStyle
            );
            return;
          }
          const propChangedIsDependency = propsShouldChange.includes(propChanged);
          if (!propChangedIsDependency)
            return;
          const propValues = propsShouldChange.map((item2) => {
            return this.store[item2];
          });
          const shouldFire = !this.computedPropFired.includes(propToUpdate);
          if (shouldFire) {
            const computedValue = computedFn(...propValues);
            this.set(propToUpdate, computedValue);
            this.computedPropFired.push(propToUpdate);
          }
        });
      });
      this.computedPropFired = [];
      this.computedWaitList = [];
      this.computedRunning = false;
    }
    /**
     * @private
     * @param {string} prop - prop chenages by set() method.
     *
     * @description
     * Store all prop changes and wait next tick.
     * If several properties related to the same computed change at the same time
     * the callback related to the computed will be fired only once.
     */
    addToComputedWaitLsit(prop) {
      if (!this.callBackComputed.length)
        return;
      this.computedWaitList.push(prop);
      if (!this.computedRunning) {
        this.computedRunning = true;
        setTimeout(() => this.fireComputed());
      }
    }
    /**
     * @param {String} prop - propierties or object to update
     * @param {(any|function(any):any)} newValue - It is possible to pass the direct value or a function which takes as parameter the current value and which returns the new value
       If the type of value used is a function, only the new function can be passed
     * @param {Boolean} [ fireCallback ] - fire watcher callback on update,  default value is `true`
     *
     * @description
     * Update object and non-objects propierties.
     *
     * @example
     * ```js
     * Direct value:
     * myStore.set('myProp', newValue, true);
     * myStore.set('myPropObject', { myProp: newValue, ... });
     *
     * Function that return a value:
     * myStore.set('myProp', (currentValue) => currentValue + 1);
     * myStore.set('myPropObject', (obj) => ({ prop: obj.prop + 1, ...}))
     *
     * ```
     */
    set(prop, newValue, fireCallback = true) {
      if (!(prop in this.store)) {
        storeSetWarning(prop, this.logStyle);
        return;
      }
      const value = checkType(Function, newValue) && !checkType(Function, this.store[prop]) && this.type[prop] !== Function ? newValue(this.store[prop]) : newValue;
      if (storeType.isObject(this.store[prop])) {
        this.setObj(prop, value, fireCallback);
      } else {
        this.setProp(prop, value, fireCallback);
      }
    }
    /**
     * @private
     *
     * @param {String} prop - propierties to update
     * @param {any} value - new value
     * @param {Boolean} fireCallback - fire watcher callback on update,  default value is `true`
     *
     * @description
     * Update non-object propierties
     *
     * @example
     * ```js
     * myStore.setProp('myProp', newValue, true);
     *
     * ```
     */
    setProp(prop, val, fireCallback = true) {
      if (storeType.isObject(val)) {
        storeSetPropValWarning(prop, val, this.logStyle);
        return;
      }
      if (storeType.isObject(this.store[prop])) {
        storeSetPropPropWarning(prop, this.logStyle);
        return;
      }
      const isValidType = checkType(this.type[prop], val);
      if (!isValidType) {
        storeSetPropTypeWarning(prop, val, this.type[prop], this.logStyle);
        return;
      }
      const isValidated = this.fnValidate[prop](val);
      if (this.strict[prop] && !isValidated)
        return;
      this.validationStatusObject[prop] = isValidated;
      const oldVal = this.store[prop];
      if (oldVal === val && this.skipEqual[prop])
        return;
      this.store[prop] = val;
      if (fireCallback) {
        const fnByProp = this.callBackWatcher.filter(
          (item) => item.prop === prop
        );
        fnByProp.forEach((item) => {
          item.fn(val, oldVal, this.validationStatusObject[prop]);
        });
      }
      this.addToComputedWaitLsit(prop);
    }
    /**
     * @private
     *
     * @param {String} prop - propierties to update
     * @param {any} value - new value
     * @param {Boolean} fireCallback - fire watcher callback on update,  default value is `true`
     *
     * @description
     * Update object propierties
     *
     * @example
     * ```js
     * myStore.set('myPropObject', { myProp: newValue, ... }, true);
     *
     * ```
     */
    setObj(prop, val, fireCallback = true) {
      if (!storeType.isObject(val)) {
        storeSetObjectValWarning(prop, val, this.logStyle);
        return;
      }
      if (!storeType.isObject(this.store[prop])) {
        storeSetObjectPropWarning(prop, this.logStyle);
        return;
      }
      const valKeys = Object.keys(val);
      const propKeys = Object.keys(this.store[prop]);
      const hasKeys = valKeys.every((item) => propKeys.includes(item));
      if (!hasKeys) {
        storeSetObjKeysWarning(valKeys, prop, this.logStyle);
        return;
      }
      const dataDepth = maxDepth(val);
      if (dataDepth > 1) {
        storeSetObjDepthWarning(prop, val, this.logStyle);
        return;
      }
      const isValidType = Object.entries(val).map((item) => {
        const [subProp, subVal] = item;
        const typeResponse = checkType(
          this.type[prop][subProp],
          subVal
        );
        if (!typeResponse) {
          storeSetObjTypeWarning(
            prop,
            subProp,
            subVal,
            this.type[prop][subProp],
            this.logStyle
          );
        }
        return typeResponse;
      }).every((item) => item === true);
      if (!isValidType) {
        return;
      }
      const strictObjectResult = Object.entries(val).map((item) => {
        const [subProp, subVal] = item;
        return this.strict[prop][subProp] ? {
          strictCheck: this.fnValidate[prop][subProp](subVal),
          item
        } : { strictCheck: true, item };
      }).filter(({ strictCheck }) => strictCheck === true);
      const allStrictFail = strictObjectResult.every(
        (item) => item === false
      );
      if (allStrictFail)
        return;
      const newValParsedByStrict = strictObjectResult.map(({ item }) => item).reduce((acc, [key, val2]) => ({ ...acc, ...{ [key]: val2 } }), {});
      Object.entries(newValParsedByStrict).forEach((item) => {
        const [subProp, subVal] = item;
        this.validationStatusObject[prop][subProp] = this.fnValidate[prop][subProp](subVal);
      });
      const oldObjectValues = this.store[prop];
      const newObjectValues = {
        ...this.store[prop],
        ...newValParsedByStrict
      };
      const shouldSkipEqual = Object.keys(newValParsedByStrict).every(
        (subProp) => this.skipEqual[prop][subProp] === true
      );
      const prevValueIsEqualNew = Object.entries(newObjectValues).every(
        ([key, value]) => value === oldObjectValues[key]
      );
      if (shouldSkipEqual && prevValueIsEqualNew)
        return;
      this.store[prop] = newObjectValues;
      if (fireCallback) {
        const fnByProp = this.callBackWatcher.filter(
          (item) => item.prop === prop
        );
        fnByProp.forEach((item) => {
          item.fn(
            this.store[prop],
            oldObjectValues,
            this.validationStatusObject[prop]
          );
        });
      }
      this.addToComputedWaitLsit(prop);
    }
    /**
     * @private
     *
     * @param {String} prop - propierties to update
     * @param {any} value - new value
     *
     * @description
     * Update a parameter omitting any type of control, method for internal use for maximum responsiveness.et prop without
     */
    quickSetProp(prop, val) {
      const oldVal = this.store[prop];
      this.store[prop] = val;
      const fnByProp = this.callBackWatcher.filter(
        (item) => item.prop === prop
      );
      fnByProp.forEach((item) => {
        item.fn(val, oldVal, null);
      });
    }
    /**
     * @description
     * Get store object
     *
     * @example
     * ```js
     * const storeObject = myStore.get();
     * const { myProp } = myStore.get();
     *
     * ```
     *
     */
    get() {
      return this.store;
    }
    /**
     * @param {string} prop - propierites froms store.
     * @returns {any} property value
     *
     * @description
     * Get specific prop from store.
     *
     * @example
     * ```js
     * const myProp= myStore.get('myProp');
     *
     * ```
     */
    getProp(prop) {
      if (prop in this.store) {
        return this.store[prop];
      } else {
        storeGetPropWarning(prop, this.logStyle);
      }
    }
    /**
     * @returns {Object} Object validation.
     *
     * @description
     * Get validation object status
     *
     * @example
     * ```js
     * const storeValidationObject = myStore.getValidation();
     * const { myProp } = myStore.getValidation();
     *
     * ```
     *
     */
    getValidation() {
      return this.validationStatusObject;
    }
    /**
     * @param {String} prop - property to watch.
     * @param {function(any,any,(boolean|object))} callback - callback Function, fired on prop value change
     * @returns {function} unsubscribe function
     *
     * @description
     * Watch property mutation
     *
     * @example
     * ```js
     *
     * const unsubscribe =  myStore.watch('myProp', (newVal, oldVal, validate) => {
     *      // code
     * })
     * unsubscribe();
     *
     *
     * ```
     */
    watch(prop, callback2 = () => {
    }) {
      if (!(prop in this.store)) {
        storeWatchWarning(prop, this.logStyle);
        return;
      }
      this.callBackWatcher.push({
        prop,
        fn: callback2,
        id: this.counterId
      });
      const cbId = this.counterId;
      this.counterId++;
      return () => {
        this.callBackWatcher = this.callBackWatcher.filter(
          (item) => item.id !== cbId
        );
      };
    }
    /**
     * @description
     * Fire callback related to specific property.
     *
     * @param {string} prop
     *
     * @example
     * ```js
     * myStore.emit('myProp');
     * ```
     */
    emit(prop) {
      if (prop in this.store) {
        const fnByProp = this.callBackWatcher.filter(
          (item) => item.prop === prop
        );
        fnByProp.forEach((item) => {
          item.fn(
            this.store[prop],
            this.store[prop],
            this.validationStatusObject[prop]
          );
        });
      } else {
        storeEmitWarning(prop, this.logStyle);
      }
    }
    /**
     * @description
     * Run a console.log() of store object.
     */
    debugStore() {
      console.log(this.store);
    }
    /**
     * @description
     * Run a console.log() of validation object
     */
    debugValidate() {
      console.log(this.validationStatusObject);
    }
    /**
     * @description
     * Modify style of warining.
     * Utils to have a different style for each store.
     *
     * @example
     * Store.setStyle('color:#ccc;');
     */
    setStyle(string) {
      this.logStyle = string;
    }
    /**
     * @param  {string} prop - Property in store to update
     * @param  {Array.<String>} keys - Array of property to watch.
     * @param {function(any,any):any} fn - Callback function launched when one of the properties of the array changes, the result of the function will be the new value of the property. The parameters of the function are the current values of the properties specified in the array.
     *
     * @description
     * Update propierties value if some dependency change.
     * Computed functions are resolved on the nextTick. 
     * If multiple dependencies change at the same time, the computed will be resolved only once.
     *
     *
     * @example
     * ```js
     * Prop target is not an object, and dependency is not an object:
     * myStore.computed('prop', ['prop1', 'prop2'], (val1, val2) => {
     *     return val1 + val2;
     * });
     *
     * Prop target is not an object and dependency is an object.
     * myStore.computed('prop', ['objectProp'], (obj) => {
     *      return obj.val1 + obj.val2;
     * })
     *
     * Prop target is an object and dependency is not an object.
       When target is on object the result will be mergerd with original object.
     * myStore.computed('objectProp', ['prop1', 'prop2'], (val1, val2) => {
     *     return { sum: val1 + val2 };
     * });
     *
     * Prop target is an object, and dependency is an object.
       When target is on object the result will be mergerd with original object.
     * myStore.computed('objectProp', ['objectProp1'], (obj) => {
     *     return { sum: obj.val1 + obj.val2 };
     * });
     * ```
     */
    computed(prop, keys, fn) {
      const tempComputedArray = [
        ...this.callBackComputed,
        ...[{ prop, keys, fn }]
      ];
      const propList = tempComputedArray.map((item) => item.prop).flat();
      const keysIsusedInSomeComputed = propList.some(
        (item) => keys.includes(item)
      );
      if (keysIsusedInSomeComputed) {
        storeComputedKeyUsedWarning(keys, this.logStyle);
        return;
      }
      this.callBackComputed.push({
        prop,
        keys,
        fn
      });
    }
    /**
     * @descrition
     * Delete all data inside store.
     */
    destroy() {
      this.counterId = 0;
      this.callBackWatcher = [];
      this.callBackComputed = [];
      this.computedPropFired = [];
      this.computedWaitList = [];
      this.validationStatusObject = {};
      this.store = {};
      this.type = {};
      this.fnValidate = {};
      this.strict = {};
      this.skipEqual = {};
    }
  };

  // src/js/mobbu/utils/mergeDeep.js
  var mergeDeep = (target, source, isMergingArrays = true) => {
    target = ((obj) => {
      let cloneObj;
      try {
        cloneObj = JSON.parse(JSON.stringify(obj));
      } catch (err) {
        cloneObj = Object.assign({}, obj);
      }
      return cloneObj;
    })(target);
    const isObject = (obj) => obj && typeof obj === "object";
    if (!isObject(target) || !isObject(source))
      return source;
    Object.keys(source).forEach((key) => {
      const targetValue = target[key];
      const sourceValue = source[key];
      if (Array.isArray(targetValue) && Array.isArray(sourceValue))
        if (isMergingArrays) {
          target[key] = targetValue.map(
            (x, i) => sourceValue.length <= i ? x : mergeDeep(x, sourceValue[i], isMergingArrays)
          );
          if (sourceValue.length > targetValue.length)
            target[key] = target[key].concat(
              sourceValue.slice(targetValue.length)
            );
        } else {
          target[key] = targetValue.concat(sourceValue);
        }
      else if (isObject(targetValue) && isObject(sourceValue))
        target[key] = mergeDeep(
          Object.assign({}, targetValue),
          sourceValue,
          isMergingArrays
        );
      else
        target[key] = sourceValue;
    });
    return target;
  };

  // src/js/mobbu/setup.js
  var setUpStore = new SimpleStore({
    usePassive: usePassiveDefault
  });
  var handleSetUp = (() => {
    let data = {
      startFps: startFpsDefault,
      fpsScalePercent: fpsScalePercentDefault,
      useScaleFps: useScaleFpsDefault,
      deferredNextTick: deferredNextTickDefault,
      throttle: throttleDefault,
      usePassive: usePassiveDefault,
      mq: mqDefault,
      defaultMq: {
        value: defaultMqValueDefault,
        type: MQ_MIN
      },
      sequencer: {
        duration: sequencerDurationDefault,
        ease: easeDefault
      },
      scrollTrigger: {
        springConfig: springConfigDefault,
        lerpConfig: lerpConfigDefault,
        markerColor: {
          startEnd: markerStartDefault,
          item: markerItemDefault
        }
      },
      parallax: {
        defaultRange: parallaxRangeDefault,
        springConfig: springConfigDefault,
        lerpConfig: lerpConfigDefault
      },
      parallaxTween: {
        duration: parallaxTweenDurationDefault,
        ease: easeDefault
      },
      tween: {
        duration: tweenDurationDefault,
        ease: easeDefault,
        relative: tweenRealtiveDefault
      },
      spring: {
        relative: false,
        config: springPresetConfig
      },
      lerp: {
        relative: false,
        precision: 0.01,
        velocity: 0.06
      }
    };
    const set = (obj) => {
      data = setupValidation(mergeDeep(data, obj));
      if ("usePassive" in obj)
        setUpStore.set("usePassive", data?.usePassive);
    };
    const get = (prop) => {
      if (prop in data) {
        return data[prop];
      } else {
        console.warn(`handleSetUp: ${prop} is not a setup propierties`);
      }
    };
    const print = () => {
      console.log(`Writable props:`);
      console.log(data);
    };
    return {
      set,
      get,
      print
    };
  })();

  // src/js/mobbu/events/mouseUtils/normalizeWhell.js
  var PIXEL_STEP = 10;
  var LINE_HEIGHT = 40;
  var PAGE_HEIGHT = 800;
  function normalizeWheel(event) {
    let sX = 0, sY = 0, pX = 0, pY = 0;
    if ("detail" in event) {
      sY = event.detail;
    }
    if ("wheelDelta" in event) {
      sY = -event.wheelDelta / 120;
    }
    if ("wheelDeltaY" in event) {
      sY = -event.wheelDeltaY / 120;
    }
    if ("wheelDeltaX" in event) {
      sX = -event.wheelDeltaX / 120;
    }
    if ("axis" in event && event.axis === event.HORIZONTAL_AXIS) {
      sX = sY;
      sY = 0;
    }
    pX = sX * PIXEL_STEP;
    pY = sY * PIXEL_STEP;
    if ("deltaY" in event) {
      pY = event.deltaY;
    }
    if ("deltaX" in event) {
      pX = event.deltaX;
    }
    if ((pX || pY) && event.deltaMode) {
      if (event.deltaMode == 1) {
        pX *= LINE_HEIGHT;
        pY *= LINE_HEIGHT;
      } else {
        pX *= PAGE_HEIGHT;
        pY *= PAGE_HEIGHT;
      }
    }
    if (pX && !sX) {
      sX = pX < 1 ? -1 : 1;
    }
    if (pY && !sY) {
      sY = pY < 1 ? -1 : 1;
    }
    return { spinX: sX, spinY: sY, pixelX: pX, pixelY: pY };
  }

  // src/js/mobbu/events/mouseUtils/handleMouse.js
  function handleMouse(event) {
    let inizialized = false;
    let callback2 = [];
    let id = 0;
    let usePassive = handleSetUp.get("usePassive");
    setUpStore.watch("usePassive", () => {
      window.removeEventListener(event, handler);
      inizialized = false;
      init();
    });
    function handler(e) {
      if (callback2.length === 0) {
        window.removeEventListener(event, handler);
        inizialized = false;
        return;
      }
      const type = e.type;
      const { pageX, pageY } = (() => {
        if (type === "touchend" && e.changedTouches)
          return e.changedTouches[0];
        return e.touches ? e.touches[0] : e;
      })();
      const { clientX, clientY } = (() => {
        if (type === "touchend" && e.changedTouches)
          return e.changedTouches[0];
        return e.touches ? e.touches[0] : e;
      })();
      const target = e.target;
      const mouseData = {
        page: {
          x: pageX,
          y: pageY
        },
        client: {
          x: clientX,
          y: clientY
        },
        target,
        type,
        preventDefault: () => usePassive ? () => {
        } : e.preventDefault()
      };
      if (type === "wheel") {
        const { spinX, spinY, pixelX, pixelY } = normalizeWheel(e);
        Object.assign(mouseData, { spinX, spinY, pixelX, pixelY });
      }
      callback2.forEach(({ cb }) => {
        cb(mouseData);
      });
    }
    function init() {
      if (inizialized)
        return;
      inizialized = true;
      usePassive = handleSetUp.get("usePassive");
      window.addEventListener(event, handler, {
        passive: usePassive
      });
    }
    const addCb = (cb) => {
      callback2.push({ cb, id });
      const cbId = id;
      id++;
      if (typeof window !== "undefined") {
        init();
      }
      return () => {
        callback2 = callback2.filter((item) => item.id !== cbId);
      };
    };
    return addCb;
  }
  var handleMouseClick = new handleMouse("click");
  var handleMouseDown = new handleMouse("mousedown");
  var handleTouchStart = new handleMouse("touchstart");
  var handleMouseMove = new handleMouse("mousemove");
  var handleTouchMove = new handleMouse("touchmove");
  var handleMouseUp = new handleMouse("mouseup");
  var handleTouchEnd = new handleMouse("touchend");
  var handleMouseWheel = new handleMouse("wheel");

  // src/js/mobbu/utils/functionsUtils.js
  var NOOP = () => {
  };

  // src/js/mobbu/events/rafutils/frameStore.js
  var frameStore = new SimpleStore({
    currentFrame: 0,
    instantFps: handleSetUp.get("startFps"),
    requestFrame: NOOP
  });

  // src/js/mobbu/utils/time.js
  var getTime = () => {
    return typeof window !== "undefined" ? window.performance.now() : Date.now();
  };
  var defaultTimestep = 1 / 60 * 1e3;

  // src/js/mobbu/events/visibilityChange/handleVisibilityChange.js
  var handleVisibilityChange = (() => {
    let inizialized = false;
    let callback2 = [];
    let id = 0;
    function handler() {
      if (callback2.length === 0) {
        window.removeEventListener("visibilitychange", handler);
        inizialized = false;
        return;
      }
      const visibilityData = {
        visibilityState: document.visibilityState
      };
      callback2.forEach(({ cb }) => {
        cb(visibilityData);
      });
    }
    function init() {
      if (inizialized)
        return;
      inizialized = true;
      window.addEventListener("visibilitychange", handler, {
        passive: false
      });
    }
    const addCb = (cb) => {
      callback2.push({ cb, id });
      const cbId = id;
      id++;
      if (typeof window !== "undefined") {
        init();
      }
      return () => {
        callback2 = callback2.filter((item) => item.id !== cbId);
      };
    };
    return addCb;
  })();

  // src/js/mobbu/events/rafutils/handleCache.js
  var handleCache = (() => {
    let id = 0;
    let cacheCoutner = 0;
    const subscriber = {};
    const add = (el, fn) => {
      subscriber[id] = {
        el,
        fn,
        data: {}
      };
      const prevId = id;
      id++;
      return {
        id: prevId,
        unsubscribe: () => {
          if (subscriber?.[prevId]) {
            const frameToSubstract = Object.keys(
              subscriber[prevId].data
            ).length;
            cacheCoutner = cacheCoutner - frameToSubstract;
            delete subscriber[prevId];
          }
        }
      };
    };
    const update = ({ id: id2, cbObject, frame }) => {
      if (!subscriber[id2])
        return;
      const { currentFrame: currentFrame2 } = frameStore.get();
      const { data } = subscriber[id2];
      if (data[frame + currentFrame2])
        return;
      data[frame + currentFrame2] = cbObject;
      cacheCoutner++;
    };
    const remove = (id2) => {
      if (id2 in subscriber)
        delete subscriber[id2];
    };
    const clean = (id2) => {
      const el = subscriber[id2];
      if (!el)
        return;
      const frameToSubstract = Object.keys(el.data).length;
      cacheCoutner = cacheCoutner - frameToSubstract;
      el.data = {};
    };
    const get = (id2) => {
      return subscriber?.[id2];
    };
    const fire = (frameCounter, shouldRender2) => {
      Object.values(subscriber).forEach(({ data, fn, el }) => {
        const cbObject = data?.[frameCounter];
        if (cbObject) {
          if (shouldRender2) {
            fn(cbObject, el);
          }
          data[frameCounter] = null;
          delete data[frameCounter];
          cacheCoutner--;
        }
      });
    };
    const fireObject = ({ id: id2, obj }) => {
      if (!subscriber[id2])
        return;
      const { el, fn } = subscriber[id2];
      fn(obj, el);
    };
    const getCacheCounter = () => cacheCoutner;
    const updateFrameId = (maxFramecounter) => {
      Object.values(subscriber).forEach(({ data }) => {
        Object.keys(data).forEach((key) => {
          delete Object.assign(data, {
            [`${parseInt(key) - maxFramecounter}`]: data[key]
          })[key];
        });
      });
    };
    return {
      add,
      get,
      update,
      remove,
      clean,
      fire,
      fireObject,
      getCacheCounter,
      updateFrameId
    };
  })();

  // src/js/mobbu/events/rafutils/handleNextTick.js
  var handleNextTick = (() => {
    let callback2 = [];
    const add = (cb, priority = 100) => {
      callback2.push({ cb, priority });
    };
    const fire = ({ time: time2, fps: fps2, shouldRender: shouldRender2 }) => {
      if (callback2.length === 0)
        return;
      callback2.sort((a, b) => a.priority - b.priority);
      callback2.forEach(({ cb }) => cb({ time: time2, fps: fps2, shouldRender: shouldRender2 }));
      callback2.length = 0;
    };
    return { add, fire };
  })();

  // src/js/mobbu/events/rafutils/handleNextFrame.js
  var handleNextFrame = (() => {
    let callback2 = [];
    const add = (cb) => {
      callback2.push(cb);
    };
    const get = () => {
      const cb = [...callback2];
      callback2.length = 0;
      return cb;
    };
    return { add, get };
  })();

  // src/js/mobbu/events/rafutils/handleFrameIndex.js
  var handleFrameIndex = (() => {
    let indexCallback = {};
    let indexCallbackLength = 0;
    let indexCb = null;
    const updateKeys = (currentFrameLimit2) => {
      Object.keys(indexCallback).forEach((key) => {
        delete Object.assign(indexCallback, {
          [`${parseInt(key) - currentFrameLimit2}`]: indexCallback[key]
        })[key];
      });
    };
    const fire = ({ currentFrame: currentFrame2, time: time2, fps: fps2, shouldRender: shouldRender2 }) => {
      indexCb = indexCallback[currentFrame2];
      if (indexCb) {
        indexCb.forEach((item) => item({ time: time2, fps: fps2, shouldRender: shouldRender2 }));
        indexCallback[currentFrame2] = null;
        delete indexCallback[currentFrame2];
        indexCallbackLength = indexCallbackLength - 1;
      } else {
        indexCb = null;
      }
    };
    const add = (cb, index) => {
      const frameIndex = index + frameStore.getProp("currentFrame");
      if (indexCallback[frameIndex]) {
        indexCallback[frameIndex].push(cb);
      } else {
        indexCallback[frameIndex] = [cb];
        indexCallbackLength++;
      }
      frameStore.emit("requestFrame");
    };
    const getIndexCallbackLenght = () => {
      return indexCallbackLength;
    };
    return {
      add,
      fire,
      updateKeys,
      getIndexCallbackLenght
    };
  })();

  // src/js/mobbu/events/errorHandler/catchAnimationReject.js
  var ANIMATION_STOP_REJECT = "animationStop";
  var catchAnimationReject = () => {
    window.addEventListener("unhandledrejection", (e) => {
      if (e.reason === ANIMATION_STOP_REJECT)
        e.preventDefault();
    });
  };

  // src/js/mobbu/events/rafutils/loadFps.js
  var loadFpsIsReady = false;
  var loadFps = (duration = 30) => {
    if (loadFpsIsReady) {
      const { instantFps } = frameStore.get();
      return new Promise((resolve) => {
        resolve({ averageFPS: instantFps });
      });
    }
    return new Promise((resolve) => {
      const frameTimes = [];
      const maxFrames = 20;
      let frameCursor = 0;
      let numFrames = 0;
      let totalFPS = 0;
      let then = 0;
      let frameCounter = 0;
      const render2 = (now) => {
        now *= 1e-3;
        const deltaTime = now - then;
        then = now;
        const fps2 = 1 / deltaTime;
        totalFPS += fps2 - (frameTimes[frameCursor] || 0);
        frameTimes[frameCursor++] = fps2;
        numFrames = Math.max(numFrames, frameCursor);
        frameCursor %= maxFrames;
        const averageFPS = parseInt(totalFPS / numFrames);
        frameCounter++;
        if (frameCounter >= duration) {
          frameStore.quickSetProp("instantFps", averageFPS);
          loadFpsIsReady = true;
          resolve({
            averageFPS
          });
          return;
        }
        requestAnimationFrame(render2);
      };
      requestAnimationFrame(render2);
    });
  };

  // src/js/mobbu/events/rafutils/handleFrame.js
  loadFps();
  var currentFrameLimit = 1e7;
  var firstRunDuration = 2e3;
  var frameIsRuning = false;
  var callback = [];
  var time = getTime();
  var startTime = 0;
  var rawTime = 0;
  var timeElapsed = 0;
  var isStopped = false;
  var fps = handleSetUp.get("startFps");
  var maxFps = fps;
  var frames = 0;
  var fpsPrevTime = 0;
  var currentFrame = 0;
  var dropFrameCounter = -1;
  var shouldRender = true;
  var fpsScalePercent = handleSetUp.get("fpsScalePercent");
  var useScaleFpsf = handleSetUp.get("useScaleFps");
  var mustMakeSomethingIsActive = false;
  var shouldMakeSomethingIsActive = false;
  var mustMakeSomethingCheck = () => fps < maxFps / 5 * 3;
  var shouldMakeSomethingCheck = () => fps < maxFps / 5 * 4;
  var mustMakeSomethingStart = () => {
    if (!mustMakeSomethingCheck() || mustMakeSomethingIsActive)
      return;
    mustMakeSomethingIsActive = true;
    setTimeout(() => {
      mustMakeSomethingIsActive = false;
    }, 4e3);
  };
  var shouldMakeSomethingStart = () => {
    if (!shouldMakeSomethingCheck() || shouldMakeSomethingIsActive)
      return;
    shouldMakeSomethingIsActive = true;
    setTimeout(() => {
      shouldMakeSomethingIsActive = false;
    }, 4e3);
  };
  handleVisibilityChange(({ visibilityState }) => {
    isStopped = visibilityState === "visible";
  });
  catchAnimationReject();
  frameStore.watch("requestFrame", () => {
    initFrame();
  });
  var getRenderStatus = () => {
    if (!useScaleFpsf)
      return true;
    const activeModule = Object.entries(fpsScalePercent).reduce(
      (acc, [fpsValue, fpsModule]) => {
        const delta = Math.abs(maxFps - fps);
        const deltaPercent = Math.round(delta * 100 / maxFps);
        const isOutOfRange = deltaPercent > parseInt(fpsValue);
        return isOutOfRange ? fpsModule : acc;
      },
      1
    );
    dropFrameCounter = (dropFrameCounter + 1) % activeModule;
    return dropFrameCounter === 0;
  };
  var nextTickFn = () => {
    if (currentFrame === currentFrameLimit) {
      currentFrame = 0;
      frameStore.quickSetProp("currentFrame", currentFrame);
      handleFrameIndex.updateKeys(currentFrameLimit);
      handleCache.updateFrameId(currentFrameLimit);
    }
    handleNextTick.fire({ time, fps, shouldRender });
    callback = [...callback, ...handleNextFrame.get()];
    frameIsRuning = false;
    if (callback.length > 0 || handleFrameIndex.getIndexCallbackLenght() > 0 || handleCache.getCacheCounter() > 0 || time < firstRunDuration) {
      initFrame();
    } else {
      isStopped = true;
      currentFrame = 0;
      frameStore.quickSetProp("currentFrame", currentFrame);
    }
  };
  var render = (timestamp) => {
    time = timestamp;
    timeElapsed = time - rawTime;
    if (isStopped)
      startTime += timeElapsed;
    rawTime += timeElapsed;
    time = rawTime - startTime;
    if (!isStopped)
      frames++;
    if (time > fpsPrevTime + 1e3) {
      fps = time > firstRunDuration ? Math.round(frames * 1e3 / (time - fpsPrevTime)) : frameStore.getProp("instantFps");
      fpsPrevTime = time;
      frames = 0;
      fpsScalePercent = handleSetUp.get("fpsScalePercent");
      useScaleFpsf = handleSetUp.get("useScaleFps");
    }
    if (fps > maxFps)
      maxFps = fps;
    shouldRender = getRenderStatus();
    mustMakeSomethingStart();
    shouldMakeSomethingStart();
    callback.forEach((item) => item({ time, fps, shouldRender }));
    handleFrameIndex.fire({ currentFrame, time, fps, shouldRender });
    handleCache.fire(currentFrame, shouldRender);
    currentFrame++;
    frameStore.quickSetProp("currentFrame", currentFrame);
    callback.length = 0;
    isStopped = false;
    const deferredNextTick = handleSetUp.get("deferredNextTick");
    if (deferredNextTick) {
      setTimeout(() => nextTickFn());
    } else {
      nextTickFn();
    }
  };
  var initFrame = () => {
    if (frameIsRuning)
      return;
    if (typeof window !== "undefined") {
      requestAnimationFrame(render);
    } else {
      setTimeout(() => render(getTime()), defaultTimestep);
    }
    frameIsRuning = true;
  };
  var handleFrame = (() => {
    const getFps = () => fps;
    const mustMakeSomething = () => mustMakeSomethingIsActive;
    const shouldMakeSomething = () => shouldMakeSomethingIsActive;
    const getShouldRender = () => shouldRender;
    const add = (cb) => {
      callback.push(cb);
      initFrame();
    };
    const addMultiple = (arr = []) => {
      callback = [...callback, ...arr];
      initFrame();
    };
    return {
      add,
      addMultiple,
      getFps,
      mustMakeSomething,
      shouldMakeSomething,
      getShouldRender
    };
  })();

  // src/js/mobbu/events/debounce.js
  var debounceFuncion = function debounce(fn, time2 = 200) {
    let timeout;
    return function() {
      const functionCall = () => fn.apply(this, arguments);
      clearTimeout(timeout);
      timeout = setTimeout(functionCall, time2);
    };
  };

  // src/js/mobbu/events/resizeUtils/handleResize.js
  var handleResize = (() => {
    let inizialized = false;
    let callback2 = [];
    let id = 0;
    let debouceFunctionReference = () => {
    };
    let previousWindowHeight = window.innerHeight;
    let previousWindowWidth = window.innerWidth;
    function handler() {
      if (callback2.length === 0) {
        window.removeEventListener("resize", debouceFunctionReference);
        inizialized = false;
        return;
      }
      const windowsHeight = window.innerHeight;
      const windowsWidth = window.innerWidth;
      const verticalResize = windowsHeight !== previousWindowHeight;
      const horizontalResize = windowsWidth !== previousWindowWidth;
      previousWindowHeight = windowsHeight;
      previousWindowWidth = windowsWidth;
      const resizeData = {
        scrollY: window.pageYOffset,
        windowsHeight,
        windowsWidth,
        documentHeight: document.documentElement.scrollHeight,
        verticalResize,
        horizontalResize
      };
      callback2.forEach(({ cb }) => {
        cb(resizeData);
      });
    }
    function init() {
      if (inizialized)
        return;
      inizialized = true;
      debouceFunctionReference = debounceFuncion((e) => handler(e));
      window.addEventListener("resize", debouceFunctionReference, {
        passive: false
      });
    }
    const addCb = (cb) => {
      callback2.push({ cb, id });
      const cbId = id;
      id++;
      if (typeof window !== "undefined") {
        init();
      }
      return () => {
        callback2 = callback2.filter((item) => item.id !== cbId);
      };
    };
    return addCb;
  })();

  // src/js/mobbu/events/scrollUtils/handleScrollImmediate.js
  var handleScrollImmediate = (() => {
    let inizialized = false;
    let callback2 = [];
    let id = 0;
    const UP = "UP";
    const DOWN = "DOWN";
    let prev = window.pageYOffset;
    let val = window.pageYOffset;
    let direction = DOWN;
    let scrollData = {
      scrollY: val,
      direction
    };
    function handler() {
      if (callback2.length === 0) {
        window.removeEventListener("scroll", handler);
        inizialized = false;
        return;
      }
      prev = val;
      val = window.pageYOffset;
      direction = val > prev ? DOWN : UP;
      scrollData = {
        scrollY: val,
        direction
      };
      callback2.forEach(({ cb }) => {
        cb(scrollData);
      });
    }
    function init() {
      if (inizialized)
        return;
      inizialized = true;
      window.addEventListener("scroll", handler, {
        passive: true
      });
    }
    const addCb = (cb) => {
      callback2.push({ cb, id });
      const cbId = id;
      id++;
      if (typeof window !== "undefined") {
        init();
      }
      return () => {
        callback2 = callback2.filter((item) => item.id !== cbId);
      };
    };
    return addCb;
  })();

  // src/js/mobbu/events/scrollUtils/handleScroll.js
  var handleScroll = (() => {
    let inizialized = false;
    let callback2 = [];
    let id = 0;
    let unsubscribe = () => {
    };
    function handler(scrollData) {
      if (callback2.length === 0) {
        unsubscribe();
        inizialized = false;
        return;
      }
      handleFrame.add(() => {
        handleNextTick.add(() => {
          callback2.forEach(({ cb }) => {
            cb(scrollData);
          });
        }, 0);
      });
    }
    function init() {
      if (inizialized)
        return;
      inizialized = true;
      unsubscribe = handleScrollImmediate(handler);
    }
    const addCb = (cb) => {
      callback2.push({ cb, id });
      const cbId = id;
      id++;
      if (typeof window !== "undefined") {
        init();
      }
      return () => {
        callback2 = callback2.filter((item) => item.id !== cbId);
      };
    };
    return addCb;
  })();

  // src/js/mobbu/events/throttle.js
  var throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function() {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = getTime();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function() {
          if (getTime() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = getTime();
          }
        }, limit - (getTime() - lastRan));
      }
    };
  };

  // src/js/mobbu/events/scrollUtils/handleScrollThrottle.js
  var handleScrollThrottle = (() => {
    let inizialized = false;
    let callback2 = [];
    let id = 0;
    let throttleFunctionReference = () => {
    };
    let unsubscribe = () => {
    };
    function handler(scrollData) {
      if (callback2.length === 0) {
        unsubscribe();
        inizialized = false;
        return;
      }
      handleFrame.add(() => {
        handleNextTick.add(() => {
          callback2.forEach(({ cb }) => {
            cb(scrollData);
          });
        }, 0);
      });
    }
    function init() {
      if (inizialized)
        return;
      inizialized = true;
      throttleFunctionReference = throttle(
        (scrollData) => handler(scrollData),
        handleSetUp.get("throttle")
      );
      unsubscribe = handleScrollImmediate(throttleFunctionReference);
    }
    const addCb = (cb) => {
      callback2.push({ cb, id });
      const cbId = id;
      id++;
      if (typeof window !== "undefined") {
        init();
      }
      return () => {
        callback2 = callback2.filter((item) => item.id !== cbId);
      };
    };
    return addCb;
  })();

  // src/js/mobbu/events/scrollUtils/handleScrollUtils.js
  function handleScrollUtils(type) {
    let inizialized = false;
    let callback2 = [];
    let id = 0;
    let isScrolling = false;
    let unsubscribeScrollStart = () => {
    };
    let unsubscribeScrollEnd = () => {
    };
    let debouceFunctionReference = () => {
    };
    function handler() {
      isScrolling = false;
      if (callback2.length === 0) {
        unsubscribeScrollEnd();
        if (type === "START") {
          unsubscribeScrollStart();
        }
        inizialized = false;
        return;
      }
      handleFrame.add(() => {
        handleNextTick.add(() => {
          const scrollData = {
            scrollY: window.pageYOffset
          };
          if (type === "END") {
            callback2.forEach(({ cb }) => {
              cb(scrollData);
            });
          }
        }, 0);
      });
    }
    function init() {
      if (inizialized)
        return;
      inizialized = true;
      debouceFunctionReference = debounceFuncion((e) => handler(e));
      unsubscribeScrollEnd = handleScrollImmediate(debouceFunctionReference);
      if (type === "START") {
        unsubscribeScrollStart = handleScrollImmediate(({ scrollY }) => {
          const scrollData = {
            scrollY
          };
          if (!isScrolling) {
            isScrolling = true;
            callback2.forEach(({ cb }) => {
              cb(scrollData);
            });
          }
        });
      }
    }
    const addCb = (cb) => {
      callback2.push({ cb, id });
      const cbId = id;
      id++;
      if (typeof window !== "undefined") {
        init();
      }
      return () => {
        callback2 = callback2.filter((item) => item.id !== cbId);
      };
    };
    return addCb;
  }
  var handleScrollStart = new handleScrollUtils("START");
  var handleScrollEnd = new handleScrollUtils("END");

  // src/js/mobbu/utils/mediaManager.js
  var mq = (() => {
    const max = (breackpoint = "desktop") => {
      return window.innerWidth < handleSetUp.get("mq")[breackpoint];
    };
    const min = (breackpoint = "desktop") => {
      return window.innerWidth >= handleSetUp.get("mq")[breackpoint];
    };
    const getBreackpoint = (breackpoint = "desktop") => {
      return handleSetUp.get("mq")[breackpoint];
    };
    return { max, min, getBreackpoint };
  })();

  // src/js/mobbu/core.js
  var core = {
    /**
     * @description
     * - Here it is possible to modify the default values of the various modules of the library
     *
     * @param {import('./animation/utils/setUpValidation.js').handleSetUpSetType} props
     *
     *
     * @example
     * ```js
     * Default value schema:
     *
     * core.setDefault.set({
     *     startFps: 60,
     *     fpsScalePercent: {
     *         0: 1,
     *         15: 2,
     *         30: 3,
     *         45: 4,
     *     },
     *     useScaleFps: true,
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
    setDefault(props = {}) {
      handleSetUp.set(props);
    },
    /**
     * @description
     * Returns the value of a specific property
     *
     * @param {import('./setup.js').handleSetUpGetType} prop
     * @returns {Object}
     *
     * @example
     * ```js
     * core.getDefault('parallax');
     * ```
     */
    getDefault(prop = "") {
      return handleSetUp.get(prop);
    },
    /**
     * @description
     * Perform a console.log() of the default values
     *
     * @example
     * ```js
     * core.printDefault();
     * ```
     */
    printDefault() {
      handleSetUp.print();
    },
    getFps() {
      return handleFrame.getFps();
    },
    getInstantFps() {
      return frameStore.getProp("instantFps");
    },
    /**
         * @description
         * SimpleStore inizialization.
         * The store accepts single properties or objects
           If objects are used, it is not possible to nest more than two levels.
           Each individual property can be initialized with a simple value or via a more complex setup.
           A complex set-up is created through a function that must return an object with the property `value` and at least one of the following properties:
           `type` || `validation` || `skipEqual`
         *
          `value`:
           Initial value.
    
          `type`:
           Supported types:
          `String | Number | Object | Function | Array | Boolean | Element | NodeList`.
           The property will not be updated if it doesn't match, you will have a waring.
    
           `validation`:
           Validation function to parse value.
           This function will have the current value as input parameter and will return a boolean value.
           The validation status of each property will be displayed in the watchers and will be retrievable using the getValidation() method.
    
           `strict`:
           If set to true, the validation function will become blocking and the property will be updated only if the validation function is successful.
           THe default value is `false`.
    
           `skipEqual`:
           If the value is equal to the previous one, the property will not be updated. The watches will not be executed and the property will have no effect on the computed related to it.
           The default value is `true`.
         *
         *
         * @param {Object} data - local data of the store.
         *
         * @example
         * ```js
         *
         * Simlple propierties setup;
         * const myStore = core.createStore({
         *     prop1: 0,
         *     prop2: 0
         * });
         *
         * Complex propierties setup:
         * const myStore = core.createStore({
         *     myProp: () => ({
         *         value: 10,
         *         type: Number,
         *         validate: (val) => val < 10,
         *         strict: true,
         *         skipEqual: false,
         *     }),
         *     myObject: {
         *         prop1: () => ({
         *             value: 0,
         *             type: Number,
         *             validate: (val) => val < 10,
         *             strict: true,
         *             skipEqual: true,
         *         }),
         *         prop2: () => ({
         *             value: document.createElement('div'),
         *             type: Element,
         *         }),
         *     }
         * });
         *
         *
         *
         * Available methods:
         * myStore.set();
         * myStore.setProp();
         * myStore.setProp();
         * myStore.setObj();
         * myStore.computed();
         * myStore.get();
         * myStore.getProp();
         * myStore.getValidation();
         * myStore.watch();
         * myStore.emit();
         * myStore.debugStore();
         * myStore.debugValidate();
         * myStore.setStyle();
         * myStore.destroy();
         * ```
         */
    createStore(data = {}) {
      return new SimpleStore(data);
    },
    /**
     * @description
      If the current FPS drops below `2/5` of its maximum value the methods return true.
      The value will remain frozen for 4 seconds in order to have time to take the right countermeasures.
     *
     */
    mustMakeSomething() {
      return handleFrame.mustMakeSomething();
    },
    /**
     * @description
      If the current FPS drops below `1/5` of its maximum value the methods return true.
      The value will remain frozen for 4 seconds in order to have time to take the right countermeasures.
     *
     */
    shouldMakeSomething() {
      return handleFrame.shouldMakeSomething();
    },
    /**
     * @description
    Execute a callBack within the first available request animation frame.
    Use this method to modify elements of the DOM
     *
     * @param {function(import('./events/rafutils/handleFrame.js').handleFrameTypes):void } callback - callback function
     *
     * @example
     * ```js
     * core.useframe(({ fps, shouldrender, time }) => {
     *     // code ...
     * });
     *
     * ```
     */
    useFrame(callback2 = () => {
    }) {
      return handleFrame.add(callback2);
    },
    /**
     * @description
     * Execute callbacks after scheduling the request animation frame. Use this method to read data from the DOM. To execute callbacks exactly after the request animation frame, set the global property deferredNextTick to true.
     *
     * @param {function(import('./events/rafutils/handleFrame.js').handleFrameTypes):void } callback - callback function
     *
     * @example
     * ```js
     * core.useFrame(() => {
     *     core.useNextTick(({ fps, shouldRender, time }) => {
     *         // code
     *     });
     * });
     *
     * Loop request animation frame using handleNextTick:
     *
     * const loop = () => {
     *     core.useNextTick(() => {
     *         // read from DOM
     *
     *         core.useFrame(() => {
     *             // write to the DOM
     *             loop();
     *         });
     *     });
     * };
     *
     * core.useFrame(() => loop());
     *
     * To tick exactly after the request animation frame:
     * core.default('set', { deferredNextTick: true });
     *
     * ```
     */
    useNextTick(callback2 = () => {
    }) {
      return handleNextTick.add(callback2);
    },
    /**
     * @description
     * Execute a callback to the next available frame allowing the creation of a request animation frame loop
     *
     * @param {function(import('./events/rafutils/handleFrame.js').handleFrameTypes):void } callback - callback function
     *
     * @example
     * ```js
     * const loop = () => {
     *     core.useNextFrame(({ fps, shouldRender, time }) => {
     *         // code
     *         loop();
     *     });
     * };
     *
     * core.useFrame(() => loop());
     *
     * ```
     */
    useNextFrame(callback2 = () => {
    }) {
      return handleNextFrame.add(callback2);
    },
    /**
     * @description
     * Add callback to a specific frame.
     *
     * @param {function(import('./events/rafutils/handleFrame.js').handleFrameTypes):void } callback - callback function
     * @pram {number} index
     *
     * @example
     * ```js
     * core.useFrameIndex(({ fps, shouldRender, time }) => {
     *     // code ...
     * }, 5);
     *
     * ```
     */
    useFrameIndex(callback2 = () => {
    }, frame = 0) {
      return handleFrameIndex.add(callback2, frame);
    },
    /**
     * @description
        Runs a request animation frame loop to detect the frame rate of the monitor.
        After the method will be resolved the first time, subsequent calls will be resolved immediately returning the previously calculated value.
        The method is launched the first time automatically at the first loading.
     *
     * @param {function(import('./events/rafutils/loadFps.js').loadFpsType):void } callback - callback function
     * @return {Promise}
     *
     */
    useFps(callback2 = () => {
    }) {
      return loadFps().then((obj) => callback2(obj));
    },
    /**
     * @description
     * Add callback on page load
     *
     * @param {function():void } callback - Callback function executed on page load
     *
     * @example
     * ```js
     *
     * core.useLoad(() => {
     *     // code
     * });
     *
     * ```
     */
    useLoad(callback2 = () => {
    }) {
      return handleLoad(callback2);
    },
    /**
     * @description
     * Add callback on resize using a debounce function.
     *
     * @param {function(import('./events/resizeUtils/handleResize.js').handleResizeTypes):void } callback - callback function fired on resize.
     *
     * @example
     * ```js
     * core.useResize(
     *     ({
     *         documentHeight,
     *         horizontalResize,
     *         scrollY,
     *         verticalResize,
     *         windowsHeight,
     *         windowsWidth,
     *     }) => {
     *         // code
     *     }
     * );
     *
     * ```
     */
    useResize(callback2 = () => {
    }) {
      return handleResize(callback2);
    },
    /**
     * @description
     * Add callback on resize using a debounce function.
     *
     * @param {function(import('./events/visibilityChange/handleVisibilityChange.js').visibilityChangeTYpe):void } callback - callback function fired on tab change.
     *
     * @example
     * ```js
     *  const unsubscribe = core.useVisibilityChange(({ visibilityState }) => {
     *      // code
     *  });
     *
     *  unsubscribe();
     *
     * ```
     */
    useVisibilityChange(callback2 = () => {
    }) {
      return handleVisibilityChange(callback2);
    },
    /**
     * @description
     * Add callback on mouse click
     *
     * @param {function(import('./events/mouseUtils/handleMouse.js').mouseType):void } callback - callback function fired on mouse click.
     *
     * @example
     * ```js
     * const unsubscribe = core.useMouseClick(
     *     ({ client, page, preventDefault, target, type }) => {
     *         // code
     *     }
     * );
     *
     * unsubscribe();
     *
     * ```
     */
    useMouseClick(callback2 = () => {
    }) {
      return handleMouseClick(callback2);
    },
    /**
     * @description
     * Add callback on mouse down
     *
     * @param {function(import('./events/mouseUtils/handleMouse.js').mouseType):void } callback - callback function fired on mouse down.
     *
     * @example
     * ```js
     * const unsubscribe = core.useMouseDown(
     *     ({ client, page, preventDefault, target, type }) => {
     *         // code
     *     }
     * );
     *
     * unsubscribe();
     *
     * ```
     */
    useMouseDown(callback2 = () => {
    }) {
      return handleMouseDown(callback2);
    },
    /**
     * @description
     * Add callback on touch start
     *
     * @param {function(import('./events/mouseUtils/handleMouse.js').mouseType):void } callback - callback function fired on mouse touch start.
     *
     * @example
     * ```js
     * const unsubscribe = core.useTouchStart(
     *     ({ client, page, preventDefault, target, type }) => {
     *         // code
     *     }
     * );
     *
     * unsubscribe();
     *
     * ```
     */
    useTouchStart(callback2 = () => {
    }) {
      return handleTouchStart(callback2);
    },
    /**
     * @description
     * Add callback on mouse move
     *
     * @param {function(import('./events/mouseUtils/handleMouse.js').mouseType):void } callback - callback function fired on mouse move.
     *
     * @example
     * ```js
     * const unsubscribe = core.useMouseMove(
     *     ({ client, page, preventDefault, target, type }) => {
     *         // code
     *     }
     * );
     *
     * unsubscribe();
     *
     * ```
     */
    useMouseMove(callback2 = () => {
    }) {
      return handleMouseMove(callback2);
    },
    /**
     * @description
     * Add callback on touch move
     *
     * @param {function(import('./events/mouseUtils/handleMouse.js').mouseType):void } callback - callback function fired on touch move.
     *
     * @example
     * ```js
     * const unsubscribe = core.useTouchMove(
     *     ({ client, page, preventDefault, target, type }) => {
     *         // code
     *     }
     * );
     *
     * unsubscribe();
     *
     * ```
     */
    useTouchMove(callback2 = () => {
    }) {
      return handleTouchMove(callback2);
    },
    /**
     * @description
     * Add callback on mouse up
     *
     * @param {function(import('./events/mouseUtils/handleMouse.js').mouseType):void } callback - callback function fired on mouse up.
     *
     * @example
     * ```js
     * const unsubscribe = core.useMouseUp(
     *     ({ client, page, preventDefault, target, type }) => {
     *         // code
     *     }
     * );
     *
     * unsubscribe();
     *
     * ```
     */
    useMouseUp(callback2 = () => {
    }) {
      return handleMouseUp(callback2);
    },
    /**
     * @description
     * Add callback on touch end.
     *
     * @param {function(import('./events/mouseUtils/handleMouse.js').mouseType):void } callback - callback function fired on touch end.
     *
     * @example
     * ```js
     * const unsubscribe = core.useTouchEnd(
     *     ({ client, page, preventDefault, target, type }) => {
     *         // code
     *     }
     * );
     *
     * unsubscribe();
     *
     * ```
     */
    useTouchEnd(callback2 = () => {
    }) {
      return handleTouchEnd(callback2);
    },
    /**
     * @description
     * Add callback on mouse wheel.
     *
     * @param {function(import('./events/mouseUtils/handleMouse.js').mouseType & import('./events/mouseUtils/handleMouse.js').mouseWheelType):void } callback - callback function fired on mouse wheel.
     *
     * @example
     * ```js
     * const unsubscribe = core.useMouseWheel(
     *     ({
     *         client,
     *         page,
     *         preventDefault,
     *         target,
     *         type,
     *         pixelX,
     *         pixelY,
     *         spinX,
     *         spinY,
     *     }) => {
     *         // code
     *     }
     * );
     *
     * unsubscribe();
     *
     * ```
     */
    useMouseWheel(callback2 = () => {
    }) {
      return handleMouseWheel(callback2);
    },
    /**
     * @description
     * Perform a callback to the first nextTick available after scrolling
     *
     * @param {function(import('./events/scrollUtils/handleScrollImmediate.js').handleScrollType):void } callback - callback function
     * @return {Function} unsubscribe callback
     *
     * @example
     * ```js
     * const unsubscribe = core.useScroll(({ direction, scrollY }) => {
     *     // code
     * });
     *
     * unsubscribe();
     *
     * ```
     */
    useScroll(callback2 = () => {
    }) {
      return handleScroll(callback2);
    },
    /**
     * @description
     * Execute a callback immediately on scroll
     *
     * @param {function(import('./events/scrollUtils/handleScrollImmediate.js').handleScrollType):void } callback - callback function
     * @return {Function} unsubscribe callback
     *
     * @example
     * ```js
     * const unsubscribe = core.useScrollImmediate(({ direction, scrollY }) => {
     *     // code
     * });
     *
     * unsubscribe();
     *
     * ```
     */
    useScrollImmediate(callback2 = () => {
    }) {
      return handleScrollImmediate(callback2);
    },
    /**
     * @description
     * Performs a scroll callback using a throttle function
     *
     * @param {function(import('./events/scrollUtils/handleScrollImmediate.js').handleScrollType):void } callback - callback function
     * @return {Function} unsubscribe callback
     *
     * @example
     * ```js
     * const unsubscribe = core.useScrollThrottle(({ direction, scrollY }) => {
     *    // code
     * });
     *
     * unsubscribe();
     *
     * To change the duration of the throttle, change the value of the throttle property to the defaults:
     *
     *
     * core.setDefault({throttle: 500});
     *
     * ```
     */
    useScrollThrottle(callback2 = () => {
    }) {
      return handleScrollThrottle(callback2);
    },
    /**
     * @description
     * Execute a callback at the beginning of the scroll
     *
     * @param {function(import('./events/scrollUtils/handleScrollUtils').handleScrollUtilsType):void } callback - callback function
     * @return {Function} unsubscribe callback
     *
     * @example
     * ```js
     * const unsubscribe = core.useScrollStart(({ scrollY }) => {
     *     // code
     * });
     *
     * unsubscribe();
     *
     * ```
     */
    useScrollStart(callback2 = () => {
    }) {
      return handleScrollStart(callback2);
    },
    /**
     * @description
     * Execute a callback at the end of the scroll
     *
     * @param {function(import('./events/scrollUtils/handleScrollUtils').handleScrollUtilsType):void } callback - callback function
     * @return {Function} unsubscribe callback
     *
     * @example
     * ```js
     * const unsubscribe = core.useScrollEnd(({ scrollY }) => {
     *     // code
     * });
     *
     * unsubscribe()
     *
     * ```
     */
    useScrollEnd(callback2 = () => {
    }) {
      return handleScrollEnd(callback2);
    },
    /**
     * @param { import('./utils/mediaManager.js').mqType } action
     * @param { import('./utils/mediaManager.js').breackPointType } breackpoint
     *
     * @return {(Boolean|Number)} Returns a boolean value if the action value is equal to 'min' or 'max', returns a numeric value if it is equal to 'get'
     *
     * @description
     *
     * @example
     *
     * ```js
     *   Property schema:
     *   core.mq([String], [string])
     *
     *   const isDesktop = core.mq('min', 'desktop'); // true/false
     *   const isMobile = core.mq('max', 'desktop'); // true/false
     *   const desktopBreackPoint = core.mq('get', 'desktop'); // 992
     *
     *
     *
     * ```
     **/
    mq(action = "", breackpoint) {
      switch (action) {
        case "min":
          return mq.min(breackpoint);
        case "max":
          return mq.max(breackpoint);
        case "get":
          return mq.getBreackpoint(breackpoint);
        default:
          console.warn(`${action} in core.mq not exist`);
      }
    }
  };

  // src/js/mobbu/animation/tween/tweenConfig.js
  var tweenConfig = {
    [easeReference.easeLinear]: (elapsed, initialValue, amountOfChange, duration) => {
      return amountOfChange * elapsed / duration + initialValue;
    },
    [easeReference.easeInQuad]: (elapsed, initialValue, amountOfChange, duration) => {
      return amountOfChange * (elapsed /= duration) * elapsed + initialValue;
    },
    [easeReference.easeOutQuad]: (elapsed, initialValue, amountOfChange, duration) => {
      return -amountOfChange * (elapsed /= duration) * (elapsed - 2) + initialValue;
    },
    [easeReference.easeInOutQuad]: (elapsed, initialValue, amountOfChange, duration) => {
      if ((elapsed /= duration / 2) < 1) {
        return amountOfChange / 2 * elapsed * elapsed + initialValue;
      }
      return -amountOfChange / 2 * (--elapsed * (elapsed - 2) - 1) + initialValue;
    },
    [easeReference.easeInCubic]: (elapsed, initialValue, amountOfChange, duration) => {
      return amountOfChange * (elapsed /= duration) * elapsed * elapsed + initialValue;
    },
    [easeReference.easeOutCubic]: (elapsed, initialValue, amountOfChange, duration) => {
      return amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * elapsed + 1) + initialValue;
    },
    [easeReference.easeInOutCubic]: (elapsed, initialValue, amountOfChange, duration) => {
      if ((elapsed /= duration / 2) < 1) {
        return amountOfChange / 2 * elapsed * elapsed * elapsed + initialValue;
      }
      return amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed + 2) + initialValue;
    },
    [easeReference.easeInQuart]: (elapsed, initialValue, amountOfChange, duration) => {
      return amountOfChange * (elapsed /= duration) * elapsed * elapsed * elapsed + initialValue;
    },
    [easeReference.easeOutQuart]: (elapsed, initialValue, amountOfChange, duration) => {
      return -amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * elapsed * elapsed - 1) + initialValue;
    },
    [easeReference.easeInOutQuart]: (elapsed, initialValue, amountOfChange, duration) => {
      if ((elapsed /= duration / 2) < 1) {
        return amountOfChange / 2 * elapsed * elapsed * elapsed * elapsed + initialValue;
      }
      return -amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed * elapsed - 2) + initialValue;
    },
    [easeReference.easeInQuint]: (elapsed, initialValue, amountOfChange, duration) => {
      return amountOfChange * (elapsed /= duration) * elapsed * elapsed * elapsed * elapsed + initialValue;
    },
    [easeReference.easeOutQuint]: (elapsed, initialValue, amountOfChange, duration) => {
      return amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * elapsed * elapsed * elapsed + 1) + initialValue;
    },
    [easeReference.easeInOutQuint]: (elapsed, initialValue, amountOfChange, duration) => {
      if ((elapsed /= duration / 2) < 1) {
        return amountOfChange / 2 * elapsed * elapsed * elapsed * elapsed * elapsed + initialValue;
      }
      return amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed * elapsed * elapsed + 2) + initialValue;
    },
    [easeReference.easeInSine]: (elapsed, initialValue, amountOfChange, duration) => {
      return -amountOfChange * Math.cos(elapsed / duration * (Math.PI / 2)) + amountOfChange + initialValue;
    },
    [easeReference.easeOutSine]: (elapsed, initialValue, amountOfChange, duration) => {
      return amountOfChange * Math.sin(elapsed / duration * (Math.PI / 2)) + initialValue;
    },
    [easeReference.easeInOutSine]: (elapsed, initialValue, amountOfChange, duration) => {
      return -amountOfChange / 2 * (Math.cos(Math.PI * elapsed / duration) - 1) + initialValue;
    },
    [easeReference.easeInExpo]: (elapsed, initialValue, amountOfChange, duration) => {
      return elapsed === 0 ? initialValue : amountOfChange * Math.pow(2, 10 * (elapsed / duration - 1)) + initialValue;
    },
    [easeReference.easeOutExpo]: (elapsed, initialValue, amountOfChange, duration) => {
      return elapsed === duration ? initialValue + amountOfChange : amountOfChange * (-Math.pow(2, -10 * elapsed / duration) + 1) + initialValue;
    },
    [easeReference.easeInOutExpo]: (elapsed, initialValue, amountOfChange, duration) => {
      if (elapsed === 0) {
        return initialValue;
      }
      if (elapsed === duration) {
        return initialValue + amountOfChange;
      }
      if ((elapsed /= duration / 2) < 1) {
        return amountOfChange / 2 * Math.pow(2, 10 * (elapsed - 1)) + initialValue;
      }
      return amountOfChange / 2 * (-Math.pow(2, -10 * --elapsed) + 2) + initialValue;
    },
    [easeReference.easeInCirc]: (elapsed, initialValue, amountOfChange, duration) => {
      return -amountOfChange * (Math.sqrt(1 - (elapsed /= duration) * elapsed) - 1) + initialValue;
    },
    [easeReference.easeOutCirc]: (elapsed, initialValue, amountOfChange, duration) => {
      return amountOfChange * Math.sqrt(1 - (elapsed = elapsed / duration - 1) * elapsed) + initialValue;
    },
    [easeReference.easeInOutCirc]: (elapsed, initialValue, amountOfChange, duration) => {
      if ((elapsed /= duration / 2) < 1) {
        return -amountOfChange / 2 * (Math.sqrt(1 - elapsed * elapsed) - 1) + initialValue;
      }
      return amountOfChange / 2 * (Math.sqrt(1 - (elapsed -= 2) * elapsed) + 1) + initialValue;
    },
    [easeReference.easeInElastic]: (elapsed, initialValue, amountOfChange, duration) => {
      let s = 1.70158;
      let p = 0;
      let a = amountOfChange;
      if (elapsed === 0) {
        return initialValue;
      }
      if ((elapsed /= duration) === 1) {
        return initialValue + amountOfChange;
      }
      if (!p) {
        p = duration * 0.3;
      }
      if (a < Math.abs(amountOfChange)) {
        a = amountOfChange;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
      }
      return -(a * Math.pow(2, 10 * (elapsed -= 1)) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p)) + initialValue;
    },
    [easeReference.easeOutElastic]: (elapsed, initialValue, amountOfChange, duration) => {
      let s = 1.70158;
      let p = 0;
      let a = amountOfChange;
      if (elapsed === 0) {
        return initialValue;
      }
      if ((elapsed /= duration) === 1) {
        return initialValue + amountOfChange;
      }
      if (!p) {
        p = duration * 0.3;
      }
      if (a < Math.abs(amountOfChange)) {
        a = amountOfChange;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
      }
      return a * Math.pow(2, -10 * elapsed) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p) + amountOfChange + initialValue;
    },
    [easeReference.easeInOutElastic]: (elapsed, initialValue, amountOfChange, duration) => {
      let s = 1.70158;
      let p = 0;
      let a = amountOfChange;
      if (elapsed === 0) {
        return initialValue;
      }
      if ((elapsed /= duration / 2) === 2) {
        return initialValue + amountOfChange;
      }
      if (!p) {
        p = duration * (0.3 * 1.5);
      }
      if (a < Math.abs(amountOfChange)) {
        a = amountOfChange;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
      }
      if (elapsed < 1) {
        return -0.5 * (a * Math.pow(2, 10 * (elapsed -= 1)) * Math.sin(
          (elapsed * duration - s) * (2 * Math.PI) / p
        )) + initialValue;
      }
      return a * Math.pow(2, -10 * (elapsed -= 1)) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p) * 0.5 + amountOfChange + initialValue;
    },
    [easeReference.easeInBack]: (elapsed, initialValue, amountOfChange, duration, s = 1.70158) => {
      return amountOfChange * (elapsed /= duration) * elapsed * ((s + 1) * elapsed - s) + initialValue;
    },
    [easeReference.easeOutBack]: (elapsed, initialValue, amountOfChange, duration, s = 1.70158) => {
      return amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * ((s + 1) * elapsed + s) + 1) + initialValue;
    },
    easeInOutBack: (elapsed, initialValue, amountOfChange, duration, s = 1.70158) => {
      if ((elapsed /= duration / 2) < 1) {
        return amountOfChange / 2 * (elapsed * elapsed * (((s *= 1.525) + 1) * elapsed - s)) + initialValue;
      }
      return amountOfChange / 2 * ((elapsed -= 2) * elapsed * (((s *= 1.525) + 1) * elapsed + s) + 2) + initialValue;
    },
    [easeReference.easeInBounce]: (elapsed, initialValue, amountOfChange, duration) => {
      return amountOfChange - tweenConfig[easeReference.easeOutBounce](
        duration - elapsed,
        0,
        amountOfChange,
        duration
      ) + initialValue;
    },
    [easeReference.easeOutBounce]: (elapsed, initialValue, amountOfChange, duration) => {
      if ((elapsed /= duration) < 1 / 2.75) {
        return amountOfChange * (7.5625 * elapsed * elapsed) + initialValue;
      } else if (elapsed < 2 / 2.75) {
        return amountOfChange * (7.5625 * (elapsed -= 1.5 / 2.75) * elapsed + 0.75) + initialValue;
      } else if (elapsed < 2.5 / 2.75) {
        return amountOfChange * (7.5625 * (elapsed -= 2.25 / 2.75) * elapsed + 0.9375) + initialValue;
      } else {
        return amountOfChange * (7.5625 * (elapsed -= 2.625 / 2.75) * elapsed + 0.984375) + initialValue;
      }
    },
    [easeReference.easeInOutBounce]: (elapsed, initialValue, amountOfChange, duration) => {
      if (elapsed < duration / 2) {
        return tweenConfig[easeReference.easeInBounce](
          elapsed * 2,
          0,
          amountOfChange,
          duration
        ) * 0.5 + initialValue;
      }
      return tweenConfig[easeReference.easeOutBounce](
        elapsed * 2 - duration,
        0,
        amountOfChange,
        duration
      ) * 0.5 + amountOfChange * 0.5 + initialValue;
    }
  };

  // src/js/mobbu/animation/utils/callbacks/callBackStore.js
  var callBackStore = new SimpleStore({ id: 0 });

  // src/js/main.js
  core.useLoad(() => {
    core.setDefault({
      deferredNextTick: true,
      useScaleFps: true,
      mq: {
        desktop: 1024
      },
      spring: {
        config: {
          customSpring: {
            friction: 1,
            mass: 1,
            precision: 0.01,
            tension: 180,
            velocity: 0
          }
        }
      }
    });
    core.printDefault();
  });
})();
