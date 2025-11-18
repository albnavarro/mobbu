import { MobJs } from '@mobJs';
import { DebugTreeItemFn } from './debug-tree-item';
import { debugActiveComponentStore } from '@stores/debug';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const DebugTreeItem = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DebugTreeItem>} */
    ({
        tag: 'debug-tree-item',
        component: DebugTreeItemFn,
        bindStore: debugActiveComponentStore,
        props: {
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
        },
        state: {
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
