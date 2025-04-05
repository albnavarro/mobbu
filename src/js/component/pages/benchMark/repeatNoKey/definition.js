//@ts-check

import { MobJs } from '@mobJs';
import { benchMarkDefinitionPartial } from '../partials/definitionPartial';
import { BenchMarkRepeatNoKyFn } from './benchmarkRepeatNoKey';

/**
 * @import { CreateComponentParams } from "@mobJsType";
 **/

export const BenchMarkRepeatNoKey = MobJs.createComponent(
    /** @type{CreateComponentParams<import('../type').BenchMark>} */
    ({
        name: 'benchmark-repeat-no-key',
        component: BenchMarkRepeatNoKyFn,
        ...benchMarkDefinitionPartial(),
    })
);
