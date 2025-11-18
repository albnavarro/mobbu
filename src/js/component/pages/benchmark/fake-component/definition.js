//@ts-check

import { MobJs } from '@mobJs';
import { BenchMarkFakeComponentFn } from './benchmark-fake-component';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const BenchMarkFakeComponent = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').BenchMarkFakeComponent>} */
    ({
        tag: 'benchmark-fake-component',
        component: BenchMarkFakeComponentFn,
        props: {
            counter: 0,
            label: '',
            index: 0,
        },
        state: {
            isSelected: false,
        },
    })
);
