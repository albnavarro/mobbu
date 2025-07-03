import { MobJs } from '@mobJs';
import { DebugTreeFn } from './debug-tree';
import { DebugTreeItem } from './item/definition';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const DebugTree = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DebugTree>} */
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
        child: [DebugTreeItem],
    })
);
