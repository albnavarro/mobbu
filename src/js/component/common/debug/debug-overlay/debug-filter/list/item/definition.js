import { MobJs } from '@mobJs';
import { DebugFilterListItemFn } from './debug-filter-list-item';
import { debugActiveComponentStore } from '@commonComponent/debug/debug-overlay/store/debug-active-component';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const DebugFilterListItem = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DebugFilterListItem>} */
    ({
        tag: 'debug-filter-list-item',
        component: DebugFilterListItemFn,
        exportState: ['id', 'tag', 'name'],
        bindStore: debugActiveComponentStore,
        state: {
            id: () => ({
                value: '',
                type: String,
            }),
            tag: () => ({
                value: '',
                type: String,
            }),
            name: () => ({
                value: '',
                type: String,
            }),
            active: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
