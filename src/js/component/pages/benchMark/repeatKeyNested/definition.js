//@ts-check

import { createComponent } from '../../../../mobjs';
import { benchMarkDefinitionPartial } from '../partials/definitionPartial';
import { BenchMarkRepeatWithKyFnNested } from './benchmarkRepeatWithKeyNested';

export const BenchMarkRepeatWithKeyNested = createComponent({
    name: 'benchmark-repeat-key-nested',
    component: BenchMarkRepeatWithKyFnNested,
    ...benchMarkDefinitionPartial(31),
});
