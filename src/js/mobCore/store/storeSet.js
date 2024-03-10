// @ts-check

import { useNextLoop } from '../utils/nextTick';
import { checkEquality } from './classVersion/checkEquality';
import { runCallbackQueqe } from './fireQueque';
import { getLogStyle } from './logStyle';
import { getFormMainMap, updateMainMap } from './storeMap';
import { checkType, storeType, TYPE_IS_ANY } from './storeType';
import { cloneValueOrGet, maxDepth } from './storeUtils';
import {
    storeComputedKeyUsedWarning,
    storeComputedWarning,
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
} from './storeWarining';

/**
 * ----------------------------
 *  SET
 * -------------------------
 */

/**
 * @param {string} instanceId
 * @param {import("./type").storeMapValue} state
 * @param {string} prop
 * @param {any} val
 * @param {boolean} fireCallback
 * @returns {import("./type").storeMapValue|undefined}
 */
const setProp = (instanceId, state, prop, val, fireCallback = true) => {
    const {
        type,
        store,
        fnValidate,
        strict,
        validationStatusObject,
        skipEqual,
        callBackWatcher,
    } = state;
    const logStyle = getLogStyle();

    const isCustomObject = type[prop] === TYPE_IS_ANY;

    /**
     * Check if val is an Object
     */
    if (storeType.isObject(val) && !isCustomObject) {
        storeSetPropValWarning(prop, val, logStyle);
        return;
    }

    /**
     * Check if prop is an Object
     */
    if (storeType.isObject(store[prop]) && !isCustomObject) {
        storeSetPropPropWarning(prop, logStyle);
        return;
    }

    const isValidType = checkType(type[prop], val);
    if (!isValidType) {
        storeSetPropTypeWarning(prop, val, type[prop], logStyle);
        return;
    }

    /**
     * Update value and fire callback associated
     */
    const oldVal = store[prop];

    /**
     * Get validate status
     */
    const isValidated = /** @type {Object<string,function>} */ (fnValidate)[
        prop
    ]?.(val, oldVal);

    /**
     * In strict mode return is prop is not valid
     */
    if (strict[prop] && !isValidated) return;

    /**
     * Update validation array.
     */
    validationStatusObject[prop] = isValidated;

    /**
     * Check if last value is equal new value.
     * if true and skipEqual is true for this prop return.
     */
    const isEqual = skipEqual[prop]
        ? checkEquality(type[prop], oldVal, val)
        : false;
    if (isEqual) return;

    /**
     * Finally set new value
     */
    store[prop] = val;

    if (fireCallback) {
        runCallbackQueqe({
            callBackWatcher,
            prop,
            newValue: val,
            oldValue: oldVal,
            validationValue: validationStatusObject[prop],
        });
    }

    addToComputedWaitLsit({ instanceId, prop });

    return {
        ...state,
        store,
        validationStatusObject,
    };
};

/**
 * @param {string} instanceId
 * @param {import("./type").storeMapValue} state
 * @param {string} prop
 * @param {any} val
 * @param {boolean} fireCallback
 * @returns {import("./type").storeMapValue|undefined}
 */
const setObj = (instanceId, state, prop, val, fireCallback = true) => {
    const {
        store,
        type,
        strict,
        fnValidate,
        validationStatusObject,
        skipEqual,
        callBackWatcher,
    } = state;
    const logStyle = getLogStyle();

    /**
     * Check if val is not an Object
     */
    if (!storeType.isObject(val)) {
        storeSetObjectValWarning(prop, val, logStyle);
        return;
    }

    /**
     * Check if prop is not an Object
     */
    if (!storeType.isObject(store[prop])) {
        storeSetObjectPropWarning(prop, logStyle);
        return;
    }

    /**
     * Check if prop has val keys
     */
    const valKeys = Object.keys(val);
    const propKeys = Object.keys(store[prop]);
    const hasKeys = valKeys.every((item) => propKeys.includes(item));
    if (!hasKeys) {
        storeSetObjKeysWarning(valKeys, prop, logStyle);
        return;
    }

    // Check type of each propierties
    const isValidType = Object.entries(val)
        .map((item) => {
            const [subProp, subVal] = item;
            const typeResponse = checkType(type[prop][subProp], subVal);

            if (!typeResponse) {
                storeSetObjTypeWarning(
                    prop,
                    subProp,
                    subVal,
                    type[prop][subProp],
                    logStyle
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
            const subValOld = store[prop][subProp];

            return strict[prop][subProp]
                ? {
                      strictCheck: fnValidate[prop][subProp]?.(
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
    const newValParsedByStrict = Object.fromEntries(
        strictObjectResult
            .map(({ item }) => item)
            .map(([key, val]) => [key, val])
    );

    /**
     * Validate value (value passed to setObj is a Object to merge with original) and store the result in validationStatusObject arr
     * id there is no validation return true, otherwise get boolean value from fnValidate obj
     */
    Object.entries(newValParsedByStrict).forEach((item) => {
        const [subProp, subVal] = item;
        const subValOld = store[prop][subProp];

        /**
         * If in first level we have an object without the 'Any' type  specified
         * is interpreted like nested object, so fail the fnValidate function if we set a different key with set methods.
         * Because the new key doesn't exist in original object, so log a warning.
         * The only way to use obj is specify 'Any' key to not broke the globe object logic.
         */
        const validateResult = fnValidate[prop][subProp]?.(subVal, subValOld);
        if (validateResult === undefined) {
            storeObjectIsNotAnyWarning(logStyle, TYPE_IS_ANY);
        }

        validationStatusObject[prop][subProp] = validateResult;
    });

    /**
     * Update value and fire callback associated
     */
    const oldObjectValues = store[prop];
    const newObjectValues = {
        ...store[prop],
        ...newValParsedByStrict,
    };

    /**
     * Check if all modified prop have skipEqual = true;
     */
    const shouldSkipEqual = Object.keys(newValParsedByStrict).every(
        (subProp) => skipEqual[prop][subProp] === true
    );

    /**
     * Check if all old props value is equal new props value.
     */
    const prevValueIsEqualNew = shouldSkipEqual
        ? Object.entries(newObjectValues).every(([key, value]) => {
              const isCustomObject = type[prop][key] === TYPE_IS_ANY;

              /**
               * Check val have nested Object ( not 'Any' )
               */
              const dataDepth = maxDepth(value);
              if (dataDepth > 1 && !isCustomObject) {
                  storeSetObjDepthWarning(prop, val, logStyle);
                  return;
              }

              return checkEquality(
                  type[prop][key],
                  oldObjectValues[key],
                  value
              );
          })
        : false;

    /**
     * If shouldSkipEqual = true and previous object is equal new object return.
     * If at least one modified property of the object has skipEqual set to false
     * then the entire object is considered mutated even if all values are equal
     */
    if (prevValueIsEqualNew) return;

    /**
     * Finally update Object.
     */
    store[prop] = newObjectValues;

    if (fireCallback) {
        runCallbackQueqe({
            callBackWatcher,
            prop,
            newValue: store[prop],
            oldValue: oldObjectValues,
            validationValue: validationStatusObject[prop],
        });
    }

    addToComputedWaitLsit({ instanceId, prop });

    return {
        ...state,
        store,
        validationStatusObject,
    };
};

/**
 * @param {import("./type").storeSetAction} params
 * @returns {import("./type").storeMapValue|undefined}
 */
export const storeSetAction = ({
    instanceId,
    state,
    prop,
    value,
    fireCallback = true,
    clone = false,
}) => {
    const { store, type } = state;
    if (!store) return;

    const logStyle = getLogStyle();

    /**
     * Check if prop exist in store
     */
    if (!(prop in store)) {
        storeSetWarning(prop, logStyle);
        return;
    }

    /**
     * Id value is Map or Se or Objectt create a new old value.
     * This is mutable promitives, if it passed by reference mutate the original.
     */
    const previousValue = clone
        ? cloneValueOrGet({ value: store[prop] })
        : store[prop];

    /**
     * Check if newValue is a param or function.
     * Id prop type is a function or last value is a function skip.
     */
    const valueParsed =
        checkType(Function, value) &&
        !checkType(Function, previousValue) &&
        type[prop] !== Function
            ? value(previousValue)
            : value;

    /**
     * Check if is an Object to stringyFy ( default is max depth === 2 )
     */
    const isCustomObject = type[prop] === TYPE_IS_ANY;

    return storeType.isObject(previousValue) && !isCustomObject
        ? setObj(instanceId, state, prop, valueParsed, fireCallback)
        : setProp(instanceId, state, prop, valueParsed, fireCallback);
};

/**
 * @param {import('./type').storeSetEntryPoint} param
 * @returns {void}
 */
export const storeSetEntryPoint = ({
    instanceId,
    prop,
    value,
    fireCallback,
    clone,
}) => {
    const state = getFormMainMap(instanceId);
    if (!state) return;

    const newState = storeSetAction({
        instanceId,
        state,
        prop,
        value,
        fireCallback,
        clone,
    });

    if (!newState) return;
    updateMainMap(instanceId, newState);
};

/**
 * @param {import('./type').storeQuickSetEntryPoint} param
 * @returns {void}
 */
export const storeQuickSetEntrypoint = ({ instanceId, prop, value }) => {
    const state = getFormMainMap(instanceId);
    if (!state) return;

    const { store, callBackWatcher } = state;

    /**
     * Update value and fire callback associated
     */
    const oldVal = store[prop];

    /**
     * Finally set new value
     */
    store[prop] = value;

    runCallbackQueqe({
        callBackWatcher,
        prop,
        newValue: value,
        oldValue: oldVal,
        validationValue: true,
    });

    updateMainMap(instanceId, { ...state, store });
};

/**
 * ----------------------------
 *  COMPUTED
 * -------------------------
 */

/**
 * @param {string} instanceId
 */
const fireComputed = (instanceId) => {
    /**
     * Get fresh data.
     */
    const state = getFormMainMap(instanceId);
    const { computedWaitList, callBackComputed, store, computedPropFired } =
        state;

    computedWaitList.forEach((propChanged) => {
        callBackComputed.forEach((item) => {
            const {
                prop: propToUpdate,
                keys: propsShouldChange,
                fn: computedFn,
            } = item;

            /**
             * I'm getting the list of all the store keys
             */
            const storeKeys = Object.keys(store);

            /**
             * I check that all keys to monitor in computed exist in the store*
             */
            const propsShouldChangeIsInStore = propsShouldChange.every((item) =>
                storeKeys.includes(item)
            );

            /**
             * If one of the keys to monitor does not exist in the store, I interrupt.
             */
            if (!propsShouldChangeIsInStore) {
                storeComputedWarning(
                    propsShouldChange,
                    propToUpdate,
                    getLogStyle()
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
                return store[item];
            });

            /**
             * I generate the value from the callback function to pass to the
             * setters to update the prop
             */
            const shouldFire = !computedPropFired.has(propToUpdate);

            if (shouldFire) {
                const computedValue = computedFn(...propValues);
                storeSetEntryPoint({
                    instanceId,
                    prop: propToUpdate,
                    value: computedValue,
                });
                computedPropFired.add(propToUpdate);
            }
        });
    });

    /**
     * Get last state after new value is settled from computed.
     */
    const stateAfterComputed = getFormMainMap(instanceId);

    /**
     * Update all
     */
    updateMainMap(instanceId, {
        ...stateAfterComputed,
        computedPropFired: new Set(),
        computedWaitList: new Set(),
        computedRunning: false,
    });
};

/**
 * @param {Object} param
 * @param {string} param.instanceId
 * @param {string} param.prop
 * @returns {void}
 */
export const addToComputedWaitLsit = ({ instanceId, prop }) => {
    const state = getFormMainMap(instanceId);
    const { callBackComputed, computedWaitList, computedRunning } = state;

    if (!callBackComputed || callBackComputed.size === 0) return;

    /**
     * Update computedWaitList.
     */
    computedWaitList.add(prop);
    updateMainMap(instanceId, { ...state, computedWaitList });

    if (!computedRunning) {
        const state = getFormMainMap(instanceId);
        updateMainMap(instanceId, { ...state, computedRunning: true });
        useNextLoop(() => fireComputed(instanceId));
    }
};

/**
 * @param {import("./type").storeComputedAction} params
 * @returns {import("./type").storeMapValue|undefined}
 */
export const storeComputedAction = ({ state, prop, keys, fn }) => {
    const { callBackComputed } = state;

    // Create a temp array with the future computed added to check
    const tempComputedArray = [...callBackComputed, { prop, keys, fn }];

    // Get all prop stored in tempComputedArray
    const propList = tempComputedArray.flatMap((item) => item.prop);

    //  Keys can't be a prop used in some computed
    const keysIsusedInSomeComputed = propList.some((item) =>
        keys.includes(item)
    );

    /**
     * if - Key to watch can't be a prop used in some computed to avoid infinite loop
     *
     * @param  {boolean} keysIsusedInSomeComputed
     * @return {void}
     */
    if (keysIsusedInSomeComputed) {
        storeComputedKeyUsedWarning(keys, getLogStyle());
        return;
    }

    callBackComputed.add({
        prop,
        keys,
        fn,
    });

    return {
        ...state,
        callBackComputed,
    };
};

/**
 * @param {Object} param
 * @param {string} param.instanceId
 * @param {string[]} param.keys
 * @param {string} param.prop
 * @param {() => void} param.callback
 * @returns {void}
 */
export const storeComputedEntryPoint = ({
    instanceId,
    prop,
    keys,
    callback,
}) => {
    const state = getFormMainMap(instanceId);
    if (!state) return;

    const newState = storeComputedAction({
        state,
        prop,
        keys,
        fn: callback,
    });

    if (!newState) return;
    updateMainMap(instanceId, newState);
};
