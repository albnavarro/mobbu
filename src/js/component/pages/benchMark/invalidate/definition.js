//@ts-check

import { createComponent } from '../../../../mobjs';
import { benchMarkDefinitionPartial } from '../partials/definitionPartial';
import { BenchMarkInvalidateFn } from './benchmarkInvalidate';

export const BenchMarkInvalidate = createComponent({
    name: 'benchmark-invalidate',
    component: BenchMarkInvalidateFn,
    ...benchMarkDefinitionPartial(),
});
