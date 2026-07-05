import { MobJs } from '@mobJs';
import { DebugTreeFunction } from './debug-tree';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const DebugTree = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DebugTreeType>} */
    ({
        tag: 'debug-tree',
        component: DebugTreeFunction,
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
