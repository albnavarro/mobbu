//@ts-check

import { MobJs } from '../../../../mob/mobjs';
import { benchMarkDefinitionPartial } from '../partials/definitionPartial';
import { BenchMarkRepeatWithKyFnNested } from './benchmarkRepeatWithKeyNested';

/**
 * @import { CreateComponentParams } from "../../../../mob/mobjs/type";
 **/

export const BenchMarkRepeatWithKeyNested = MobJs.createComponent(
    /** @type{CreateComponentParams<import('../type').BenchMark>} */
    ({
        name: 'benchmark-repeat-key-nested',
        component: BenchMarkRepeatWithKyFnNested,
        ...benchMarkDefinitionPartial(31),
    })
);
