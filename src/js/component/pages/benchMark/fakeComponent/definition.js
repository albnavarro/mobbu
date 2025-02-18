//@ts-check

import { createComponent } from '../../../../mobjs';
import { BenchMarkFakeComponentFn } from './benchmarkFakeComponent';

/**
 * @import { CreateComponentParams } from "../../../../mobjs/type";
 **/

export const BenchMarkFakeComponent = createComponent(
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
