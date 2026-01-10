//@ts-check

import { MobJs } from '@mobJs';
import { RosaDiGrandiPageFn } from './rosa-di-grandi-page';
import { MathAnimation } from '@commonComponent/math-animation/definition';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const RosaDiGrandiPage = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').RosaDiGrandiPage>} */
    ({
        tag: 'rosa-di-grandi-page',
        component: RosaDiGrandiPageFn,
        state: {
            petals: () => ({
                value: 7,
                type: Number,
            }),
            denominator: () => ({
                value: 9,
                type: Number,
            }),
            duration: () => ({
                value: 3000,
                type: Number,
            }),
            staggerEach: () => ({
                value: 4,
                type: Number,
            }),
        },
        child: [MathAnimation],
    })
);
