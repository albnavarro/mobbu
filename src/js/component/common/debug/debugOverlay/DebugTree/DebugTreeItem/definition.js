//@ts-check

import { createComponent } from '../../../../../../mobjs';
import { DebugTreeItemFn } from './debugTreeItem';

/**
 * @import { CreateComponentParams } from "../../../../../../mobjs/type";
 **/

export const DebugTreeItem = createComponent(
    /** @type{CreateComponentParams<import('./type').DebugTreeItem>} */
    ({
        name: 'debug-tree-item',
        component: DebugTreeItemFn,
        exportState: ['id', 'componentName', 'instanceName', 'children'],
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
            isActive: () => ({
                value: false,
                type: Boolean,
            }),
            hasActiveChildren: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
