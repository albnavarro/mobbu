import { MobJs } from '@mobJs';
import { DebugFilterListItemFn } from './debug-filter-list-item';
import { debugActiveComponentStore } from '@stores/debug';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const DebugFilterListItem = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DebugFilterListItem>} */
    ({
        tag: 'debug-filter-list-item',
        component: DebugFilterListItemFn,
        bindStore: debugActiveComponentStore,
        props: {
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
        },
        state: {
            active: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
