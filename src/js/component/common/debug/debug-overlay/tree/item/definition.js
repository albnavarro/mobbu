import { MobJs } from '@mobJs';
import { DebugTreeItemFn } from './debug-tree-item';
import { debugActiveComponentStore } from '@stores/debug';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const DebugTreeItem = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DebugTreeItemType>} */
    ({
        tag: 'debug-tree-item',
        component: DebugTreeItemFn,
        bindStore: debugActiveComponentStore,
        props: {
            id: {
                __value: '',
                __type: String,
            },
            componentName: {
                __value: '',
                __type: String,
            },
            instanceName: {
                __value: '',
                __type: String,
            },
            children: {
                __value: [],
                __type: Array,
            },
        },
        state: {
            isOpen: {
                __value: false,
                __type: Boolean,
            },
            isActive: {
                __value: false,
                __type: Boolean,
            },
            hasActiveChildren: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
