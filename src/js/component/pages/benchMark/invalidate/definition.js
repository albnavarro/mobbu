//@ts-check

import { MobJs } from '@mobJs';
import { benchMarkDefinitionPartial } from '../partials/definitionPartial';
import { BenchMarkInvalidateFn } from './benchmarkInvalidate';

/**
 * @import { CreateComponentParams } from "@mobJsType";
 **/

export const BenchMarkInvalidate = MobJs.createComponent(
    /** @type{CreateComponentParams<import('../type').BenchMark>} */
    ({
        name: 'benchmark-invalidate',
        component: BenchMarkInvalidateFn,
        ...benchMarkDefinitionPartial(),
    })
);
