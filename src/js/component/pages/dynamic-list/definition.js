//@ts-check

import { MobJs } from '@mobJs';
import { DynamicListButton } from './button/definition';
import { DynamicListCardInner } from './card/innerCard/definition';
import { startData } from './data';
import { DynamicListFn } from './dynamic-list';
import { DynamicListRepeater } from './repeaters/definition';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const DynamicList = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DynamicList>} */
    ({
        tag: 'dynamic-list',
        component: DynamicListFn,
        state: {
            counter: () => ({
                value: 1,
                type: Number,
                validate: (val) => val <= 10 && val >= 0,
                strict: true,
            }),
            data: () => ({
                value: startData,
                type: Array,
            }),
            activeSample: () => ({
                value: 3,
                type: Number,
            }),
        },
        child: [DynamicListButton, DynamicListRepeater, DynamicListCardInner],
    })
);
