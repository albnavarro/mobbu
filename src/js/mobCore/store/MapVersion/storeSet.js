// @ts-check

import { checkEquality } from '../checkEquality';
import { getLogStyle } from './logStyle';
import { checkType, storeType, TYPE_IS_ANY } from './storeType';
import { cloneValueOrGet, maxDepth } from './storeUtils';
import {
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
 * @param {import("./type").storeMapValue} state
 * @param {string} prop
 * @param {any} val
 * @param {boolean} fireCallback
 * @returns {import("./type").storeMapValue|undefined}
 */
const setProp = (state, prop, val, fireCallback = true) => {
    const {
        type,
        store,
        fnValidate,
        strict,
        validationStatusObject,
        skipEqual,
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
        // this.runCallbackQueqe({
        //     prop,
        //     newValue: val,
        //     oldValue: oldVal,
        //     validationValue: this.validationStatusObject[prop],
        // });
    }

    // this.addToComputedWaitLsit(prop);

    return {
        ...state,
        store,
        validationStatusObject,
    };
};

/**
 * @param {import("./type").storeMapValue} state
 * @param {string} prop
 * @param {any} val
 * @param {boolean} fireCallback
 * @returns {import("./type").storeMapValue|undefined}
 */
const setObj = (state, prop, val, fireCallback = true) => {
    const {
        store,
        type,
        strict,
        fnValidate,
        validationStatusObject,
        skipEqual,
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
        // this.runCallbackQueqe({
        //     prop,
        //     newValue: this.store[prop],
        //     oldValue: oldObjectValues,
        //     validationValue: this.validationStatusObject[prop],
        // });
    }

    // this.addToComputedWaitLsit(prop);

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
    state,
    propsId,
    value,
    fireCallback = true,
    clone = false,
}) => {
    const { store, type } = state;
    const logStyle = getLogStyle();

    /**
     * Check if prop exist in store
     */
    if (!(propsId in store)) {
        storeSetWarning(propsId, logStyle);
        return;
    }

    /**
     * Id value is Map or Se or Objectt create a new old value.
     * This is mutable promitives, if it passed by reference mutate the original.
     */
    const previousValue = clone
        ? cloneValueOrGet({ value: store[propsId] })
        : store[propsId];

    /**
     * Check if newValue is a param or function.
     * Id prop type is a function or last value is a function skip.
     */
    const valueParsed =
        checkType(Function, value) &&
        !checkType(Function, previousValue) &&
        type[propsId] !== Function
            ? value(previousValue)
            : value;

    /**
     * Check if is an Object to stringyFy ( default is max depth === 2 )
     */
    const isCustomObject = type[propsId] === TYPE_IS_ANY;

    return storeType.isObject(previousValue) && !isCustomObject
        ? setObj(state, propsId, valueParsed, fireCallback)
        : setProp(state, propsId, valueParsed, fireCallback);
};
