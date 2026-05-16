import { MobJs } from '@mobJs';
import { DebugFilterListItemFn } from './debug-filter-list-item';
import { debugActiveComponentStore } from '@stores/debug';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const DebugFilterListItem = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DebugFilterListItemType>} */
    ({
        tag: 'debug-filter-list-item',
        component: DebugFilterListItemFn,
        bindStore: debugActiveComponentStore,
        props: {
            id: {
                __value: '',
                __type: String,
            },
            tag: {
                __value: '',
                __type: String,
            },
            name: {
                __value: '',
                __type: String,
            },
        },
        state: {
            active: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
