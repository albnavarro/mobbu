//@ts-check

import { MobJs } from '@mobJs';
import { AnimatedPatternN1Fn } from './animated-pattern-n1';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const AnimatedPatternN1 = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').AnimatedPatternN1>} */
    ({
        tag: 'animatedpattern-n1',
        component: AnimatedPatternN1Fn,
        props: {
            background: () => ({
                value: '',
                type: String,
            }),
            disableOffcanvas: () => ({
                // value: detectFirefox() || detectSafari() ? true : false,
                value: true,
                type: Boolean,
            }),
        },
        state: {
            isMounted: false,
        },
    })
);
