import { MobJs } from '@mobJs';
import { DebugTreeFn } from './debug-tree';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const DebugTree = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DebugTreeType>} */
    ({
        tag: 'debug-tree',
        component: DebugTreeFn,
        state: {
            data: {
                __value: [],
                __type: Array,
            },
            isLoading: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
