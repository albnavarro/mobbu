//@ts-check

import { createComponent } from '../../../../../../../mobjs';
import { DebugFilterListItemFn } from './debugFilterListItem';

export const DebugFilterListItem = createComponent({
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
    },
});
