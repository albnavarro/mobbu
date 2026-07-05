//@ts-check

import { MobJs } from '@mobJs';
import { AnimatedPatternN0Function } from './animated-pattern-n0';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const AnimatedPatternN0 = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').AnimatedPatternN0>} */
    ({
        tag: 'animatedpattern-n0',
        component: AnimatedPatternN0Function,
        props: {
            background: {
                __value: '',
                __type: String,
            },
        },
        state: {
            isMounted: {
                __value: false,
                __type: Boolean,
            },
            controlsActive: {
                __value: false,
                __type: Boolean,
            },
            destroy: {
                __value: () => {},
                __type: Function,
            },
            currentParamsId: {
                __value: 0,
                __type: Number,
            },
        },
    })
);
