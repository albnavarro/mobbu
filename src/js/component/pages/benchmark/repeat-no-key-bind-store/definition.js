//@ts-check

import { MobJs } from '@mobJs';
import { BenchMarkFakeComponent } from '../fake-component/definition';
import { BenchMarkRepeatNoKyBindStoreFn } from './benchmark-repeat-no-key-bind-store';
import { createExternalStore, getExternalStore } from './store';

createExternalStore();
const externalStore = getExternalStore();

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const BenchMarkRepeatNoKeyBindStore = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').BenchMarkExternal>} */
    ({
        tag: 'benchmark-repeat-no-key-bind-store',
        component: BenchMarkRepeatNoKyBindStoreFn,
        bindStore: externalStore,
        state: {},
        child: [BenchMarkFakeComponent],
    })
);
