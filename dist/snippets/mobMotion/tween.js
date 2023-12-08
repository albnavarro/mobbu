import { tween } from '../mobMotion';

const myTween = tween.createTween({
    data: { x: 0, y: 0, rotate: 0 },
    duration: 1000,
    ease: 'easeInQuad',
    relative: false,
    stagger: { each: 7 },
});

/**
 * const myTween = new HandleTween({
 *   data: Object.<string, number>,
 *   duration?: Number,
 *   ease?: String,
 *   relative?: Boolean
 *   stagger?:{
 *      each?: Number,
 *      from?: Number|String|{x:number,y:number},
 *      grid?: {
 *          col?: Number,
 *          row?: Number,
 *          direction?: String
 *      },
 *      waitComplete?: Boolean,
 *   },
 * })
 */
