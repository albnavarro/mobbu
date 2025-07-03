//@ts-check

import { MobJs } from '@mobJs';
import { DynamicListCounterFn } from './dynamic-list-counter';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const DynamicCounter = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DynamicCounter>} */
    ({
        tag: 'dynamic-list-counter',
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
