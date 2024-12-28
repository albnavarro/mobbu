//@ts-check

import { createComponent } from '../../../../mobjs';
import { benchMarkDefinitionPartial } from '../partials/definitionPartial';
import { BenchMarkRepeatWithNoKeyFnNested } from './benchmarkRepeatWithKeyNested';

export const BenchMarkRepeatWithNoKeyNested = createComponent({
    name: 'benchmark-repeat-key-no-nested',
    component: BenchMarkRepeatWithNoKeyFnNested,
    ...benchMarkDefinitionPartial(31),
});
