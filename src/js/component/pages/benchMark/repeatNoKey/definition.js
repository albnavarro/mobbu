//@ts-check

import { MobJs } from '../../../../mobjs';
import { benchMarkDefinitionPartial } from '../partials/definitionPartial';
import { BenchMarkRepeatNoKyFn } from './benchmarkRepeatNoKey';

/**
 * @import { CreateComponentParams } from "../../../../mobjs/type";
 **/

export const BenchMarkRepeatNoKey = MobJs.createComponent(
    /** @type{CreateComponentParams<import('../type').BenchMark>} */
    ({
        name: 'benchmark-repeat-no-key',
        component: BenchMarkRepeatNoKyFn,
        ...benchMarkDefinitionPartial(),
    })
);
