//@ts-check

import { MobJs } from '@mobJs';
import { DynamicListCounterFn } from './dynamic-list-counter';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const DynamicCounter = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DynamicCounterType>} */
    ({
        tag: 'dynamic-list-counter',
        component: DynamicListCounterFn,
        props: {
            parentListId: {
                __value: -1,
                __type: Number,
            },
            counter: {
                __value: 0,
                __type: Number,
            },
        },
    })
);
