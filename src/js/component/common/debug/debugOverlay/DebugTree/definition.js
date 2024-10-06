//@ts-check

import { createComponent } from '../../../../../mobjs';
import { DebugTreeFn } from './debugTree';

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
        refreshData: () => ({
            value: false,
            type: Boolean,
            skipEqual: false,
        }),
    },
});
