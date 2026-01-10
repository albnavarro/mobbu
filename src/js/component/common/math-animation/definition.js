import { MobJs } from '@mobJs';
import { MathAnimationFn } from './math-animation';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const MathAnimation = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').MathAnimation>} */
    ({
        tag: 'math-animation',
        component: MathAnimationFn,
        props: {
            name: () => ({
                value: '',
                type: String,
            }),
            showNavigation: () => ({
                value: true,
                type: Boolean,
            }),
            numberOfStaggers: () => ({
                value: 5,
                type: Number,
            }),
            args: () => ({
                value: [],
                type: Array,
            }),
        },
    })
);
