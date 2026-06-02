//@ts-check

import { MobJs } from '@mobJs';
import { RosaDiGrandiPageFn } from './rosa-di-grandi-page';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const RosaDiGrandiPage = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').RosaDiGrandiPage>} */
    ({
        tag: 'rosa-di-grandi-page',
        component: RosaDiGrandiPageFn,
        state: {
            numerators: {
                __value: 2,
                __type: Number,
            },
            denominator: {
                __value: 3,
                __type: Number,
            },
            numeratorsLabel: {
                __value: 2,
                __type: Number,
            },
            denominatorLabel: {
                __value: 3,
                __type: Number,
            },
            duration: {
                __value: 500,
                __type: Number,
            },
            staggerEach: {
                __value: 4,
                __type: Number,
            },
            controlsActive: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
