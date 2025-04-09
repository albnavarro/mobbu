// @ts-check

import { MobScrollerConstant } from '../scroller/mob-scroller-constant';
import {
    STAGGER_START,
    STAGGER_TYPE_CENTER,
    STAGGER_TYPE_END,
    STAGGER_TYPE_EQUAL,
} from './stagger/stagger-costant';

/**
 * @param {string[]} choice
 * @returns String
 */
const possibleChoice = (choice) => {
    return choice
        .map((item) => {
            return `${item} | `;
        })
        .join('');
};

/**
 * @param {string} label
 * @param {Object} fromObj
 * @param {Object} toObj
 * @returns Void
 */
export const compareKeysWarning = (label, fromObj, toObj) => {
    console.warn(
        `${label}: ${JSON.stringify(fromObj)} and to ${JSON.stringify(
            toObj
        )} is not equal`
    );
};

/**
 * @param {number} max
 * @returns Void
 */
export const staggerIsOutOfRangeWarning = (max) => {
    console.warn(
        `stagger col of grid is out of range, it must be less than ${max} ( staggers length )`
    );
};

/**
 * @param {any} label
 * @returns Void
 */
export const dataTweenValueIsNotValidWarning = (label) => {
    console.warn(
        `tween | sequencer: ${label} is not valid value, must be a number or a Function that return a number`
    );
};

/**
 * @param {any} val
 * @returns Void
 */
export const sequencerRangeStartWarning = (val) => {
    console.warn(
        `sequencer, start option: ${val} value is not valid, must be a Number`
    );
};

/**
 * @param {any} val
 * @returns Void
 */
export const sequencerRangeEndWarning = (val) => {
    console.warn(
        `sequencer, end option: ${val} value is not valid, must be a Number`
    );
};

/**
 * @returns Void
 */
export const relativePropInsideTimelineWarning = () => {
    console.warn('relative prop is not allowed inside a timeline');
};

/**
 * @param {Function} val
 * @returns Void
 */
export const timelineSuspendWarning = (val) => {
    console.warn(
        `Timeline Supend: ${val()} is not a valid value, must be a boolean`
    );
};

/**
 * @returns Void
 */
export const timelineReverseGoFromWarning = () => {
    console.warn(
        `SyncTimeline: in revese ( or yoyo mode) only goTo || goFromTo || set action is allowed. Using goFrom makes no sense in this context. Timeline will stopped.`
    );
};

/**
 * @param {any} items
 * @returns Void
 */
export const timelineSetTweenArrayWarining = (items) => {
    console.warn(`timeline setTween: ${items} is not an array of tween`);
};

/**
 * @param {any} label
 * @returns Void
 */
export const timelineSetTweenLabelWarining = (label) => {
    console.warn(`timeline setTween: ${label} is not a string`);
};

/**
 * @param {any} label
 * @returns Void
 */
export const timelineSetTweenLabelNotFoundWarining = (label) => {
    console.warn(`asyncTimeline.setTween() label: ${label} not found`);
};

/**
 * @returns Void
 */
export const timelineSetTweenFailWarining = () => {
    console.warn('setTween fail');
};

/**
 * @param {any} label
 * @returns Void
 */
export const syncTimelineLabelWarning = (label) => {
    console.warn(`label ${label} not founded`);
};

/**
 * @param {any} fn
 * @returns Void
 */
export const syncTimelineAddFnWarning = (fn) => {
    console.warn(`sequencer.add(fn,time) ${fn}: fn must be Function`);
};

/**
 * @param {any} time
 * @returns Void
 */
export const syncTimelineAddTimeWarning = (time) => {
    console.warn(`sequencer.add(fn,time) ${time}: time must be a Number`);
};

/**
 * @param {any} preset
 * @returns Void
 */
export const springPresetWarning = (preset) => {
    console.warn(`${preset} doesn't exist in spring configuration list`);
};

/**
 * @returns Void
 */
export const springConfigPropWarning = () => {
    console.warn(`Spring configProps: all prop must be a positive Number`);
};

/**
 * @param {any} config
 * @returns Void
 */
export const springConfigSpecificPropWarning = (config) => {
    console.warn(
        `Spring config: ${config}: config must have friction/mass/precision/tesnion props and must be a number`
    );
};

/**
 * @param {any} preset
 * @returns Void
 */
export const tweenEaseWarning = (preset) => {
    console.warn(`${preset} doesn't exist in tweens ease function`);
};

/**
 * @returns Void
 */
export const staggerEachWarning = () => {
    console.warn(`stagger each must be a Number `);
};

/**
 * @param {any} val
 * @returns Void
 */
export const staggerRowColGenericWarining = (val) => {
    console.warn(
        `stagger, row/col: ${val} value is not valid, must be a Number`
    );
};

/**
 * @returns Void
 */
export const staggerWaitCompleteWarning = () => {
    console.warn('Stagger error: waitComplete propierties must be a Boolean');
};

/**
 * @returns Void
 */
export const staggerGridDirectionWarning = () => {
    console.warn(
        `Stagger error: in grid option direction should be a string radial/col/row`
    );
};

/**
 * @returns Void
 */
export const staggerRadialDirectionWarning = () => {
    console.warn(
        `Stagger error: in radial direction 'from' propierties must be a object {x:Number,y:Number}`
    );
};

/**
 * @returns Void
 */
export const staggerGridColRowWarning = () => {
    console.warn(
        `Stagger error: in grid configuration col/row is minor than 1, it should be greater or equal 1`
    );
};

/**
 * @returns Void
 */
export const staggerColRowWarning = () => {
    console.warn(
        `Stagger error: in col/row direction 'from' propierties must be a string start/end/center/edges or a number`
    );
};

/**
 * @param {any} from
 * @returns Void
 */
export const staggerFromGenericWarning = (from) => {
    console.warn(
        `Stagger error: from: ${from} is not a valid value, must be a string start/end/center/edges or a number or a Object {x:Number,y:Number}`
    );
};

/**
 * @param {any} value
 * @returns Void
 */
export const durationWarining = (value) => {
    console.warn(
        `duration error: ${value} is not valid duration must be a number`
    );
};

/**
 * @param {any} value
 * @returns Void
 */
export const durationNumberOrFunctionWarining = (value) => {
    console.warn(
        `duration error: ${value} is not valid duration must be a number or a Function that return a number`
    );
};

/**
 * @param {any} value
 * @returns Void
 */
export const repeatWarining = (value) => {
    console.warn(
        `repeat error: ${value} is not valid repeat value must be a Number`
    );
};

/**
 * @param {any} ease
 * @returns Void
 */
export const easeWarning = (ease) => {
    console.warn(`ease definition error: ${ease} is not a valid  definition`);
};

/**
 * @param {any} prop
 * @returns Void
 */
export const initialDataPropWarining = (prop) => {
    console.warn(
        `data inizializiation error; ${prop} is not a valid value, must be a string`
    );
};

/**
 * @param {any} value
 * @returns Void
 */
export const initialDataValueWarining = (value) => {
    console.warn(
        `data inizializiation error; ${value} is not a valid value, must be a number`
    );
};

/**
 * @returns Void
 */
export const createStaggerItemsWarning = () => {
    console.warn(`createStaggers error: items array can not be empty`);
};

/**
 * @returns Void
 */
export const createStaggerItemsTypeWarning = () => {
    console.warn(
        `createStaggers error: each element of the array must be an Element or an Object`
    );
};

/**
 * @returns Void
 */
export const createStaggerTypeWarning = () => {
    console.warn(
        `screateStaggers error: type should be: ${STAGGER_TYPE_EQUAL} || ${STAGGER_START} || ${STAGGER_TYPE_END} || ${STAGGER_TYPE_CENTER}`
    );
};

/**
 * @param {any} eachProportion
 * @returns Void
 */
export const createStaggerEachWarning = (eachProportion) => {
    console.warn(
        `createStagger:  each must be between 1 and ${eachProportion}`
    );
};

/**
 * @param {any} val
 * @param {any} tweenType
 * @returns Void
 */
export const relativeWarining = (val, tweenType) => {
    console.warn(
        `${tweenType}: relative prop: ${val} is not a valid parameter, must be a boolean `
    );
};

/**
 * @param {any} val
 * @param {any} label
 * @returns Void
 */
export const booleanWarning = (val, label) => {
    console.warn(`${label}: '${val}' is not Boolean`);
};

/**
 * @param {any} val
 * @param {any} label
 * @returns Void
 */
export const stringWarning = (val, label) => {
    console.warn(`${label}: '${val}' is not String`);
};

/**
 * @param {any} val
 * @param {any} label
 * @returns Void
 */
export const naumberWarning = (val, label) => {
    console.warn(`${label}: '${val}' is not Number`);
};

/**
 * @param {any} val
 * @param {any} label
 * @returns Void
 */
export const functionWarning = (val, label) => {
    console.warn(`${label}: '${val}' is not Function`);
};

/**
 * @returns Void
 */
export const lerpVelocityWarining = () => {
    console.warn(
        'Lerp error: velocity is not valid, must be a Number greater than 0 and less than 1'
    );
};

/**
 * @returns Void
 */
export const lerpPrecisionWarining = () => {
    console.warn(
        'Lerp error: precision is not valid, must be a number greater than 0'
    );
};

/**
 * @param {any} methodName
 * @returns Void
 */
export const asyncTimelineMetodsInsideGroupWarining = (methodName) => {
    console.warn(
        `asyncTimeline error: ${methodName} cannot be used inside group`
    );
};

/**
 * @param {any} label
 * @returns Void
 */
export const valueStringWarning = (label) => {
    console.warn(`${label} value must be a string`);
};

/**
 * @returns Void
 */
export const asyncTimelineTweenWaring = () => {
    console.warn(
        'tween added to asyncTimeline or used inside sync() method must be instance of HandleLerp | HandleTween | HandleSpring'
    );
};

/**
 * @returns Void
 */
export const asyncTimelineDelayWarning = () => {
    console.warn('asyncTimeline arror: delay must be a Number');
};

/**
 * @param {any} label
 * @returns Void
 */
export const playLabelWarining = (label) => {
    console.warn(`${label} not found`);
};

/**
 * @param {any} value
 * @returns Void
 */
export const addAsyncFunctionWarining = (value) => {
    console.warn(`timeline add async function, ${value} is not a function `);
};

/**
 * @param {any} value
 * @param {any} component
 * @returns Void
 */
export const scrollerDirectionWarining = (value, component) => {
    console.warn(
        `${component} direction: ${value} is not valid value: must be ${MobScrollerConstant.DIRECTION_VERTICAL} | ${MobScrollerConstant.DIRECTION_HORIZONTAL}`
    );
};

/**
 * @param {any} label
 * @returns Void
 */
export const scrollerDynmicValueWarining = (label) => {
    console.warn(
        `scrollTrigger error; ${label} propierties: value must be a Object like { position: top|bottom|left|right, value: () => { return Number} } `
    );
};

/**
 * @returns Void
 */
export const scrollerDynmicRangeValueWarining = () => {
    console.warn(
        `scrollTrigger error; dynamicRange propierties: value must be a Function that return a Number`
    );
};

/**
 * @returns Void
 */
export const scrollerTweenWarning = () => {
    console.warn(
        'parallax|scrolTrigger error: tween is not valid, must be an instance of HandleSequencer || ParallaxTween'
    );
};

/**
 * @param {any} value
 * @param {any} choice
 * @returns Void
 */
export const scrollerAlignWarining = (value, choice) => {
    console.warn(
        `parallax error align propierties: ${value} is not valid must be one of ${possibleChoice(
            choice
        )} or a Number between 0 and 100`
    );
};

/**
 * @param {any} value
 * @param {any} choice
 * @returns Void
 */
export const scrollerOnSwitchWarining = (value, choice) => {
    console.warn(
        `parallax error align propierties: ${value} is not valid must be one of ${possibleChoice(
            choice
        )}`
    );
};

/**
 * @param {any} val
 * @param {any} label
 * @returns Void
 */
export const scrollerOpacityWarning = (val, label) => {
    console.warn(
        `${label}: '${val}' is not Number, must be a number between 0 and 100`
    );
};

/**
 * @param {any} value
 * @param {any} choice
 * @returns Void
 */
export const scrollerTypeWarining = (value, choice) => {
    console.warn(
        `parallax error type propierties: ${value} is not valid must be one of ${possibleChoice(
            choice
        )}`
    );
};

/**
 * @param {any} value
 * @param {any} choice
 * @returns Void
 */
export const scrollerPropiertiesWarining = (value, choice) => {
    console.warn(
        `parallax/scrollTrigger error propierties props: ${value} is not valid must be one of ${possibleChoice(
            choice
        )} or a custom css propierites like margin|line-height|...`
    );
};

/**
 * @param {any} value
 * @param {any} choice
 * @returns Void
 */
export const scrollerEaseTypeWarining = (value, choice) => {
    console.warn(
        `parallax error easeType props: ${value} is not valid must be one of ${possibleChoice(
            choice
        )}`
    );
};

/**
 * @param {any} value
 * @param {any} choice
 * @param {any} component
 * @returns Void
 */
export const genericEaseTypeWarining = (value, choice, component) => {
    console.warn(
        `${component} error easeType props: ${value} is not valid must be one of ${possibleChoice(
            choice
        )}`
    );
};

/**
 * @returns Void
 */
export const scrollerEaseTypeSpringWarining = () => {
    console.warn(
        'Scrolltrigger warning: spring animation is only available for native properties and scrollerTween, Check that with the "propierties" property set to "tween" no HandleSequencer is associated with the "tween" property'
    );
};

/**
 * @param {any} value
 * @param {any} choice
 * @returns Void
 */
export const scrollerSpringCongifWarining = (value, choice) => {
    console.warn(
        `parallax/scrollTrigger error springConfig props: ${value} is not valid must be one of ${possibleChoice(
            choice
        )}`
    );
};

/**
 * @param {any} value
 * @returns Void
 */
export const scrollerRangeNumberWarning = (value) => {
    console.warn(
        `parallax error range propierties, current value: ${value}, the value must be a number between 0 and 9.99`
    );
};

/**
 * @param {any} value
 * @returns Void
 */
export const scrollerRangeStringWarning = (value) => {
    console.warn(
        `scrollTrigger error range propierties: ${value} is not a String`
    );
};

/**
 * @param {any} mq
 * @param {any} choice
 * @param {any} label
 * @param {any} component
 * @returns Void
 */
export const breakpointWarning = (mq, choice, label, component) => {
    console.warn(
        `${component} error ${label} propierties: ${mq} is not valid must be one of ${possibleChoice(
            choice
        )}`
    );
};

/**
 * @returns Void
 */
export const scrollerUseSequencerWarining = () => {
    console.warn(
        'Parallax warning: if propierties is a tween the only choice is ParallaxTween, HandleSequencer or empty tween propierites is not allowed inside a parallax'
    );
};

/**
 * @returns Void
 */
export const scrollerLerpConfigWarning = () => {
    console.warn(
        'parallax/ScrollTrrigger error: velocity is not valid, must be a Number greater than 0 and less than 1'
    );
};

/**
 * @returns Void
 */
export const scrollerNoTweenDefinedWarning = () => {
    console.warn(
        'parallax/ScrollTrrigger warning:  The property is "tween" but no tween has been associated, associate a tween with the "tween" property'
    );
};

/**
 * @returns Void
 */
export const scrollerUseTweenButNotProsDefinedWarning = () => {
    console.warn(
        'parallax/ScrollTrrigger: there is tween associated but pros "propierties" is not set to "tween"'
    );
};

/**
 * @param {any} label
 * @param {any} value
 * @returns Void
 */
export const functionIsValidAndReturnDefaultWarining = (label, value) => {
    console.warn(`${label}: ${value} is not a function`);
};

/**
 * @param {any} string
 * @param {any} properties
 * @param {any} choice
 * @returns Void
 */
export const scrollTriggerRangeWarning = (string, properties, choice) => {
    console.warn(
        `scrollTrigger error range : with '${properties}' propierties ${string} is not valid, add one of the following unit misure: ${possibleChoice(
            choice
        )}, es: 45deg|100px|50vw etc..`
    );
};

/**
 * @param {any} properties
 * @returns Void
 */
export const scrollTriggerCustomRangeWarning = (properties) => {
    console.warn(
        `scrollTrigger error range : with custom css propierties '${properties}' no unit misure is necessary, the default unit misure will be used (px). Only '-' for negative value is allowed`
    );
};

/**
 * @param {any} string
 * @param {any} properties
 * @returns Void
 */
export const scrollTriggerRangeScaleWarning = (string, properties) => {
    console.warn(
        `scrollTrigger error range : with '${properties}' propierties ${string} is not valid no unit misure is necessary. Only '-' for negative value is allowed`
    );
};
