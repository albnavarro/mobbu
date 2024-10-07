//@ts-check

import { createComponent } from '../../../../../mobjs';
import { DebugTreeFn } from './debugTree';
import { DebugTreeItem } from './DebugTreeItem/definition';

export const DebugTree = createComponent({
    name: 'debug-tree',
    component: DebugTreeFn,
    exportState: ['active'],
    state: {
        active: () => ({
            value: false,
            type: Boolean,
        }),
        data: () => ({
            value: [],
            type: Array,
        }),
    },
    child: [DebugTreeItem],
});
