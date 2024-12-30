//@ts-check

import { createComponent } from '../../../../mobjs';
import { BenchMarkFakeComponent } from '../fakeComponent/definition';
import { BenchMarkRepeatNoKyBindStoreFn } from './benchmarkRepeatNoKeyBindStore';

export const BenchMarkRepeatNoKeyBindStore = createComponent({
    name: 'benchmark-repeat-no-key-bind-store',
    component: BenchMarkRepeatNoKyBindStoreFn,
    exportState: ['svg'],
    state: {},
    child: [BenchMarkFakeComponent],
});
