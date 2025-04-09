//@ts-check

import { MobJs } from '@mobJs';
import { BenchMarkFakeComponentFn } from './benchmark-fake-component';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const BenchMarkFakeComponent = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').BenchMarkFakeComponent>} */
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
