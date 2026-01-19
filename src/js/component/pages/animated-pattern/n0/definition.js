//@ts-check

import { MobJs } from '@mobJs';
import { AnimatedPatternN0Fn } from './animated-pattern-n0';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const AnimatedPatternN0 = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').AnimatedPatternN0>} */
    ({
        tag: 'animatedpattern-n0',
        component: AnimatedPatternN0Fn,
        props: {
            background: () => ({
                value: '',
                type: String,
            }),
        },
        state: {
            isMounted: () => ({
                value: false,
                type: Boolean,
            }),
            controlsActive: () => ({
                value: false,
                type: Boolean,
            }),
            destroy: () => ({
                value: () => {},
                type: Function,
            }),
            currentParamsId: () => ({
                value: 0,
                type: Number,
            }),
        },
    })
);
