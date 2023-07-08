// @ts-check

import { checkType, TYPE_IS_ANY, storeType, UNTYPED } from './storeType.js';

import {
    maxDepth,
    inizializeStoreData,
    inizializeSpecificProp,
} from './storeUtils.js';
import {
    storeComputedKeyUsedWarning,
    storeComputedWarning,
    storeEmitWarning,
    storeGetPropWarning,
    storeObjectIsNotAnyWarning,
    storeSetObjDepthWarning,
    storeSetObjectPropWarning,
    storeSetObjectValWarning,
    storeSetObjKeysWarning,
    storeSetObjTypeWarning,
    storeSetPropPropWarning,
    storeSetPropTypeWarning,
    storeSetPropValWarning,
    storeSetWarning,
    storeWatchWarning,
} from './storeWarining.js';

/**
 * @typedef {('String'|'Number'|'Object'|'Function'|'Array'|'Boolean'|'Element'|'NodeList'|'Any')} SimpleStoreUsableType
 */

/**
 * @typedef {(Number|String|Function|'FUNCTION'|Array|Boolean|Element|NodeList)} SimpleStoreBasicValues
 */

/**
 * @typedef {function():{value:any,type?:SimpleStoreUsableType,validate?:function(any,any):Boolean,strict?:Boolean,skipEqual?:Boolean}} SimpleStoreTypeBase
 */

/**
 * @typedef {Object<string,( SimpleStoreTypeBase|SimpleStoreBasicValues|Object<string,( SimpleStoreTypeBase|SimpleStoreBasicValues)>)>} SimpleStoreType
 */

export class SimpleStore {
    /**
     * @param {SimpleStoreType} data
     *
     * @description
     * SimpleStore inizialization.
     * The store accepts single properties or objects
       Each individual property can be initialized with a simple value or via a more complex setup.
       A complex set-up is created through a function that must return an object with the property `value` and at least one of the following properties:
       `type` || `validation` || `skipEqual` || `strict`
     *
      `value`:
       Initial value.

      `type`:
       Supported types:
      `String|Number|Object|Function|Array|Boolean|Element|NodeList|"Any"`.
       The property will not be updated if it doesn't match, you will have a waring.
       Support Contructor || String.
       Es: type: Number || type: 'Number'

       `validation`:
       Validation function to parse value.
       This function will have the current value and old value as input parameter and will return a boolean value.
       The validation status of each property will be displayed in the watchers and will be retrievable using the getValidation() method.

       `strict`:
       If set to true, the validation function will become blocking and the property will be updated only if the validation function is successful.
       THe default value is `false`.

       `skipEqual`:
       If the value is equal to the previous one, the property will not be updated. The watches will not be executed and the property will have no effect on the computed related to it.
       The default value is `true`.
     *
     *
     *
     * @example
     * ```javascript
     *
     * const myStore = new SimpleStore({
     *     prop1: 0,
     *     prop2: 0
     * });
     *
     *
     * const myStore = new SimpleStore({
     *     myProp: () => ({
     *         value: 10,
     *         type: Number,
     *         validate: (val, oldVal) => val < 10,
     *         strict: true,
     *         skipEqual: false,
     *     }),
     *     myPropWithObject: () => ({
     *         value: { prop: { prop1: 1}},
     *         type: 'Any',
     *     }),
     *     myObject: {
     *         prop1: () => ({
     *             value: 0,
     *             type: Number,
     *             validate: (val, oldVal) => val < 10,
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
        /**
         * @type {String}
         */
        this.logStyle = 'padding: 10px;';

        /**
         * @private
         *
         * @type {Number}
         *
         * @description
         * Subscriber id counter
         */
        this.counterId = 0;

        /**
         * @private
         *
         * @type {Array.<{prop:String,fn:Function,id:Number}>}
         *
         * @description
         * Callback store
         */
        this.callBackWatcher = [];

        /**
         * @private
         *
         * @type {Array.<{prop:String,fn:Function,keys:Array.<string>}>}
         *
         * @description
         * Callback store
         */
        this.callBackComputed = [];

        /**
         * @private
         *
         * @type {Object<string,(Boolean|Object<string,Boolean>)>}
         *
         * @description
         * Object that store calidation status for each props
         */
        this.validationStatusObject = {};

        /**
         * @private
         *
         * @type {Number}
         *
         * @description
         * Depth of initial data object
         */
        this.dataDepth = maxDepth(data);

        /**
         * @private
         *
         * @type {Array.<String>}
         * @description
         * Computed propierties update in tick.
         */
        this.computedPropFired = [];

        /**
         * @private
         *
         * @type {Array.<String>}
         *
         * Queque of props changed.
         * Compued use this queque for checking mutation
         */
        this.computedWaitList = [];

        /**
         * @private
         *
         * @type {Boolean}
         *
         * @description
         * Next tick ( settimeout 0 ) is fired.
         */
        this.computedRunning = false;

        /**
         * @private
         *
         *
         * @description
         * Main Object that store the value of each props/Object.
         * Max depth allowed is 2.
         */
        this.store = inizializeStoreData({
            data,
            depth: this.dataDepth,
            logStyle: this.logStyle,
        });

        /**
         * @private
         *
         * @type {Object<string,(Object<string,any>|any)>}
         *
         * @description
         * Main Object that store the type of each props.
         * Max depth allowed is 2.
         */
        this.type = inizializeSpecificProp({
            data,
            prop: 'type',
            depth: this.dataDepth,
            logStyle: this.logStyle,
            fallback: UNTYPED,
        });

        /**
         * @private
         *
         * @type {Object<string,(Object<string,Function>|Function)>}
         *
         * @description
         * Main Object that store the validate function for every prop.
         * Max depth allowed is 2.
         */
        this.fnValidate = inizializeSpecificProp({
            data,
            prop: 'validate',
            depth: this.dataDepth,
            logStyle: this.logStyle,
            fallback: () => true,
        });

        /**
         * @private
         *
         * @type {Object<string,(Object<string,Boolean>|Boolean)>}
         *
         * @description
         * Main Object that store the strict state of each prop.
         * Max depth allowed is 2.
         */
        this.strict = inizializeSpecificProp({
            data,
            prop: 'strict',
            depth: this.dataDepth,
            logStyle: this.logStyle,
            fallback: false,
        });

        /**
         * @private
         *
         * @type {Object<string,(Object<string,Boolean>|Boolean)>}
         *
         * @description
         * Main Object that store the skipEqual state.
         * Max depth allowed is 2.
         */
        this.skipEqual = inizializeSpecificProp({
            data,
            prop: 'skipEqual',
            depth: this.dataDepth,
            logStyle: this.logStyle,
            fallback: true,
        });

        this.inizializeValidation();
    }

    /**
     * @private
     *
     * @description
     * Inizialize validation status for each prop.
     */
    inizializeValidation() {
        /**
         * Inizialize empty Object if prop is an object.
         */
        for (const key in this.store) {
            if (storeType.isObject(this.store[key]))
                this.validationStatusObject[key] = {};
        }

        /**
         * First run execute each propierites to check validation without fire event
         */
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
                    fn: computedFn,
                } = item;

                /**
                 * I'm getting the list of all the store keys
                 */
                const storeKeys = Object.keys(this.store);

                /**
                 * I check that all keys to monitor in computed exist in the store*
                 */
                const propsShouldChangeIsInStore = propsShouldChange.every(
                    (item) => storeKeys.includes(item)
                );

                /**
                 * If one of the keys to monitor does not exist in the store, I interrupt.
                 */
                if (!propsShouldChangeIsInStore) {
                    storeComputedWarning(
                        propsShouldChange,
                        propToUpdate,
                        this.logStyle
                    );
                    return;
                }

                /**
                 * I check that the incoming prop is a computed dependency
                 * It is the key control that triggers the computed
                 */
                const propChangedIsDependency =
                    propsShouldChange.includes(propChanged);

                if (!propChangedIsDependency) return;

                /**
                 * I take the value of each property given the key
                 */
                const propValues = propsShouldChange.map((item) => {
                    return this.store[item];
                });

                /**
                 * I generate the value from the callback function to pass to the
                 * setters to update the prop
                 */

                const shouldFire =
                    !this.computedPropFired.includes(propToUpdate);

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
        if (!this.callBackComputed.length) return;

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
     * ```javascript
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
        /**
         * Check if prop exist in store
         */
        if (!(prop in this.store)) {
            storeSetWarning(prop, this.logStyle);
            return;
        }

        /**
         * Check if newValue is a param or function.
         * Id prop type is a function or last value is a function skip.
         */
        const value =
            checkType(Function, newValue) &&
            !checkType(Function, this.store[prop]) &&
            this.type[prop] !== Function
                ? newValue(this.store[prop])
                : newValue;

        /**
         * Check if is an Object to stringyFy ( default is max depth === 2 )
         */
        const isCustomObject = this.type[prop] === TYPE_IS_ANY;

        if (storeType.isObject(this.store[prop]) && !isCustomObject) {
            this.setObj(prop, value, fireCallback);
        } else {
            this.setProp(prop, value, fireCallback);
        }
    }

    /**
     * @private
     *
     * @param {String} prop - propierties to update
     * @param {any} val - new value
     * @param {Boolean} fireCallback - fire watcher callback on update,  default value is `true`
     *
     * @description
     * Update non-object propierties
     *
     * @example
     * ```javascript
     * myStore.setProp('myProp', newValue, true);
     *
     * ```
     */
    setProp(prop, val, fireCallback = true) {
        const isCustomObject = this.type[prop] === TYPE_IS_ANY;

        /**
         * Check if val is an Object
         */
        if (storeType.isObject(val) && !isCustomObject) {
            storeSetPropValWarning(prop, val, this.logStyle);
            return;
        }

        /**
         * Check if prop is an Object
         */
        if (storeType.isObject(this.store[prop]) && !isCustomObject) {
            storeSetPropPropWarning(prop, this.logStyle);
            return;
        }

        const isValidType = checkType(this.type[prop], val);
        if (!isValidType) {
            storeSetPropTypeWarning(prop, val, this.type[prop], this.logStyle);
            return;
        }

        /**
         * Update value and fire callback associated
         */
        const oldVal = this.store[prop];

        /**
         * Get validate status
         */
        const isValidated = /** @type {Object<string,Function>} */ (
            this.fnValidate
        )[prop]?.(val, oldVal);

        /**
         * In strict mode return is prop is not valid
         */
        if (this.strict[prop] && !isValidated) return;

        /**
         * Update validation array.
         */
        this.validationStatusObject[prop] = isValidated;

        /**
         * Check if last value is equal new value.
         * if true and skipEqual is true for this prop return.
         */
        const isEqual = isCustomObject
            ? JSON.stringify(oldVal) === JSON.stringify(val)
            : oldVal === val;

        if (isEqual && this.skipEqual[prop]) return;

        /**
         * Finally set new value
         */
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
     * @param {any} val - new value
     * @param {Boolean} fireCallback - fire watcher callback on update,  default value is `true`
     *
     * @description
     * Update object propierties
     *
     * @example
     * ```javascript
     * myStore.set('myPropObject', { myProp: newValue, ... }, true);
     *
     * ```
     */
    setObj(prop, val, fireCallback = true) {
        /**
         * Check if val is not an Object
         */
        if (!storeType.isObject(val)) {
            storeSetObjectValWarning(prop, val, this.logStyle);
            return;
        }

        /**
         * Check if prop is not an Object
         */
        if (!storeType.isObject(this.store[prop])) {
            storeSetObjectPropWarning(prop, this.logStyle);
            return;
        }

        /**
         * Check if prop has val keys
         */
        const valKeys = Object.keys(val);
        const propKeys = Object.keys(this.store[prop]);
        const hasKeys = valKeys.every((item) => propKeys.includes(item));
        if (!hasKeys) {
            storeSetObjKeysWarning(valKeys, prop, this.logStyle);
            return;
        }

        // Check type of each propierties
        const isValidType = Object.entries(val)
            .map((item) => {
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
            })
            .every((item) => item === true);

        if (!isValidType) {
            return;
        }

        /**
         * Filter all props that pass the strict check.
         */
        const strictObjectResult = Object.entries(val)
            .map((item) => {
                const [subProp, subVal] = item;
                const subValOld = this.store[prop][subProp];

                return this.strict[prop][subProp]
                    ? {
                          strictCheck: this.fnValidate[prop][subProp]?.(
                              subVal,
                              subValOld
                          ),
                          item,
                      }
                    : { strictCheck: true, item };
            })
            .filter(({ strictCheck }) => strictCheck === true);

        /**
         * If all Object prop fail strict check return
         */
        const allStrictFail = strictObjectResult.length === 0;
        if (allStrictFail) return;

        /**
         * Get new Object with only validate and strick passed
         */
        const newValParsedByStrict = strictObjectResult
            .map(({ item }) => item)
            .reduce((acc, [key, val]) => ({ ...acc, ...{ [key]: val } }), {});

        /**
         * Validate value (value passed to setObj is a Object to merge with original) and store the result in validationStatusObject arr
         * id there is no validation return true, otherwse get boolean value from fnValidate obj
         */
        Object.entries(newValParsedByStrict).forEach((item) => {
            const [subProp, subVal] = item;
            const subValOld = this.store[prop][subProp];

            const validateResult = this.fnValidate[prop][subProp]?.(
                subVal,
                subValOld
            );
            if (validateResult === undefined) {
                storeObjectIsNotAnyWarning(this.logStyle, TYPE_IS_ANY);
            }

            this.validationStatusObject[prop][subProp] = validateResult;
        });

        /**
         * Update value and fire callback associated
         */
        const oldObjectValues = this.store[prop];
        const newObjectValues = {
            ...this.store[prop],
            ...newValParsedByStrict,
        };

        /**
         * Check if all modified prop have skipEqual = true;
         */
        const shouldSkipEqual = Object.keys(newValParsedByStrict).every(
            (subProp) => this.skipEqual[prop][subProp] === true
        );

        /**
         * Check if all old props value is equal new props value.
         */
        const prevValueIsEqualNew = Object.entries(newObjectValues).every(
            ([key, value]) => {
                const isCustomObject = this.type[prop][key] === TYPE_IS_ANY;

                /**
                 * Check val have nested Object
                 */
                const dataDepth = maxDepth(value);
                if (dataDepth > 1 && !isCustomObject) {
                    storeSetObjDepthWarning(prop, val, this.logStyle);
                    return;
                }

                return isCustomObject
                    ? JSON.stringify(value) ===
                          JSON.stringify(oldObjectValues[key])
                    : value === oldObjectValues[key];
            }
        );

        /**
         * If shouldSkipEqual = true and previous object is equal new object return.
         * If at least one modified property of the object has skipEqual set to false
         * then the entire object is considered mutated even if all values are equal
         */
        if (shouldSkipEqual && prevValueIsEqualNew) return;

        /**
         * Finally update Object.
         */
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
     * @param {String} prop - propierties to update
     * @param {any} val - new value
     *
     * @description
     * Update a parameter omitting any type of control, method for internal use for maximum responsiveness.et prop without
     */
    quickSetProp(prop, val) {
        /**
         * Update value and fire callback associated
         */
        const oldVal = this.store[prop];

        /**
         * Finally set new value
         */
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
     * ```javascript
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
     * ```javascript
     * const myProp = myStore.get('myProp');
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
     * ```javascript
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
     * @param {function(any,any,(boolean|object)):void} callback - callback Function, fired on prop value change
     * @returns {function():void} unsubscribe function
     *
     * @description
     * Watch property mutation
     *
     * @example
     * ```javascript
     *
     * const unsubscribe =  myStore.watch('myProp', (newVal, oldVal, validate) => {
     *      // code
     * })
     * unsubscribe();
     *
     *
     * ```
     */
    watch(prop, callback = () => {}) {
        if (!(prop in this.store)) {
            storeWatchWarning(prop, this.logStyle);
            return () => {};
        }

        this.callBackWatcher.push({
            prop,
            fn: callback,
            id: this.counterId,
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
     * ```javascript
     * myStore.emit('myProp');
     * ```
     */
    emit(prop) {
        if (prop in this.store) {
            const fnByProp = this.callBackWatcher.filter(
                (item) => item.prop === prop
            );
            fnByProp.forEach((item) => {
                // Val , OldVal, Validate
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
     * @param {String} string
     * @returns void
     *
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
     * ```javascript
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
        // Create a temp array with the future computed added to check
        const tempComputedArray = [
            ...this.callBackComputed,
            ...[{ prop, keys, fn }],
        ];

        // Get all prop stored in tempComputedArray
        const propList = tempComputedArray.map((item) => item.prop).flat();

        //  Keys can't be a prop used in some computed
        const keysIsusedInSomeComputed = propList.some((item) =>
            keys.includes(item)
        );

        /**
         * if - Key to watch can't be a prop used in some computed to avoid infinite loop
         *
         * @param  {Boolean} keysIsusedInSomeComputed
         * @return {void}
         */
        if (keysIsusedInSomeComputed) {
            storeComputedKeyUsedWarning(keys, this.logStyle);
            return;
        }

        this.callBackComputed.push({
            prop,
            keys,
            fn,
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
}
