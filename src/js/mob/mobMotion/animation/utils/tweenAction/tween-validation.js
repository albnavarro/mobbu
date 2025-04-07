// @ts-check

import { handleSetUp } from '../../../setup';
import { MQ_MAX, MQ_MIN } from '../setUp/set-up-validation.js';
import { MobScrollerConstant } from '../../scroller/mob-scroller-constant.js';
import { getTweenFn, tweenConfig } from '../../tween/tween-config';
import {
    DIRECTION_COL,
    DIRECTION_RADIAL,
    DIRECTION_ROW,
    STAGGER_CENTER,
    STAGGER_EDGES,
    STAGGER_END,
    STAGGER_RANDOM,
    STAGGER_START,
    STAGGER_TYPE_CENTER,
    STAGGER_TYPE_END,
    STAGGER_TYPE_EQUAL,
    STAGGER_TYPE_START,
} from '../stagger/stagger-costant.js';
import {
    addAsyncFunctionWarining,
    asyncTimelineDelayWarning,
    asyncTimelineTweenWaring,
    booleanWarning,
    breakpointWarning,
    createStaggerItemsWarning,
    createStaggerTypeWarning,
    durationNumberOrFunctionWarining,
    durationWarining,
    functionIsValidAndReturnDefaultWarining,
    functionWarning,
    genericEaseTypeWarining,
    initialDataPropWarining,
    initialDataValueWarining,
    lerpPrecisionWarining,
    lerpVelocityWarining,
    naumberWarning,
    scrollerAlignWarining,
    scrollerDirectionWarining,
    scrollerDynmicRangeValueWarining,
    scrollerDynmicValueWarining,
    scrollerEaseTypeWarining,
    scrollerLerpConfigWarning,
    scrollerNoTweenDefinedWarning,
    scrollerOnSwitchWarining,
    scrollerOpacityWarning,
    scrollerPropiertiesWarining,
    scrollerRangeNumberWarning,
    scrollerRangeStringWarning,
    scrollerSpringCongifWarining,
    scrollerTweenWarning,
    scrollerTypeWarining,
    scrollerUseSequencerWarining,
    scrollerUseTweenButNotProsDefinedWarning,
    playLabelWarining,
    relativeWarining,
    repeatWarining,
    scrollTriggerCustomRangeWarning,
    scrollTriggerRangeScaleWarning,
    scrollTriggerRangeWarning,
    sequencerRangeEndWarning,
    sequencerRangeStartWarning,
    springConfigPropWarning,
    springConfigSpecificPropWarning,
    springPresetWarning,
    staggerEachWarning,
    staggerFromGenericWarning,
    staggerGridDirectionWarning,
    staggerRowColGenericWarining,
    staggerWaitCompleteWarning,
    stringWarning,
    timelineSetTweenArrayWarining,
    timelineSetTweenLabelWarining,
    tweenEaseWarning,
    valueStringWarning,
} from '../warning';
import {
    checkIfIsOnlyNumber,
    checkIfIsOnlyNumberPositiveNegative,
    exactMatchInsesitiveNumberPropArray,
} from '../regex-validation';
import { getPropiertiesValueFromConstant } from '../../scroller/get-constant-from-regex.js';
import { MobCore } from '../../../../mobCore';

/**
 *
 * @param {(Number|Function)} val
 * @returns {boolean}
 *
 * @description
 * Check if new prop value to update is valid
 **/
export const dataTweenValueIsValid = (val) => {
    return (
        MobCore.checkType(Number, val) ||
        // @ts-ignore
        (MobCore.checkType(Function, val) && MobCore.checkType(Number, val()))
    );
};

/**
 * @param {Object} param
 * @param {number|undefined} param.start
 * @param {number|undefined} param.end
 * @returns {boolean}
 *
 * @description
 * Check if sequencer start && end value is valid
 */
export const sequencerRangeValidate = ({ start, end }) => {
    const startIsValid = MobCore.checkType(Number, start);
    const endIsValid = MobCore.checkType(Number, end);
    if (!startIsValid) sequencerRangeStartWarning(start);
    if (!endIsValid) sequencerRangeEndWarning(end);
    return startIsValid && endIsValid;
};

/**
 *
 * @param {number|undefined} duration
 * @returns {number}
 *
 * @description
 * Check if new duration value is Valid
 **/
export const durationIsValid = (duration) => {
    const isValid = MobCore.checkType(Number, duration);
    if (!isValid && duration) durationWarining(duration);

    return isValid
        ? /** @type{number} */ (duration)
        : handleSetUp.get('sequencer').duration;
};

/**
 *
 * @param {number|undefined} repeat
 * @returns {number}
 *
 * @description
 * Check if repeat definition is valid
 **/
export const repeatIsValid = (repeat) => {
    const isValid = MobCore.checkType(Number, repeat);
    if (!isValid && repeat) repeatWarining(repeat);

    return isValid && repeat ? repeat : 1;
};

/**
 *
 * @param {import('../../tween/type').EaseTypes|undefined} ease
 * @returns {import('../../tween/type').EaseTypes}
 *
 * @description
 * Check if ease definition is valid
 **/
export const easeIsValid = (ease) => {
    const isValid = ease && ease in tweenConfig;
    if (!isValid && ease) tweenEaseWarning(ease);

    return isValid ? ease : handleSetUp.get('sequencer').ease;
};

/**
 *
 * @param {import('../../tween/type').EaseTypes|undefined} ease
 * @returns {Function}
 *
 * @description
 * Check if ease definition is valid
 **/
export const easeScrollerTweenIsValid = (ease) => {
    const isValid = ease && ease in tweenConfig;
    if (!isValid && ease) tweenEaseWarning(ease);

    return isValid
        ? getTweenFn(ease)
        : getTweenFn(handleSetUp.get('parallaxTween').ease);
};

/**
 * @param {string|undefined} prop
 * @param {number|undefined} value
 * @returns {boolean}
 *
 * @description
 * Check if new tween prop is valid
 **/
export const initialDataPropValidate = (prop, value) => {
    const propIsValid = MobCore.checkType(String, prop);
    const valueIsValid = MobCore.checkType(Number, value);

    if (!propIsValid) initialDataPropWarining(prop);
    if (!valueIsValid) initialDataValueWarining(value);

    return propIsValid && valueIsValid;
};

/**
 * @param {number|undefined} each
 * @returns {boolean|undefined}
 *
 * @description
 **/
export const validateStaggerEach = (each) => {
    if (!each) return;

    const eachIsValid = MobCore.checkType(Number, each);
    if (!eachIsValid) staggerEachWarning();

    return eachIsValid;
};

/**
 * @param {('start'|'end'|'center'|'edges'|'random'|{x:number,y:number}|number)}  from
 * @returns {boolean|undefined}
 *
 * @description
 **/
export const validateStaggerFrom = (from) => {
    if (!from) return;

    const fromList = [
        STAGGER_START,
        STAGGER_END,
        STAGGER_CENTER,
        STAGGER_EDGES,
        STAGGER_RANDOM,
    ];

    // @ts-ignore
    const fromIsAValidString = fromList.includes(from);
    const fromIsANumber = MobCore.checkType(Number, from);
    const fromIsAValidObject = MobCore.checkType(Object, from);
    const fromIsValid =
        fromIsAValidString || fromIsANumber || fromIsAValidObject;
    if (!fromIsValid) staggerFromGenericWarning(from);

    return fromIsValid;
};

/**
 * @param {number|undefined} val
 * @returns {boolean|undefined}
 *
 * @description
 **/
export const validateStaggerColRow = (val) => {
    if (!val) return;

    const valIsValid = MobCore.checkType(Number, val);
    if (!valIsValid) staggerRowColGenericWarining(val);

    return valIsValid;
};

/**
 * @param {('row'|'col'|'radial')} direction
 * @returns {boolean|undefined}
 *
 * @description
 **/
export const validateStaggerDirection = (direction) => {
    if (!direction) return;

    const directionList = [DIRECTION_RADIAL, DIRECTION_ROW, DIRECTION_COL];

    const directionisValid = directionList.includes(direction);
    if (!directionisValid) staggerGridDirectionWarning();

    return directionisValid;
};

/**
 * @param {boolean|undefined} waitComplete
 * @returns {boolean|undefined}
 *
 * @description
 **/
export const validateStaggerWaitComplete = (waitComplete) => {
    if (!waitComplete) return;

    const valIsValid = MobCore.checkType(Boolean, waitComplete);
    if (!valIsValid) staggerWaitCompleteWarning();

    return valIsValid;
};

/**
 * @param {[] | (object | HTMLElement)[]} arr
 * @returns {boolean}
 *
 * @description
 * Return only the boolean value
 **/
export const validateStaggerItems = (arr = []) => {
    const isValid = MobCore.checkType(Array, [...arr]) && arr.length > 0;
    if (!isValid) createStaggerItemsWarning();

    return isValid;
};

/**
 * @param {(object | HTMLElement)[]} arr
 * @returns {any[]|[]}
 *
 * @description
 * Return the array fallback
 **/
export const staggerItemsIsValid = (arr = []) => {
    const isValid = MobCore.checkType(Array, [...arr]) && arr.length > 0;
    return isValid ? arr : [];
};

/**
 * @param {string|undefined} type
 * @returns {boolean|undefined}
 *
 * @description
 **/
export const validateStaggerType = (type) => {
    if (!type) return;

    const stagerTypeList = [
        STAGGER_TYPE_EQUAL,
        STAGGER_TYPE_START,
        STAGGER_TYPE_END,
        STAGGER_TYPE_CENTER,
    ];

    const isValid = stagerTypeList.includes(type);
    if (!isValid) {
        createStaggerTypeWarning();
        return;
    }

    return isValid;
};

/**
 *
 * @param {number|undefined} duration
 * @returns {number}
 *
 * @description
 * Check if new tween duration value is Valid
 **/
export const durationTweenIsValid = (duration) => {
    const isValid = MobCore.checkType(Number, duration);
    if (!isValid && duration) durationWarining(duration);

    return isValid
        ? /** @type{number} */ (duration)
        : handleSetUp.get('tween').duration;
};

/**
 *
 * @param {boolean|undefined} val  relative prop
 * @param {('tween'|'spring'|'lerp')} tweenType relative prop
 * @returns {boolean}
 *
 * @description
 * Check if new relative value is Valid
 **/
export const relativeIsValid = (val, tweenType) => {
    const isValid = MobCore.checkType(Boolean, val);
    if (!isValid && val) relativeWarining(val, tweenType);

    return isValid
        ? /** @type {boolean} */ (val)
        : handleSetUp.get(tweenType).relative;
};

/**
 *
 * @param {string|undefined} ease
 * @returns {Function}
 *
 * @description
 * Check if ease definition is valid
 **/
export const easeTweenIsValidGetFunction = (ease) => {
    const isValid = ease && ease in tweenConfig;
    if (!isValid && ease) tweenEaseWarning(ease);

    return isValid
        ? getTweenFn(ease)
        : getTweenFn(handleSetUp.get('tween').ease);
};

/**
 *
 * @param {import('../../tween/type').EaseTypes|undefined} ease
 * @returns {import('../../tween/type').EaseTypes}
 *
 * @description
 * Check if ease definition is valid
 **/
export const easeTweenIsValid = (ease) => {
    const isValid = ease && ease in tweenConfig;
    if (!isValid && ease) tweenEaseWarning(ease);

    return isValid ? ease : handleSetUp.get('tween').ease;
};

/**
 *
 * @param {string|undefined} config
 * @returns {import('../../spring/type').SpringProps}
 *
 * @description
 * Check if spring config is valid and return new config
 **/
export const springConfigIsValidAndGetNew = (config) => {
    const { config: allConfig } = handleSetUp.get('spring');

    //Get config from store
    const isInConfig = config && config in allConfig;

    // Get obj config
    const obj = isInConfig ? allConfig[config] : {};

    // Check if there is all key
    const isValidPropsKey = isInConfig
        ? (() => {
              return (
                  MobCore.checkType(Object, obj) &&
                  'tension' in obj &&
                  'mass' in obj &&
                  'friction' in obj &&
                  'velocity' in obj &&
                  'precision' in obj
              );
          })()
        : false;

    // Check if all key is a positive number
    const isValidPropsValue = isValidPropsKey
        ? Object.values(obj).every((prop) => {
              return MobCore.checkType(Number, prop) && prop >= 0;
          })
        : null;

    // warning gif config don't exist
    if (!isInConfig && config) springPresetWarning(config);

    // warning if config props is not valid
    if (!isValidPropsValue && isInConfig)
        springConfigSpecificPropWarning(config);

    // @ts-ignore
    return isValidPropsValue ? allConfig[config] : allConfig.default;
};

/**
 *
 * @param {string|undefined} config
 * @returns {string|boolean|undefined}
 *
 * @description
 * Check if spring config is valid
 **/
export const springConfigIsValid = (config) => {
    const { config: allConfig } = handleSetUp.get('spring');
    const isValid = config && config in allConfig;
    if (!isValid && config) springPresetWarning(config);

    return isValid;
};

/**
 *
 * @param {Partial<import('../../spring/type').SpringProps>|undefined} obj
 * @returns {Partial<import('../../spring/type').SpringProps>|{}}
 *
 * @description
 * Check if every spring config prop is valid
 **/
export const springConfigPropIsValid = (obj) => {
    const isValid =
        MobCore.checkType(Object, obj) &&
        // @ts-ignore
        Object.values(obj).every((prop) => {
            return MobCore.checkType(Number, prop) && prop >= 0;
        });

    if (!isValid && obj) springConfigPropWarning();

    // @ts-ignore
    return isValid ? obj : {};
};

/**
 *
 * @param {(Number|Function|undefined)} duration
 * @returns {number}
 *
 * @description
 * Check if duration definition is valid
 **/
export const durationIsNumberOrFunctionIsValid = (duration) => {
    const durationIsFn = MobCore.checkType(Function, duration);
    // @ts-ignore
    const durationResult = durationIsFn ? duration() : duration;
    const isValid = MobCore.checkType(Number, durationResult);
    if (!isValid && duration) durationNumberOrFunctionWarining(duration);

    return isValid ? durationResult : handleSetUp.get('tween').duration;
};

/**
 *
 * @param {boolean} value
 * @param {string} label
 *
 * @description
 * Check if value is Boolan and true
 **/
export const valueIsBooleanAndTrue = (value, label) => {
    const isValid = MobCore.checkType(Boolean, value);
    if (!isValid && value) booleanWarning(value, label);

    return isValid && value === true;
};

/**
 *
 * @param {boolean|undefined} value
 * @param {string} label
 * @param {boolean} defaultValue
 * @returns {boolean}
 *
 * @description
 * Check if value is Boolan and reteurn Default
 **/
export const valueIsBooleanAndReturnDefault = (value, label, defaultValue) => {
    const isValid = MobCore.checkType(Boolean, value);
    if (!isValid && value) booleanWarning(value, label);

    // @ts-ignore
    return isValid ? value : defaultValue;
};

/**
 *
 * @param {string|undefined} value
 * @param {string} label
 * @param {any} defaultValue
 * @returns {string}
 *
 * @description
 * Check if value is String and return default
 **/
export const valueIsStringAndReturnDefault = (value, label, defaultValue) => {
    const isValid = MobCore.checkType(String, value);
    if (!isValid && value) stringWarning(value, label);

    // @ts-ignore
    return isValid ? value : defaultValue;
};

/**
 *
 * @param {number|undefined} value
 * @param {string} label
 * @param {any} defaultValue
 * @returns {number}
 *
 * @description
 * Check if value is Number and return default
 **/
export const valueIsNumberAndReturnDefault = (value, label, defaultValue) => {
    const isValid = MobCore.checkType(Number, value);
    if (!isValid && value) naumberWarning(value, label);

    return isValid ? /** @type{number} */ (value) : defaultValue;
};

/**
 *
 * @template T
 * @param {T|undefined} value
 * @param {string} label
 * @param {(() => void)|undefined} defaultValue
 * @returns {T}
 *
 * @description
 * Check if value is Function and return default
 **/
export const valueIsFunctionAndReturnDefault = (value, label, defaultValue) => {
    const isValid = MobCore.checkType(Function, value);
    if (!isValid && value) functionWarning(value, label);

    // @ts-ignore
    return isValid ? value : defaultValue;
};

/**
 *
 * @param {number|undefined} value
 * @returns {number}
 *
 * @description
 * Check if velocity is valid
 **/
export const lerpVelocityIsValid = (value) => {
    // @ts-ignore
    const isValid = MobCore.checkType(Number, value) && value > 0 && value <= 1;
    if (!isValid && value) lerpVelocityWarining();

    return isValid
        ? /** @type{number} */ (value)
        : handleSetUp.get('lerp').velocity;
};

/**
 *
 * @param {number|undefined} value
 * @returns {number}
 *
 * @description
 * Check if precision is valid
 **/
export const lerpPrecisionIsValid = (value) => {
    const isValid = MobCore.checkType(Number, value);
    if (!isValid && value) lerpPrecisionWarining();

    return isValid
        ? /** @type{number} */ (value)
        : handleSetUp.get('lerp').precision;
};

/**
 *
 * @param {string|undefined} value
 * @param {string} label
 * @returns {boolean}
 *
 * @description
 * Check if value is a string.
 **/
export const valueStringIsValid = (value, label) => {
    const isValid = MobCore.checkType(String, value);
    if (!isValid && value) valueStringWarning(label);

    return isValid;
};

/**
 *
 * @param {number|undefined} value
 * @returns {number|undefined}
 *
 * @description
 * Check if Delay is a Number and return Number || null.
 **/
export const asyncTimelineDelayIsValid = (value) => {
    const isValid = MobCore.checkType(Number, value);
    if (!isValid && value) asyncTimelineDelayWarning();

    return isValid ? value : undefined;
};

/**
 *
 * @param {any} instance
 * @returns {boolean}
 *
 * @description
 * Check if tween is lerp|spring|tween
 **/
export const asyncTimelineTweenIsValid = (instance) => {
    const isValid =
        instance?.getType?.() &&
        (instance.getType() === 'LERP' ||
            instance.getType() === 'SPRING' ||
            instance.getType() === 'TWEEN');

    if (!isValid && instance) asyncTimelineTweenWaring();

    return isValid;
};

/**
 *
 * @param {string|Number|null} index
 * @param {string|null} label
 *
 * @description
 * Check if label is found
 **/
export const playLabelIsValid = (index, label) => {
    if (index === -1) playLabelWarining(label);
};

/**
 *
 * @param {Function|undefined} fn
 * @param {any} defaultValue
 * @param {string} label
 *
 * @description
 * Check if value is A function and return default
 **/
export const functionIsValidAndReturnDefault = (fn, defaultValue, label) => {
    const isValid = MobCore.checkType(Function, fn);
    if (!isValid && fn) functionIsValidAndReturnDefaultWarining(label, fn);

    return isValid ? fn : defaultValue;
};

/**
 *
 * @param {(arg0: import('../timeline/type').DirectionTypeAsync) => void} fn
 * @returns {(arg0: import('../timeline/type').DirectionTypeAsync) => void}
 *
 * @description
 * Check if value is A function
 **/
export const addAsyncFunctionIsValid = (fn) => {
    const isValid = MobCore.checkType(Function, fn);
    if (!isValid && fn) addAsyncFunctionWarining(fn);

    return isValid
        ? fn
        : ({ resolve }) => {
              resolve();
          };
};

/**
 *
 * @param {any[]|undefined} arr
 *
 * @description
 * Check if value is an Array
 **/
export const timelineSetTweenArrayIsValid = (arr) => {
    const isValid = MobCore.checkType(Array, arr);
    if (!isValid && arr) timelineSetTweenArrayWarining(arr);

    return isValid;
};

/**
 *
 * @param {string|undefined} label
 *
 * @description
 * Check if value is an string
 **/
export const timelineSetTweenLabelIsValid = (label) => {
    const isValid = MobCore.checkType(String, label);
    if (!isValid && label) timelineSetTweenLabelWarining(label);

    return isValid;
};

/**
 *
 * @param {(string|HTMLElement|globalThis|undefined)} element
 * @param {(boolean)} returnWindow
 * @returns {HTMLElement}
 *
 * @description
 * Check if value is a valid Element and return element|window|element
 **/
export const domNodeIsValidAndReturnElOrWin = (
    element,
    returnWindow = false
) => {
    const isNode = MobCore.checkType(Element, element);
    // @ts-ignore
    const realEl = isNode ? element : document.querySelector(element);

    // @ts-ignore
    return returnWindow
        ? /** @type{HTMLElement} */ (realEl ?? globalThis)
        : /** @type{HTMLElement} */ (realEl ?? document.createElement('div'));
};

/**
 *
 * @param {(string|HTMLElement|undefined)} element
 * @returns {HTMLElement|undefined}
 *
 * @description
 * Check if value is a valid Element
 **/
export const domNodeIsValidAndReturnNull = (element) => {
    const isNode = MobCore.checkType(Element, element);
    // @ts-ignore
    const realEl = isNode ? element : document.querySelector(element);

    // @ts-ignore
    return realEl;
};

/**
 * Specific parallax
 */

/**
 *
 * @param {string|undefined} direction
 * @param {string} component
 * @returns {string}
 *
 * @description
 * Check if value is a valid direction
 **/
export const directionIsValid = (direction, component) => {
    if (!direction) return MobScrollerConstant.DIRECTION_VERTICAL;

    const choice = [
        MobScrollerConstant.DIRECTION_VERTICAL,
        MobScrollerConstant.DIRECTION_HORIZONTAL,
    ];

    const isValid = choice.includes(direction);
    if (!isValid && direction) scrollerDirectionWarining(direction, component);

    return isValid ? direction : MobScrollerConstant.DIRECTION_VERTICAL;
};

/**
 *
 * @param {any|undefined} obj
 * @param {string} label
 * @returns {any} dynamicStart|dynamicEnd|null Object
 *
 * @description
 * Check if dynamicStart|dynamicEnd is a valid direction
 **/
export const scrollerDynamicValueIsValid = (obj, label) => {
    const positionChoice = [
        MobScrollerConstant.POSITION_TOP,
        MobScrollerConstant.POSITION_LEFT,
        MobScrollerConstant.POSITION_RIGHT,
        MobScrollerConstant.POSITION_BOTTOM,
    ];

    // obj is an Object
    const valueIsObject = MobCore.checkType(Object, obj);
    //
    // position is a String and contains the right value
    const positionIsValid =
        valueIsObject &&
        MobCore.checkType(String, obj?.position) &&
        positionChoice.includes(obj.position);

    // Value is a function and return a number
    const valueIsValid =
        valueIsObject &&
        MobCore.checkType(Function, obj.value) &&
        MobCore.checkType(Number, obj.value());

    // Validate all
    const isValid = valueIsObject && positionIsValid && valueIsValid;
    if (!isValid) scrollerDynmicValueWarining(label);

    return isValid ? obj : null;
};

/**
 *
 * @param {Function|undefined} fn
 * @returns {Function|undefined}
 *
 * @description
 * Check if dynamicRange is a functiom that return a Number
 **/
export const scrollerDynamicRangeIsValid = (fn) => {
    const isValid =
        MobCore.checkType(Function, fn) && MobCore.checkType(Number, fn?.());

    if (!isValid && fn) scrollerDynmicRangeValueWarining();

    return isValid ? fn : undefined;
};

/**
 *
 * @param {any|undefined} instance
 * @returns {any} parallaxTween|HandleSequencer|{}
 *
 * @description
 * Check if tween is parallaxTween|HandleSequencer
 **/
export const scrollerTweenIsValid = (instance) => {
    const isValid =
        instance?.getType?.() &&
        (instance.getType() === MobScrollerConstant.TWEEN_TWEEN ||
            instance.getType() === MobScrollerConstant.TWEEN_TIMELINE);

    if (!isValid && instance) scrollerTweenWarning();

    return isValid ? instance : {};
};

/**
 *
 * @param {( string|Number|undefined )} value
 * @returns {( string|Number )} ALign value
 *
 * @description
 * Check if Align value is valid
 **/
export const scrollerAlignIsValid = (value) => {
    if (!value) return MobScrollerConstant.ALIGN_CENTER;

    const choice = [
        MobScrollerConstant.ALIGN_START,
        MobScrollerConstant.ALIGN_TOP,
        MobScrollerConstant.ALIGN_RIGHT,
        MobScrollerConstant.ALIGN_CENTER,
        MobScrollerConstant.ALIGN_BOTTOM,
        MobScrollerConstant.ALIGN_LEFT,
        MobScrollerConstant.ALIGN_END,
    ];

    // @ts-ignore
    const isValid = choice.includes(value) || MobCore.checkType(Number, value);

    if (!isValid && value) scrollerAlignWarining(value, choice);

    return isValid ? value : MobScrollerConstant.ALIGN_CENTER;
};

/**
 *
 * @param {string|undefined} value
 * @returns {string|boolean} ALign value
 *
 * @description
 * Check if unSwitch value is valid
 **/
export const scrollerOnSwitchIsValid = (value) => {
    if (!value) return false;

    const choice = [
        MobScrollerConstant.IN_BACK,
        MobScrollerConstant.IN_STOP,
        MobScrollerConstant.OUT_BACK,
        MobScrollerConstant.OUT_STOP,
    ];

    const isValid = choice.includes(value);

    if (!isValid && value) scrollerOnSwitchWarining(value, choice);

    return isValid ? value : false;
};

/**
 *
 * @param {number|undefined} value
 * @param {string} label
 * @param {number} defaultValue
 * @returns {number}
 *
 * @description
 * Check if value is Number and return default
 **/
export const scrollerOpacityIsValid = (value, label, defaultValue) => {
    if (value === undefined || value === null) return defaultValue;

    const isValid = MobCore.checkType(Number, value);
    if (!isValid && value) scrollerOpacityWarning(value, label);

    return isValid ? value : defaultValue;
};

/**
 *
 * @param {string|undefined} value
 * @returns {string}
 *
 * @description
 * Check if type propierties is valid
 **/
export const scrollerTypeIsValid = (value) => {
    if (!value) return MobScrollerConstant.TYPE_PARALLAX;

    const valueLowerCase = value?.toLowerCase();
    const choice = [
        MobScrollerConstant.TYPE_PARALLAX,
        MobScrollerConstant.TYPE_SCROLLTRIGGER,
    ];

    const isValid = choice.includes(valueLowerCase);
    if (!isValid && valueLowerCase)
        scrollerTypeWarining(valueLowerCase, choice);

    return isValid ? valueLowerCase : MobScrollerConstant.TYPE_PARALLAX;
};

/**
 *
 * @param {string|number|undefined} value
 * @param {string} type
 * @returns {string}
 *
 * @description
 * Check if range propierties is valid
 **/
export const scrollerRangeIsValid = (value, type) => {
    const parsedValue = () => {
        if (type === MobScrollerConstant.TYPE_PARALLAX) {
            // @ts-ignore
            const isOnlyNumber = checkIfIsOnlyNumber(value);
            const isValid =
                MobCore.checkType(Number, Number(value)) &&
                isOnlyNumber &&
                // @ts-ignore
                value >= 0 &&
                // @ts-ignore
                value < 10;

            if (!isValid && value) scrollerRangeNumberWarning(value);

            return isValid
                ? // @ts-ignore
                  10 - value
                : 10 - handleSetUp.get('parallax').defaultRange;
        } else {
            const isValid = MobCore.checkType(String, value);
            if (!isValid && value) scrollerRangeStringWarning(value);

            return isValid ? value : '0px';
        }
    };

    // @ts-ignore
    return parsedValue();
};

/**
 *
 * @param {import('../../../utils/type').MqValues|undefined} mq
 * @param {string} label
 * @param {string} component
 * @returns {import('../../../utils/type').MqValues}
 *
 * @description
 * Check if breakpoint prop is valid
 **/
export const breakpointIsValid = (mq, label, component) => {
    const defaultMq = handleSetUp.get('defaultMq').value;
    if (!mq) return defaultMq;

    const mqObj = handleSetUp.get('mq');
    const choice = Object.keys(mqObj);

    const isValid = MobCore.checkType(String, mq) && choice.includes(mq);
    if (!isValid && mq) breakpointWarning(mq, choice, label, component);

    return isValid ? mq : defaultMq;
};

/**
 *
 * @param {import('../../../utils/type').MqAction|undefined} type
 * @param {string} label
 * @param {string} component
 * @returns {import('../../../utils/type').MqAction}
 *
 * @description
 * Check if queryType prop is valid
 **/
export const breakpointTypeIsValid = (type, label, component) => {
    const defaultType = handleSetUp.get('defaultMq').type;
    if (!type) return defaultType;

    const choice = [MQ_MAX, MQ_MIN];

    const isValid = MobCore.checkType(String, type) && choice.includes(type);
    if (!isValid && type) breakpointWarning(type, choice, label, component);

    return isValid ? type : defaultType;
};

/**
 * @description
 * Check if propierties prop is valid
 *
 * @param {string|undefined} value
 * @param {string} type
 * @param {boolean|undefined} tweenIsParallaxTween
 * @param {boolean|undefined} tweenIsSequencer
 * @returns {{ propierties:string, shouldTrackOnlyEvents:boolean }}
 */
export const scrollerPropiertiesIsValid = (
    value,
    type,
    tweenIsParallaxTween,
    tweenIsSequencer
) => {
    if (!value && tweenIsSequencer)
        return {
            propierties: MobScrollerConstant.PROP_VERTICAL,
            shouldTrackOnlyEvents: true,
        };

    if (!value && tweenIsParallaxTween)
        return {
            propierties: MobScrollerConstant.PROP_VERTICAL,
            shouldTrackOnlyEvents: false,
        };

    /**
     * Skip render if no propierties is given.
     * Use scrollTrigger only for track events.
     */
    const shouldTrackOnlyEvents =
        type === MobScrollerConstant.TYPE_SCROLLTRIGGER && !value;

    /**
     * Support suggestion for console.warn();
     */
    const choice = [
        MobScrollerConstant.PROP_VERTICAL,
        MobScrollerConstant.PROP_HORIZONTAL,
        MobScrollerConstant.PROP_ROTATE,
        MobScrollerConstant.PROP_ROTATEY,
        MobScrollerConstant.PROP_ROTATEX,
        MobScrollerConstant.PROP_ROTATEZ,
        MobScrollerConstant.PROP_OPACITY,
        MobScrollerConstant.PROP_SCALE,
        MobScrollerConstant.PROP_SCALE_X,
        MobScrollerConstant.PROP_SCALE_Y,
        MobScrollerConstant.PROP_TWEEN,
    ];

    /**
     * Check if is a string, custom css propierties is allowed
     */
    const isValid = MobCore.checkType(String, value);
    if (!isValid && value) scrollerPropiertiesWarining(value, choice);

    /**
     * Inside Parallax sequencer is not allowed
     * So return verticasl props
     */
    const notParallaxTweenInsideParallax =
        type === MobScrollerConstant.TYPE_PARALLAX &&
        value === MobScrollerConstant.PROP_TWEEN &&
        !tweenIsParallaxTween;

    /**
     * Check if with tween propierties there is a tween associated
     */
    if (
        !tweenIsParallaxTween &&
        !tweenIsSequencer &&
        value === MobScrollerConstant.PROP_TWEEN
    )
        scrollerNoTweenDefinedWarning();

    /**
     * Check if there a tween but propierties is not settled to tween
     */
    if (
        (tweenIsParallaxTween || tweenIsSequencer) &&
        value !== MobScrollerConstant.PROP_TWEEN
    )
        scrollerUseTweenButNotProsDefinedWarning();

    if (notParallaxTweenInsideParallax) scrollerUseSequencerWarining();
    const valueParsed = notParallaxTweenInsideParallax
        ? MobScrollerConstant.PROP_VERTICAL
        : value;

    /**
     * Get original value from constant
     */
    const valueFromConstant = getPropiertiesValueFromConstant(valueParsed);

    return {
        propierties: isValid
            ? (valueFromConstant ?? MobScrollerConstant.PROP_VERTICAL)
            : MobScrollerConstant.PROP_VERTICAL,
        shouldTrackOnlyEvents,
    };
};

/**
 *
 * @param {string|undefined} value
 * @returns {string}
 *
 * @description
 * Check if easeType is valid
 **/
export const scrollerEaseTypeIsValid = (value) => {
    if (!value) return MobScrollerConstant.EASE_LERP;

    const choice = [
        MobScrollerConstant.EASE_SPRING,
        MobScrollerConstant.EASE_LERP,
    ];
    const isValid = choice.includes(value);
    if (!isValid) scrollerEaseTypeWarining(value, choice);

    /**
     * Sequencer can not use spring
     */
    const fallback = isValid ? value : MobScrollerConstant.EASE_LERP;
    return isValid ? value : fallback;
};

/**
 * @param {string} value
 * @param {string} component
 * @returns {string}
 */
export const genericEaseTypeIsValid = (value, component) => {
    const choice = [
        MobScrollerConstant.EASE_SPRING,
        MobScrollerConstant.EASE_LERP,
    ];

    const isValid = choice.includes(value);
    if (!isValid && value) genericEaseTypeWarining(value, choice, component);

    return isValid ? value : MobScrollerConstant.EASE_LERP;
};

/**
 *
 * @param {import('../../spring/type').SpringChoiceConfig|undefined} config
 * @param {string} type
 * @returns {import('../../spring/type').SpringChoiceConfig}
 *
 * @description
 * Check if springConfig is valid
 **/
export const scrollerSpringConfigIsValid = (config, type) => {
    const defaultConfig =
        type === MobScrollerConstant.TYPE_PARALLAX
            ? handleSetUp.get('parallax').springConfig
            : handleSetUp.get('scrollTrigger').springConfig;

    if (!config) return defaultConfig;

    const springDefaultConfig = handleSetUp.get('spring').config;
    const choice = Object.keys(springDefaultConfig);

    const isValid = choice.includes(config);
    if (!isValid && config) scrollerSpringCongifWarining(config, choice);

    return isValid ? config : defaultConfig;
};

/**
 *
 * @param {number|undefined} value
 * @param {string} type
 * @returns {number}
 *
 * @description
 * Check if lerpConfig is valid
 **/
export const scrollerLerpConfigIsValid = (value, type) => {
    const isValid =
        // @ts-ignore
        MobCore.checkType(Number, Number(value)) && value > 0 && value <= 1;

    if (!isValid && value) scrollerLerpConfigWarning();

    const defaultConfig =
        type === MobScrollerConstant.TYPE_PARALLAX
            ? handleSetUp.get('parallax').lerpConfig
            : handleSetUp.get('scrollTrigger').lerpConfig;

    return isValid ? /** @type{number} */ (value) : defaultConfig;
};

/**
 *
 * @param {string} value
 * @param {string} properties
 * @returns {string}
 *
 * @description
 * Check if lerpConfig is valid
 **/
export const checkStringRangeOnPropierties = (value, properties) => {
    const parallalxXYRangeChoice = [
        MobScrollerConstant.PX,
        MobScrollerConstant.VW,
        MobScrollerConstant.VH,
        MobScrollerConstant.WPERCENT,
        MobScrollerConstant.HPERCENT,
    ];
    /**
     * Check X,Y prop
     */
    if (
        properties === MobScrollerConstant.PROP_VERTICAL ||
        properties === MobScrollerConstant.PROP_HORIZONTAL
    ) {
        const isValid = exactMatchInsesitiveNumberPropArray(
            parallalxXYRangeChoice,
            value
        );
        if (!isValid)
            scrollTriggerRangeWarning(
                value,
                properties,
                parallalxXYRangeChoice
            );
        return isValid ? value : '0px';
    }

    /**
     * Check ROTATE PROP
     */
    if (
        properties === MobScrollerConstant.PROP_ROTATE ||
        properties === MobScrollerConstant.PROP_ROTATEX ||
        properties === MobScrollerConstant.PROP_ROTATEY ||
        properties === MobScrollerConstant.PROP_ROTATEZ
    ) {
        const isValid = exactMatchInsesitiveNumberPropArray(
            [MobScrollerConstant.DEGREE],
            value
        );
        if (!isValid)
            scrollTriggerRangeWarning(value, properties, [
                MobScrollerConstant.DEGREE,
            ]);

        return isValid ? value : '0';
    }

    /**
     * Check SCALE PROP
     */
    if (
        properties === MobScrollerConstant.PROP_SCALE ||
        properties === MobScrollerConstant.PROP_SCALE_X ||
        properties === MobScrollerConstant.PROP_SCALE_Y
    ) {
        const isValid = checkIfIsOnlyNumberPositiveNegative(value);
        if (!isValid) scrollTriggerRangeScaleWarning(value, properties);
        return isValid ? value : '0';
    }

    /**
     * Other props without unit misure
     * Only Number
     */
    const isValid = checkIfIsOnlyNumberPositiveNegative(value);
    if (!isValid) scrollTriggerCustomRangeWarning(properties);

    return isValid ? value : '0';
};
