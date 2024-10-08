//@ts-check

import { createComponent } from '../../../../../../../mobjs';
import { DebugFilterListItemFn } from './debugFilterListItem';

export const DebugFilterListItem = createComponent({
    name: 'debug-filter-list-item',
    component: DebugFilterListItemFn,
    exportState: ['id'],
    state: {
        id: () => ({
            value: '',
            type: String,
        }),
    },
});
