//@ts-check

import { MobJs } from '../../../../mob/mobjs';
import { DynamicListCounterFn } from './dynamicListCounter';

/**
 * @import { CreateComponentParams } from "../../../../mob/mobjs/type";
 **/

export const DynamicCounter = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').DynamicCounter>} */
    ({
        name: 'dynamic-list-counter',
        component: DynamicListCounterFn,
        exportState: ['counter', 'parentListId'],
        state: {
            parentListId: () => ({
                value: -1,
                type: Number,
            }),
            counter: () => ({
                value: 0,
                type: Number,
            }),
        },
    })
);
