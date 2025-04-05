//@ts-check

import { MobJs } from '@mobJs';
import { benchMarkDefinitionPartial } from '../partials/definitionPartial';
import { BenchMarkRepeatWithKyFn } from './benchmarkRepeatWithKey';

/**
 * @import { CreateComponentParams } from "@mobJsType";
 **/

export const BenchMarkRepeatWithKey = MobJs.createComponent(
    /** @type{CreateComponentParams<import('../type').BenchMark>} */
    ({
        name: 'benchmark-repeat-key',
        component: BenchMarkRepeatWithKyFn,
        ...benchMarkDefinitionPartial(),
    })
);
