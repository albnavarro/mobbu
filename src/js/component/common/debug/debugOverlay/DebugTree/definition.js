//@ts-check

import { MobJs } from '@mobJs';
import { DebugTreeFn } from './debugTree';
import { DebugTreeItem } from './DebugTreeItem/definition';

/**
 * @import { CreateComponentParams } from "@mobJsType";
 **/

export const DebugTree = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').DebugTree>} */
    ({
        name: 'debug-tree',
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
