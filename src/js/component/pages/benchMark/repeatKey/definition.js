//@ts-check

import { createComponent } from '../../../../mobjs';
import { benchMarkDefinitionPartial } from '../partials/definitionPartial';
import { BenchMarkRepeatWithKyFn } from './benchmarkRepeatWithKey';

export const BenchMarkRepeatWithKey = createComponent({
    name: 'benchmark-repeat-key',
    component: BenchMarkRepeatWithKyFn,
    ...benchMarkDefinitionPartial,
});
