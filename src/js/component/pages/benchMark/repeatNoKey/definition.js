//@ts-check

import { createComponent } from '../../../../mobjs';
import { benchMarkDefinitionPartial } from '../partials/definitionPartial';
import { BenchMarkRepeatNoKyFn } from './benchmarkRepeatNoKey';

export const BenchMarkRepeatNoKey = createComponent({
    name: 'benchmark-repeat-no-key',
    component: BenchMarkRepeatNoKyFn,
    ...benchMarkDefinitionPartial,
});
