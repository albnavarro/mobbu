//@ts-check

import { MobJs } from '../../../../mobjs';
import { benchMarkDefinitionPartial } from '../partials/definitionPartial';
import { BenchMarkInvalidateFn } from './benchmarkInvalidate';

/**
 * @import { CreateComponentParams } from "../../../../mobjs/type";
 **/

export const BenchMarkInvalidate = MobJs.createComponent(
    /** @type{CreateComponentParams<import('../type').BenchMark>} */
    ({
        name: 'benchmark-invalidate',
        component: BenchMarkInvalidateFn,
        ...benchMarkDefinitionPartial(),
    })
);
