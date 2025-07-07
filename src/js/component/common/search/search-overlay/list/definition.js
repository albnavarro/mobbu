import { MobJs } from '@mobJs';
import { SearchOverlayListFn } from './list';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const SearchOverlayList = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').SearchOverlayList>} */
    ({
        tag: 'search-overlay-list',
        component: SearchOverlayListFn,
        exportState: [],
        state: {
            list: () => ({
                value: [],
                type: Array,
            }),
        },
    })
);
