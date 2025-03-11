//@ts-check

import { MobJs } from '../../../../mobjs';
import { benchMarkDefinitionPartial } from '../partials/definitionPartial';
import { BenchMarkRepeatWithNoKeyFnNested } from './benchmarkRepeatWithKeyNested';

/**
 * @import { CreateComponentParams } from "../../../../mobjs/type";
 **/

export const BenchMarkRepeatWithNoKeyNested = MobJs.createComponent(
    /** @type{CreateComponentParams<import('../type').BenchMark>} */
    ({
        name: 'benchmark-repeat-key-no-nested',
        component: BenchMarkRepeatWithNoKeyFnNested,
        ...benchMarkDefinitionPartial(31),
    })
);
