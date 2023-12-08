import { tween } from '../mobMotion';

const myTween = tween.createLerp({
    data: { x: 0, y: 0, rotate: 0 },
    velocity: 3,
    precision: 0.01,
    relative: false,
    stagger: { each: 7 },
});

/**
 * Schema:
 *
 * const myLerp = new HandleLerp({
 *   data: Object.<string, number>,
 *   precision?: Number,
 *   velocity?: Number,
 *   relative?: Boolean,
 *   stagger?:{
 *      each?: Number,
 *      from?: Number|String|{x:number,y:number},
 *      grid?: {
 *          col?: Number,
 *          row?: Number,
 *          direction?: String,
 *      },
 *      waitComplete?: Boolean,
 *   },
 * })
 */
