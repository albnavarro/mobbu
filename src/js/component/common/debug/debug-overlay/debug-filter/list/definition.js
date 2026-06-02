import { MobJs } from '@mobJs';
import { DebugFilterListFn } from './debug-filter-list';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const DebugFilterList = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DebugFilterListType>} */
    ({
        tag: 'debug-filter-list',
        component: DebugFilterListFn,
        state: {
            data: {
                __value: [],
                __type: Array,
            },
            isLoading: {
                __value: true,
                __type: Boolean,
            },
            noResult: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
