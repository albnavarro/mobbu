//@ts-check

import { createComponent } from '../../../../mobjs';
import { BenchMarkFakeComponentFn } from './benchmarkFakeComponent';

export const BenchMarkFakeComponent = createComponent({
    name: 'benchmark-fake-component',
    component: BenchMarkFakeComponentFn,
    exportState: ['counter', 'label'],
    state: {
        counter: () => ({
            value: 0,
            type: Number,
        }),
        label: () => ({
            value: '',
            type: String,
        }),
    },
});
