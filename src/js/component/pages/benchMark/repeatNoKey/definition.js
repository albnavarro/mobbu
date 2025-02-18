//@ts-check

import { createComponent } from '../../../../mobjs';
import { benchMarkDefinitionPartial } from '../partials/definitionPartial';
import { BenchMarkRepeatNoKyFn } from './benchmarkRepeatNoKey';

/**
 * @import { CreateComponentParams } from "../../../../mobjs/type";
 **/

export const BenchMarkRepeatNoKey = createComponent(
    /** @type{CreateComponentParams<import('../type').BenchMark>} */
    ({
        name: 'benchmark-repeat-no-key',
        component: BenchMarkRepeatNoKyFn,
        ...benchMarkDefinitionPartial(),
    })
);
