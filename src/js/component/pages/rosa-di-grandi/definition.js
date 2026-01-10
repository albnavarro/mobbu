//@ts-check

import { MobJs } from '@mobJs';
import { RosaDiGrandiPageFn } from './rosa-di-grandi-page';

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
                value: 4,
                type: Number,
            }),
        },
    })
);
