//@ts-check

import { MobJs } from '@mobJs';
import { DebugFilterListFn } from './debug-filter-list';
import { DebugFilterListItem } from './DebugFilterLitItem/definition';

/**
 * @import { CreateComponentParams } from "@mobJsType";
 **/

export const DebugFilterList = MobJs.createComponent(
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
                value: true,
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
