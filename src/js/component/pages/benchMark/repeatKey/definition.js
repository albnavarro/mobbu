//@ts-check

import { MobJs } from '../../../../mob/mobjs';
import { benchMarkDefinitionPartial } from '../partials/definitionPartial';
import { BenchMarkRepeatWithKyFn } from './benchmarkRepeatWithKey';

/**
 * @import { CreateComponentParams } from "../../../../mob/mobjs/type";
 **/

export const BenchMarkRepeatWithKey = MobJs.createComponent(
    /** @type{CreateComponentParams<import('../type').BenchMark>} */
    ({
        name: 'benchmark-repeat-key',
        component: BenchMarkRepeatWithKyFn,
        ...benchMarkDefinitionPartial(),
    })
);
