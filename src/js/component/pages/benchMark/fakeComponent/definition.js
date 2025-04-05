//@ts-check

import { MobJs } from '../../../../mob/mobjs';
import { BenchMarkFakeComponentFn } from './benchmarkFakeComponent';

/**
 * @import { CreateComponentParams } from "../../../../mob/mobjs/type";
 **/

export const BenchMarkFakeComponent = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').BenchMarkFakeComponent>} */
    ({
        name: 'benchmark-fake-component',
        component: BenchMarkFakeComponentFn,
        exportState: ['index', 'counter', 'label'],
        state: {
            counter: () => ({
                value: 0,
                type: Number,
            }),
            label: () => ({
                value: '',
                type: String,
            }),
            index: () => ({
                value: 0,
                type: Number,
            }),
            isSelected: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
