//@ts-check

import { createComponent } from '../../../../../../mobjs';
import { DebugTreeItemFn } from './debugTreeItem';

export const DebugTreeItem = createComponent({
    name: 'debug-tree-item',
    component: DebugTreeItemFn,
    exportState: ['active', 'id', 'componentName', 'instanceName', 'children'],
    state: {
        id: () => ({
            value: '',
            type: String,
        }),
        componentName: () => ({
            value: '',
            type: String,
        }),
        instanceName: () => ({
            value: '',
            type: String,
        }),
        children: () => ({
            value: [],
            type: Array,
        }),
        isOpen: () => ({
            value: false,
            type: Boolean,
        }),
    },
});
