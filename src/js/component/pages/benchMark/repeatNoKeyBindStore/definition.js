//@ts-check

import { MobJs } from '@mobJs';
import { BenchMarkFakeComponent } from '../fakeComponent/definition';
import { BenchMarkRepeatNoKyBindStoreFn } from './benchmark-repeat-no-key-bind-store';

/**
 * @import { CreateComponentParams } from "@mobJsType";
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
