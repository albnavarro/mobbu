//@ts-check

import { MobJs } from '@mobJs';
import { BenchMarkFakeComponentFn } from './benchmark-fake-component';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const BenchMarkFakeComponent = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').BenchMarkFakeComponent>} */
    ({
        tag: 'benchmark-fake-component',
        component: BenchMarkFakeComponentFn,
        props: {
            counter: () => ({
                value: 0,
                type: Number,
            }),
            label: () => ({
                value: '',
                type: String,
            }),
            index: () => ({
                value: 0,
                type: Number,
            }),
        },
        state: {
            isSelected: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
