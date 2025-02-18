//@ts-check

import { createComponent } from '../../../../../../mobjs';
import { DebugFilterListFn } from './debugFilterList';
import { DebugFilterListItem } from './DebugFilterLitItem/definition';

/**
 * @import { CreateComponentParams } from "../../../../../../mobjs/type";
 **/

export const DebugFilterList = createComponent(
    /** @type{CreateComponentParams<import('./type').DebugFilterList>} */
    ({
        name: 'debug-filter-list',
        component: DebugFilterListFn,
        state: {
            data: () => ({
                value: [],
                type: Array,
            }),
            isLoading: () => ({
                value: false,
                type: Boolean,
            }),
            noResult: () => ({
                value: false,
                type: Boolean,
            }),
        },
        child: [DebugFilterListItem],
    })
);
