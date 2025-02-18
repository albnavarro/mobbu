//@ts-check

import { createComponent } from '../../../../../mobjs';
import { DebugTreeFn } from './debugTree';
import { DebugTreeItem } from './DebugTreeItem/definition';

/**
 * @import { CreateComponentParams } from "../../../../../mobjs/type";
 **/

export const DebugTree = createComponent(
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
