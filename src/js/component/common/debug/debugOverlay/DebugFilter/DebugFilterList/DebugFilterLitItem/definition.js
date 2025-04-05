//@ts-check

import { MobJs } from '@mobJs';
import { DebugFilterListItemFn } from './debugFilterListItem';

/**
 * @import { CreateComponentParams } from "@mobJsType";
 **/

export const DebugFilterListItem = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').DebugFilterListItem>} */
    ({
        name: 'debug-filter-list-item',
        component: DebugFilterListItemFn,
        exportState: ['id', 'tag', 'name'],
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
