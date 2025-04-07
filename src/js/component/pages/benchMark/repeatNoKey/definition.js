//@ts-check

import { MobJs } from '@mobJs';
import { benchMarkDefinitionPartial } from '../partials/definition-partial';
import { BenchMarkRepeatNoKyFn } from './benchmark-repeat-no-key';

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
