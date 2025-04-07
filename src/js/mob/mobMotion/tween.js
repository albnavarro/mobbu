// @ts-check

import MobLerp from './animation/lerp/mob-lerp.js';
import MobScrollerTween from './animation/scroller/mob-scroller-tween.js';
import MobMasterSequencer from './animation/sequencer/mob-master-sequencer.js';
import MobSequencer from './animation/sequencer/mob-sequencer.js';
import MobSpring from './animation/spring/mob-spring.js';
import MobTimeTween from './animation/tween/mob-time-tween.js';
import { MobCreateStaggers } from './animation/sequencer/mob-create-stagger.js';

/**
 * @param {import('./animation/scroller/type').MobScrollerTween} data
 * @return {MobScrollerTween}
 *
 * @example
 * ```javascript
 * Property schema:
 *
 *
 * const myScrollerTween = MobTween.createScrollerTween({
 *   from: Object.<string, number>,
 *   to: Object.<string, number>,
 *   ease: [ String ],
 *   stagger:{
 *      each: [ Number ],
 *      from: [ Number|String|{x:number,y:number} ],
 *      grid: {
 *          col: [ Number ],
 *          row: [ Number ],
 *          direction: [ String ]
 *      },
 *   },
 * })
 *
 *
 * ```
 *
 * @description
 * Simplified tween specific to be used with scrollTrigger as an alternative to the more complex sequencer, ParallaxTween requires only one mutation step (from / to).
 *
 * Available methods:
 * ```javascript
 * myScrollerTween.subscribe()
 * myScrollerTween.subscribeCache()
 * myScrollerTween.onStop()
 *
 * ```
 */
function createScrollerTween(data) {
    return new MobScrollerTween(data);
}

/**
 * @param {import('./animation/sequencer/type').SequencerProps} data
 * @returns {MobSequencer}
 *
 * @example
 * ```javascript
 * Property schema:
 *
 *
 * const mySequencer = MobTween.createSequencer({
 *   data: Object.<string, number>,
 *   duration: [ Number ],
 *   ease: [ String ],
 *   stagger:{
 *      each: [ Number ],
 *      from: [ Number|String|{x:number,y:number} ],
 *      grid: {
 *          col: [ Number ],
 *          row: [ Number ],
 *          direction: [ String ]
 *      },
 *   },
 * })
 *
 *
 * ```
 *
 * @description
 * Available methods:
 * ```javascript
 * mySequencer.goTo()
 * mySequencer.goFrom()
 * mySequencer.goFromTo()
 * mySequencer.add()
 * mySequencer.label()
 * mySequencer.subscribe()
 * mySequencer.subscribeCache()
 * mySequencer.onStop()
 *
 * ```
 */
function createSequencer(data) {
    return new MobSequencer(data);
}

/**
     * @description
     *
      Support class for grouping multiple sequencers.
      Very useful when generating sequencers dynamically, such as through the use of a createStagger.
      The following example uses a timeline but the same can be done using a scrollTrigger.
     *
     *
     * @example
     *
     * ```javascript
     * cont masterSequencer = MobTween.createMasterSequencer();
     * const staggers = tween.createStaggers({})
     * staggers.forEach(({ item, start, end, index }) => {
     *     const sequencer = tween
     *         .createSequencer({ ... })
     *         .goTo({ ... }, { start, end ...});
     *     sequencer.subscribe(({ ... }) => { ... });
     *     masterSequencer.add(sequencer);
     * });
     * const timeline = timeline.createSyncTimeline({}).add(masterSequencer)
     * ```
     */
function createMasterSequencer() {
    return new MobMasterSequencer();
}

/**
 * @template T
 * @param { import('./animation/sequencer/type').CreateSequencerType<T> & import('./animation/utils/stagger/type').StaggerPropiertiesObject } data
 * @returns {Array<{ start: Number, end: Number,index: Number, item: (T) }>} Stagger array
 *
 * @example
 * ```javascript
 * Property schema:
 *
 *
 * const staggers = MobTween.createStaggers({
 *     items: Array.<Element|Object>,
 *     stagger: {
 *         type: [ String ],
 *         from: [ Number|String|{x:number,y:number} ],
 *         grid: {
 *             col: [ Number ],
 *             row: [ Number ],
 *             direction: [ String ]
 *         },
 *     },
 *     duration: [ Number ],
 * });
 *
 *
 * staggers.forEach(({ item, start, end, index }) => {
 *     const sequencer = tween
 *         .createSequencer({ ... })
 *         .goTo({ ... }, { start, end ...});
 *     sequencer.subscribe(({ ... }) => { ... });
 *     masterSequencer.add(sequencer);
 * });
 *
 * ```
 *
 * @description
 *
 * ```
 */
function createStaggers(data) {
    return MobCreateStaggers(data);
}

/**
 * @param {import('./animation/tween/type').TimeTweenProps} data
 * @returns {MobTimeTween}
 *
 * @example
 * ```javascript
 * Property schema:
 *
 *
 * const myTween = MobTween.createTimeTween({
 *   data: Object.<string, number>,
 *   duration: [ Number ],
 *   ease: [ String ],
 *   relative: [ Boolean ]
 *   stagger:{
 *      each: [ Number ],
 *      from: [ Number|String|{x:number,y:number} ],
 *      grid: {
 *          col: [ Number ],
 *          row: [ Number ],
 *          direction: [ String ]
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
function createTimeTween(data) {
    return new MobTimeTween(data);
}

/**
 * @param {import('./animation/spring/type').SpringTweenProps} data
 * @returns {MobSpring}
 *
 *
 * @example
 * ```javascript
 * Property schema:
 *
 *
 * const mySpring = MobTween.createSpring({
 *   data: Object.<string, number>,
 *   config: [ String ],
 *   configProps: {
 *      tension: [ Number ],
 *      mass: [ Number ],
 *      friction: [ Number ],
 *      velocity: [ Number ],
 *      precision: [ Number ],
 *   },
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
function createSpring(data) {
    return new MobSpring(data);
}

/**
 * @param {import('./animation/lerp/type').lerpTweenProps} data
 * @returns {MobLerp}
 *
 * @example
 * ```javascript
 * Property schema:
 *
 *
 * const myLerp = MobTween.createLerp({
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
function createLerp(data) {
    return new MobLerp(data);
}

export {
    createLerp,
    createSpring,
    createTimeTween,
    createScrollerTween,
    createStaggers,
    createSequencer,
    createMasterSequencer,
};
