import { MobJs } from '@mobJs';
import { DebugTreeFn } from './debug-tree';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const DebugTree = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DebugTreeType>} */
    ({
        tag: 'debug-tree',
        component: DebugTreeFn,
        state: {
            data: () => ({
                value: [],
                type: Array,
            }),
            isLoading: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
