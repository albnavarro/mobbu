//@ts-check

import { MobJs } from '@mobJs';
import { startData } from './data';
import { DynamicListFn } from './dynamic-list';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const DynamicList = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DynamicList>} */
    ({
        tag: 'dynamic-list',
        component: DynamicListFn,
        state: {
            counter: {
                __value: 1,
                __type: Number,
                __validate: (val) => val <= 10 && val >= 0,
                __strict: true,
            },
            data: {
                __value: startData,
                __type: Array,
            },
            activeSample: {
                __value: 3,
                __type: Number,
            },
        },
    })
);
