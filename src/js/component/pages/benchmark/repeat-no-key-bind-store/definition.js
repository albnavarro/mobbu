//@ts-check

import { MobJs } from '@mobJs';
import { BenchMarkRepeatNoKyBindStoreFunction } from './benchmark-repeat-no-key-bind-store';
import { externalBenchmarkStore } from '@stores/benchmark';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const BenchMarkRepeatNoKeyBindStore = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').BenchMarkExternal>} */
    ({
        tag: 'benchmark-repeat-no-key-bind-store',
        component: BenchMarkRepeatNoKyBindStoreFunction,
        bindStore: externalBenchmarkStore,
    })
);
