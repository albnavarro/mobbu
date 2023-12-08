import { tween } from '../../../src/js/mobMotion';

tween.createSpring({
    data: { x: 0, y: 0, rotate: 0 },
    config: 'wobbly',
    configProp: {
        mass: 5,
    },
    relative: false,
    stagger: { each: 7 },
});

/**
 * const mySpring = new HandleSpring({
 *   data: Object.<string, number>,
 *   config: String,
 *   configProp: {
 *      tension: Number,
 *      mass: Number,
 *      friction: Number,
 *      velocity: Number,
 *      precision: Number,
 *   },
 *   relative: Boolean
 *   stagger:{
 *      each: Number,
 *      from: Number|String|{x:number,y:number},
 *      grid: {
 *          col: Number,
 *          row: Number,
 *          direction: String,
 *      },
 *      waitComplete: Boolean,
 *   },
 * })
 */
