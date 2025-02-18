//@ts-check

import { createComponent } from '../../../../../../../mobjs';
import { DebugFilterListItemFn } from './debugFilterListItem';

/**
 * @import { CreateComponentParams } from "../../../../../../../mobjs/type";
 **/

export const DebugFilterListItem = createComponent(
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
