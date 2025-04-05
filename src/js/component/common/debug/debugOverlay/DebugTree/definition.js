//@ts-check

import { MobJs } from '../../../../../mob/mobjs';
import { DebugTreeFn } from './debugTree';
import { DebugTreeItem } from './DebugTreeItem/definition';

/**
 * @import { CreateComponentParams } from "../../../../../mob/mobjs/type";
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
