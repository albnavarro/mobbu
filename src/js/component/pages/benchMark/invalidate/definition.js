//@ts-check

import { createComponent } from '../../../../mobjs';
import { BenchMarkFakeComponent } from '../fakeComponent/definition';
import { BenchMarkInvalidateFn } from './benchmarkInvalidate';

export const BenchMarkInvalidate = createComponent({
    name: 'benchmark-invalidate',
    component: BenchMarkInvalidateFn,
    exportState: ['svg'],
    state: {
        counter: () => ({
            value: 0,
            type: Number,
        }),
        numberOfComponent: () => ({
            value: 1,
            type: Number,
            validate: (value) => {
                return value < 2000;
            },
            strict: true,
            skipEqual: false,
        }),
        time: () => ({
            value: 0,
            type: Number,
            skipEqual: false,
        }),
    },
    child: [BenchMarkFakeComponent],
});
