//@ts-check

import { createComponent } from '../../../../mobjs';
import { BenchMarkFakeComponent } from '../fakeComponent/definition';
import { BenchMarkRepeatNoKyBindStoreFn } from './benchmarkRepeatNoKeyBindStore';

/**
 * @import { CreateComponentParams } from "../../../../mobjs/type";
 **/

export const BenchMarkRepeatNoKeyBindStore = createComponent(
    /** @type{CreateComponentParams<import('./type').BenchMarkExternal>} */
    ({
        name: 'benchmark-repeat-no-key-bind-store',
        component: BenchMarkRepeatNoKyBindStoreFn,
        state: {},
        child: [BenchMarkFakeComponent],
    })
);
