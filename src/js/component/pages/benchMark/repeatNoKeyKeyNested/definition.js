//@ts-check

import { MobJs } from '@mobJs';
import { benchMarkDefinitionPartial } from '../partials/definitionPartial';
import { BenchMarkRepeatWithNoKeyFnNested } from './benchmarkRepeatWithKeyNested';

/**
 * @import { CreateComponentParams } from "@mobJsType";
 **/

export const BenchMarkRepeatWithNoKeyNested = MobJs.createComponent(
    /** @type{CreateComponentParams<import('../type').BenchMark>} */
    ({
        name: 'benchmark-repeat-key-no-nested',
        component: BenchMarkRepeatWithNoKeyFnNested,
        ...benchMarkDefinitionPartial(31),
    })
);
