//@ts-check

import { MobJs } from '../../../../../../mob/mobjs';
import { DebugFilterListFn } from './debugFilterList';
import { DebugFilterListItem } from './DebugFilterLitItem/definition';

/**
 * @import { CreateComponentParams } from "../../../../../../mob/mobjs/type";
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
