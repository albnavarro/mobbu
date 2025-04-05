//@ts-check

import { MobJs } from '../../../../mob/mobjs';
import { BenchMarkFakeComponent } from '../fakeComponent/definition';
import { BenchMarkRepeatNoKyBindStoreFn } from './benchmarkRepeatNoKeyBindStore';

/**
 * @import { CreateComponentParams } from "../../../../mob/mobjs/type";
 **/

export const BenchMarkRepeatNoKeyBindStore = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').BenchMarkExternal>} */
    ({
        name: 'benchmark-repeat-no-key-bind-store',
        component: BenchMarkRepeatNoKyBindStoreFn,
        state: {},
        child: [BenchMarkFakeComponent],
    })
);
