//@ts-check

import { createComponent } from '../../../../../../mobjs';
import { DebugFilterListFn } from './debugFilterList';
import { DebugFilterListItem } from './DebugFilterLitItem/definition';

export const DebugFilterList = createComponent({
    name: 'debug-filter-list',
    component: DebugFilterListFn,
    exportState: ['active'],
    state: {
        data: () => ({
            value: [],
            type: Array,
        }),
        isLoading: () => ({
            value: false,
            type: Boolean,
        }),
    },
    child: [DebugFilterListItem],
});
