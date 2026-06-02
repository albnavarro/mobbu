import { MobJs } from '@mobJs';
import { MathAnimationFn } from './math-animation';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const MathAnimation = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').MathAnimationType>} */
    ({
        tag: 'math-animation',
        component: MathAnimationFn,
        props: {
            name: {
                __value: '',
                __type: String,
            },
            showNavigation: {
                __value: true,
                __type: Boolean,
            },
            numberOfStaggers: {
                __value: 5,
                __type: Number,
            },
            args: {
                __value: [],
                __type: Array,
            },
        },
    })
);
